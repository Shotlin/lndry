"use strict";
/**
 * Relay Server boot orchestrator.
 *
 * Wires every relay-server module into a running process:
 *
 *   1. Load and validate runtime configuration ({@link loadConfig}).
 *   2. Build per-process state: {@link AgentPool}, {@link PendingQueue},
 *      {@link RequestTable}, the IP-keyed brute-force tracker
 *      (`createRateLimiter`), and the Prometheus instruments
 *      (`createMetrics`).
 *   3. Build the {@link DispatcherTransport} adapter that translates
 *      dispatcher emit calls to Socket.IO `emit()` calls against the
 *      orchestrator's per-client / per-agent socket maps.
 *   4. Build the {@link Dispatcher} ({@link createDispatcher}).
 *   5. Build the HTTP/HTTPS server, Express app, and Socket.IO server
 *      ({@link createServer}).
 *   6. Attach the per-role socket handler modules
 *      ({@link attachClientHandlers}, {@link attachAgentHandlers}).
 *   7. Register SIGTERM / SIGINT drain handlers (R1.5, R1.6).
 *   8. Bind to the configured PORT (R1.1).
 *
 * Implements: R1.1 (port bind), R1.5 (drain in-flight on SIGTERM/SIGINT),
 * R1.6 (final SHUTDOWN failure to remaining clients), R1.8 (structured
 * `bind_failed` log + non-zero exit on bind failure).
 *
 * The orchestrator owns:
 *   - The two `clientId → Socket` / `agentId → Socket` lookup maps used
 *     by the dispatcher transport adapter.
 *   - The per-process bookkeeping for `/health` (`registeredAgents`,
 *     `registeredClients`, `queueDepth`, `allAgentsLoginRequired`).
 *
 * The module's `main` block runs unconditionally on import, so the
 * package's `main` field points at this file's compiled output and
 * `node dist/index.js` is the canonical entrypoint.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@kiro-gpt-bridge/shared");
const config_js_1 = require("./config.js");
const logger_js_1 = require("./log/logger.js");
const agentPool_js_1 = require("./dispatch/agentPool.js");
const pendingQueue_js_1 = require("./dispatch/pendingQueue.js");
const requestTable_js_1 = require("./tracking/requestTable.js");
const dispatcher_js_1 = require("./dispatch/dispatcher.js");
const metrics_js_1 = require("./routes/metrics.js");
const server_js_1 = require("./server.js");
const rateLimiter_js_1 = require("./auth/rateLimiter.js");
const clientHandlers_js_1 = require("./socket/clientHandlers.js");
const agentHandlers_js_1 = require("./socket/agentHandlers.js");
/**
 * Soft drain deadline on SIGTERM/SIGINT. R1.5 mandates "up to 30 s" for
 * in-flight responses to settle before the process exits.
 */
const DRAIN_DEADLINE_MS = 30_000;
/**
 * Run the boot sequence. Top-level `await` is intentional: we want a
 * crisp non-zero exit if any step throws.
 *
 * Implements R1.1, R1.5, R1.6, R1.8.
 */
async function main() {
    // ─── 1. Config ───────────────────────────────────────────────────────
    const config = (0, config_js_1.loadConfig)();
    // ─── 2. Per-process state ────────────────────────────────────────────
    const metrics = (0, metrics_js_1.createMetrics)();
    const agentPool = new agentPool_js_1.AgentPool();
    const pendingQueue = new pendingQueue_js_1.PendingQueue({ maxDepth: config.queueMaxDepth });
    const requestTable = new requestTable_js_1.RequestTable();
    const rateLimiter = (0, rateLimiter_js_1.createRateLimiter)();
    /** clientId → Socket lookup for the dispatcher's transport adapter. */
    const clientIdToSocket = new Map();
    /** agentId → Socket lookup for the dispatcher's transport adapter. */
    const agentIdToSocket = new Map();
    // ─── 3. Dispatcher transport adapter ─────────────────────────────────
    const transport = {
        async dispatchToAgent(agent, request) {
            const socket = agentIdToSocket.get(agent.agentId);
            if (socket === undefined) {
                // The dispatcher's tryDispatch path interprets a thrown error
                // here as a transport failure (R5.6) and either retries to a
                // different idle agent or falls back to the queue.
                throw new Error(`agent socket not registered: ${agent.agentId}`);
            }
            socket.emit(shared_1.EV.AGENT_DISPATCH, request);
        },
        async cancelToAgent(agent, requestId) {
            const socket = agentIdToSocket.get(agent.agentId);
            if (socket === undefined) {
                throw new Error(`agent socket not registered: ${agent.agentId}`);
            }
            socket.emit(shared_1.EV.AGENT_CANCEL, { protocolVersion: 1, requestId });
        },
        emitStatusToClient(clientId, event) {
            const socket = clientIdToSocket.get(clientId);
            if (socket === undefined)
                return;
            try {
                socket.emit(shared_1.EV.REQUEST_STATUS, event);
            }
            catch (e) {
                (0, logger_js_1.logSafe)('warn', 'emit_status_error', {
                    clientId,
                    requestId: event.requestId,
                    message: e instanceof Error ? e.message : String(e),
                });
            }
        },
        emitChunkToClient(clientId, chunk) {
            const socket = clientIdToSocket.get(clientId);
            if (socket === undefined)
                return;
            try {
                socket.emit(shared_1.EV.STREAM_CHUNK, chunk);
            }
            catch (e) {
                (0, logger_js_1.logSafe)('warn', 'emit_chunk_error', {
                    clientId,
                    requestId: chunk.requestId,
                    message: e instanceof Error ? e.message : String(e),
                });
            }
        },
    };
    // ─── 4. Dispatcher ───────────────────────────────────────────────────
    const dispatcher = (0, dispatcher_js_1.createDispatcher)({
        agentPool,
        pendingQueue,
        requestTable,
        transport,
    });
    // ─── 5. Health + metrics providers ───────────────────────────────────
    const healthProvider = {
        uptimeSeconds: () => process.uptime(),
        registeredAgents: () => agentPool.registeredCount(),
        registeredClients: () => clientIdToSocket.size,
        queueDepth: () => pendingQueue.size(),
        allAgentsLoginRequired: () => {
            // R23.4 — health is `degraded` when at least one agent socket is
            // alive AND none of those connected agents are dispatch-capable
            // (i.e. every one is in `login_required`). The agent pool's
            // `registeredCount()` already excludes login_required agents, so
            // when it drops to zero while sockets remain, every remaining
            // agent must be locked out. With zero connected agent sockets
            // the fleet is "empty", which is encoded by `registeredAgents
            // === 0` in {@link buildHealthSnapshot} — we return `false` here
            // so an empty fleet shows as `degraded` via the agent-count
            // branch rather than the login-required branch.
            return agentIdToSocket.size > 0 && agentPool.registeredCount() === 0;
        },
    };
    const metricsProvider = {
        queueDepth: () => pendingQueue.size(),
        agentsConnected: () => agentPool.registeredCount(),
    };
    // ─── 6. HTTP/HTTPS + Socket.IO ───────────────────────────────────────
    const server = (0, server_js_1.createServer)(config, healthProvider, metricsProvider, metrics);
    // Order matters: the client middleware is registered first so its
    // discriminator (`auth.kiroSecret` present) runs before the agent
    // middleware's. Both attach `connection` listeners that early-return
    // on the wrong discriminator — see each module's docstring.
    (0, clientHandlers_js_1.attachClientHandlers)({
        io: server.io,
        kiroSecret: config.kiroSecret,
        rateLimiter,
        dispatcher,
        requestTable,
        registry: {
            registerClient: (socket, clientId) => {
                clientIdToSocket.set(clientId, socket);
            },
            unregisterClient: (clientId) => {
                clientIdToSocket.delete(clientId);
            },
            getRegisteredClientCount: () => clientIdToSocket.size,
        },
    });
    (0, agentHandlers_js_1.attachAgentHandlers)({
        io: server.io,
        agentSecret: config.agentSecret,
        rateLimiter,
        agentPool,
        dispatcher,
        registry: {
            registerAgent: (socket, agentId) => {
                agentIdToSocket.set(agentId, socket);
            },
            unregisterAgent: (agentId) => {
                agentIdToSocket.delete(agentId);
            },
        },
        isAllAgentsLoginRequired: () => {
            // R23.4 reference test: at least one agent must be physically
            // connected (i.e. a socket exists), AND none of those connected
            // agents are currently dispatch-capable. `agentPool.registeredCount()`
            // returns the size of the `idle ∪ busy` set — login_required
            // agents are excluded — so when this drops to zero while we
            // still have live agent sockets in `agentIdToSocket`, every
            // connected agent must be in `login_required`.
            return agentIdToSocket.size > 0 && agentPool.registeredCount() === 0;
        },
    });
    // ─── 7. Drain handlers (R1.5, R1.6) ──────────────────────────────────
    let shuttingDown = false;
    /**
     * Coordinated shutdown sequence per R1.5/R1.6:
     *
     *   1. Stop accepting new HTTP/Socket.IO connections.
     *   2. Wait up to {@link DRAIN_DEADLINE_MS} for every non-terminal
     *      request in the {@link RequestTable} to settle naturally.
     *   3. For any request still non-terminal at the deadline, emit a
     *      final `stream.chunk { isFinal:true, status:"failed",
     *      errorCode:"SHUTDOWN" }` to its originating client.
     *   4. Tear down the Socket.IO server, dispose process-owned
     *      resources, and exit.
     *
     * The exit code is non-zero iff the drain failed — i.e., one or more
     * requests were still non-terminal at the deadline, signalling to the
     * supervisor that responses were aborted rather than completed.
     */
    async function shutdown(signal) {
        if (shuttingDown)
            return;
        shuttingDown = true;
        (0, logger_js_1.logSafe)('info', 'signal_received', { signal });
        // R1.5 step 1 — stop accepting new connections. We close ONLY the
        // HTTP listener here (not the full Socket.IO server) so existing
        // sockets stay open during the drain window and can receive the
        // SHUTDOWN failure chunk emitted in step 3.
        try {
            server.httpServer.close();
        }
        catch (e) {
            (0, logger_js_1.logSafe)('warn', 'httpServer_close_error', {
                message: e instanceof Error ? e.message : String(e),
            });
        }
        const isTerminal = (state) => state === 'completed' ||
            state === 'cancelled' ||
            state === 'failed' ||
            state === 'queue_timeout';
        // R1.5 step 2 — poll the request table until every record is
        // terminal or the 30 s deadline lapses. 100 ms granularity keeps
        // shutdown latency tight without busy-looping.
        const deadline = Date.now() + DRAIN_DEADLINE_MS;
        while (Date.now() < deadline) {
            let anyOpen = false;
            for (const record of requestTable.values()) {
                if (!isTerminal(record.state)) {
                    anyOpen = true;
                    break;
                }
            }
            if (!anyOpen)
                break;
            await new Promise((resolve) => {
                const t = setTimeout(resolve, 100);
                t.unref?.();
            });
        }
        // R1.6 step 3 — emit a final SHUTDOWN failure to remaining clients
        // whose requests did not settle within the drain window. We use the
        // dispatcher transport so the per-client socket lookup and the
        // emit-error logging stay consistent with normal-path chunks.
        let drainFailed = false;
        for (const record of requestTable.values()) {
            if (isTerminal(record.state))
                continue;
            drainFailed = true;
            const chunk = {
                protocolVersion: 1,
                requestId: record.request.requestId,
                chunkIndex: 0,
                text: '',
                isFinal: true,
                status: 'failed',
                errorCode: 'SHUTDOWN',
            };
            transport.emitChunkToClient(record.clientId, chunk);
        }
        if (drainFailed) {
            (0, logger_js_1.logSafe)('warn', 'shutdown_drain_incomplete', {
                signal,
                drainMs: DRAIN_DEADLINE_MS,
            });
        }
        // R1.5 step 4 — tear down Socket.IO. We pass `0` because we have
        // already absorbed the drain window above; this call now exists to
        // fully release the io listeners and underlying sockets.
        await server.shutdown(0);
        // Tear down remaining process-owned resources so Node exits.
        dispatcher.dispose();
        pendingQueue.dispose();
        agentPool.dispose();
        rateLimiter.dispose();
        // Non-zero exit iff drain failed (R1.6). A clean drain exits 0.
        process.exit(drainFailed ? 1 : 0);
    }
    process.on('SIGTERM', () => {
        void shutdown('SIGTERM');
    });
    process.on('SIGINT', () => {
        void shutdown('SIGINT');
    });
    // ─── 8. Bind (R1.1, R1.8) ────────────────────────────────────────────
    // The HTTP error event registered inside `createServer` already logs
    // the `bind_failed` line; we additionally exit non-zero from here so
    // the process surfaces a clear failure to the supervisor.
    server.httpServer.once('error', (err) => {
        (0, logger_js_1.logSafe)('error', 'boot_failed', {
            port: config.port,
            code: err.code ?? null,
            message: err.message,
        });
        process.exit(1);
    });
    server.httpServer.listen(config.port, () => {
        (0, logger_js_1.logSafe)('info', 'boot', {
            port: config.port,
            tls: config.tls.enabled,
            queueMaxDepth: config.queueMaxDepth,
        });
    });
}
// Top-level invocation: any unhandled error becomes a non-zero exit
// with a structured log line, which is the only safe response when the
// boot sequence fails.
main().catch((err) => {
    (0, logger_js_1.logSafe)('error', 'boot_unhandled_error', {
        message: err instanceof Error ? err.message : String(err),
    });
    process.exit(1);
});
//# sourceMappingURL=index.js.map