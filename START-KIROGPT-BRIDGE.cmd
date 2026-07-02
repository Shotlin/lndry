@echo off
setlocal EnableExtensions

set "KIRO_ROOT=C:\Users\sayan\Desktop\kirogpt"

if not exist "%KIRO_ROOT%\start-relay.bat" (
  echo KiroGPT relay launcher was not found at:
  echo %KIRO_ROOT%\start-relay.bat
  pause
  exit /b 1
)

if not exist "%KIRO_ROOT%\start-agent.bat" (
  echo KiroGPT browser-agent launcher was not found at:
  echo %KIRO_ROOT%\start-agent.bat
  pause
  exit /b 1
)

echo Starting KiroGPT relay...
start "KiroGPT Relay" /min cmd.exe /d /c "cd /d ""%KIRO_ROOT%"" && call start-relay.bat"
timeout /t 3 /nobreak >nul

echo Starting KiroGPT browser agent...
start "KiroGPT Browser Agent" /min cmd.exe /d /c "cd /d ""%KIRO_ROOT%"" && call start-agent.bat"

echo.
echo KiroGPT is starting. A Chromium window should open.
echo Log into ChatGPT if requested, then leave the agent running.
echo After it is ready, restart Codex once so the MCP reconnects cleanly.
echo.
pause
