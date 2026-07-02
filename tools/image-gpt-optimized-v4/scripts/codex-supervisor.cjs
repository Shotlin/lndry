#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const http = require('node:http');
const https = require('node:https');
const path = require('node:path');
const { spawn } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const env = loadEnv(path.join(root, '.env'));
const relayUrl = env.KIRO_GPT_MCP_RELAY_URL || env.RELAY_URL || 'ws://localhost:3001';
const healthUrl = toHealthUrl(relayUrl);
const logsDir = path.join(root, 'runtime', 'logs');

function log(level, event, fields = {}) {
  process.stderr.write(`${JSON.stringify({
    ts: new Date().toISOString(),
    level,
    event,
    origin: 'codex-supervisor',
    ...fields,
  })}\n`);
}

function loadEnv(file) {
  const merged = { ...process.env };
  if (!fs.existsSync(file)) return merged;

  for (const rawLine of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const equals = line.indexOf('=');
    if (equals < 1) continue;
    const key = line.slice(0, equals).trim();
    let value = line.slice(equals + 1).trim();
    if (
      value.length >= 2 &&
      ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1);
    }
    if (merged[key] === undefined || merged[key] === '') merged[key] = value;
  }
  return merged;
}

function toHealthUrl(value) {
  const url = new URL(value);
  if (url.protocol === 'ws:') url.protocol = 'http:';
  if (url.protocol === 'wss:') url.protocol = 'https:';
  url.pathname = '/health';
  url.search = '';
  url.hash = '';
  return url;
}

function readHealth(timeoutMs = 1500) {
  return new Promise((resolve) => {
    const transport = healthUrl.protocol === 'https:' ? https : http;
    const request = transport.get(healthUrl, { timeout: timeoutMs }, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (response.statusCode !== 200) return resolve(null);
          resolve(parsed);
        } catch {
          resolve(null);
        }
      });
    });
    request.on('timeout', () => request.destroy());
    request.on('error', () => resolve(null));
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHealth(predicate, timeoutMs, pollMs = 500) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const snapshot = await readHealth();
    if (snapshot && predicate(snapshot)) return snapshot;
    await delay(pollMs);
  }
  return null;
}

function assertRuntimeFile(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`required runtime file is missing: ${relativePath}`);
  }
  return absolutePath;
}

function spawnDetached(component, entrypoint) {
  fs.mkdirSync(logsDir, { recursive: true });
  const stdoutFd = fs.openSync(path.join(logsDir, `${component}.log`), 'a');
  const stderrFd = fs.openSync(path.join(logsDir, `${component}.error.log`), 'a');
  try {
    const child = spawn(process.execPath, [entrypoint], {
      cwd: root,
      env,
      detached: true,
      windowsHide: true,
      stdio: ['ignore', stdoutFd, stderrFd],
    });
    child.unref();
    log('info', 'dependency_started', { component, pid: child.pid });
  } finally {
    fs.closeSync(stdoutFd);
    fs.closeSync(stderrFd);
  }
}

async function ensureDependencies() {
  const relayEntry = assertRuntimeFile(path.join('relay-server', 'dist', 'index.js'));
  const agentEntry = assertRuntimeFile(path.join('browser-agent', 'dist', 'index.js'));

  let snapshot = await readHealth();
  if (!snapshot) {
    spawnDetached('relay', relayEntry);
    snapshot = await waitForHealth(() => true, 15_000);
    if (!snapshot) throw new Error(`relay did not become reachable at ${healthUrl.href}`);
  }

  if (snapshot.status !== 'ok' || Number(snapshot.registeredAgents) < 1) {
    // An already-running agent reconnects by itself after a relay restart.
    // Give it a short grace period before starting another copy.
    snapshot = await waitForHealth(
      (health) => health.status === 'ok' && Number(health.registeredAgents) > 0,
      6_000,
    );
  }

  if (!snapshot || snapshot.status !== 'ok' || Number(snapshot.registeredAgents) < 1) {
    spawnDetached('browser-agent', agentEntry);
    snapshot = await waitForHealth(
      (health) => health.status === 'ok' && Number(health.registeredAgents) > 0,
      90_000,
      1_000,
    );
  }

  if (!snapshot || snapshot.status !== 'ok' || Number(snapshot.registeredAgents) < 1) {
    throw new Error(
      `browser agent did not become ready; inspect ${path.join(logsDir, 'browser-agent.error.log')}`,
    );
  }

  log('info', 'dependencies_ready', {
    relay: healthUrl.origin,
    registeredAgents: snapshot.registeredAgents,
  });
  return snapshot;
}

function runMcp() {
  const entrypoint = assertRuntimeFile(path.join('mcp-server', 'dist', 'index.js'));
  const child = spawn(process.execPath, [entrypoint], {
    cwd: root,
    env,
    windowsHide: true,
    stdio: 'inherit',
  });
  child.on('error', (error) => {
    log('error', 'mcp_spawn_failed', { message: error.message });
    process.exit(1);
  });
  child.on('exit', (code, signal) => {
    log('info', 'mcp_exited', { code, signal });
    process.exit(code ?? 1);
  });
}

async function main() {
  const mode = process.argv[2] || 'serve';
  if (mode === '--diagnose') {
    const snapshot = await readHealth();
    process.stdout.write(`${JSON.stringify({
      root,
      relayUrl,
      health: snapshot,
      hasEnv: fs.existsSync(path.join(root, '.env')),
      hasRelayBuild: fs.existsSync(path.join(root, 'relay-server', 'dist', 'index.js')),
      hasAgentBuild: fs.existsSync(path.join(root, 'browser-agent', 'dist', 'index.js')),
      hasMcpBuild: fs.existsSync(path.join(root, 'mcp-server', 'dist', 'index.js')),
    }, null, 2)}\n`);
    return;
  }

  await ensureDependencies();
  if (mode === '--dependencies-only') return;
  runMcp();
}

main().catch((error) => {
  log('error', 'supervisor_failed', { message: error instanceof Error ? error.message : String(error) });
  process.exit(1);
});

