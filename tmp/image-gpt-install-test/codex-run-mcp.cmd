@echo off
setlocal EnableExtensions DisableDelayedExpansion
cd /d "%~dp0"

if not exist "scripts\codex-supervisor.cjs" (
  >&2 echo [image-gpt] scripts\codex-supervisor.cjs is missing.
  exit /b 1
)

node "scripts\codex-supervisor.cjs"

