[CmdletBinding()]
param(
  [string]$InstallRoot = "$env:USERPROFILE\.codex\mcp\image-gpt"
)

$ErrorActionPreference = 'Stop'
$SourceRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$InstallRoot = [System.IO.Path]::GetFullPath($InstallRoot)

$required = @(
  'relay-server\dist\index.js',
  'browser-agent\dist\index.js',
  'mcp-server\dist\index.js',
  '.env'
)

foreach ($relative in $required) {
  if (-not (Test-Path -LiteralPath (Join-Path $InstallRoot $relative))) {
    throw "The installed bridge is incomplete: missing $relative under $InstallRoot"
  }
}

$scriptsDir = Join-Path $InstallRoot 'scripts'
New-Item -ItemType Directory -Force -Path $scriptsDir | Out-Null

$launcher = Join-Path $InstallRoot 'codex-run-mcp.cmd'
if (Test-Path -LiteralPath $launcher) {
  $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  Copy-Item -LiteralPath $launcher -Destination "$launcher.$stamp.bak" -Force
}

Copy-Item -LiteralPath (Join-Path $SourceRoot 'scripts\codex-supervisor.cjs') -Destination (Join-Path $scriptsDir 'codex-supervisor.cjs') -Force
Copy-Item -LiteralPath (Join-Path $SourceRoot 'codex-run-mcp.cmd') -Destination $launcher -Force

Write-Host "Installed supervised Codex launcher into $InstallRoot"
Write-Host 'Restart Codex once so it respawns the MCP server through the new launcher.'

