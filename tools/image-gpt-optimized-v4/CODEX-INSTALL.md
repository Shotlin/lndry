# Codex supervised launcher

The upstream bridge requires three local processes: the stdio MCP server,
the relay, and the browser-agent. This launcher makes that topology an
implementation detail: Codex starts one command, which reuses healthy
dependencies or starts missing ones in the background before serving MCP.

Install it over the existing Codex-specific launcher:

```powershell
powershell -ExecutionPolicy Bypass -File .\install-codex-launcher.ps1
```

Then restart Codex once. The existing MCP registration continues to point at
`codex-run-mcp.cmd`; no secrets or `config.toml` values are changed.

Runtime logs are written under `runtime\logs` in the installed bridge.
Chromium is still an upstream architectural dependency. With
`AGENT_HEADLESS=auto`, an authenticated profile runs headlessly; the first
login may require a visible browser window.
