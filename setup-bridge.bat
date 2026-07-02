@echo off
echo ============================================================
echo  KIRO-GPT Bridge — one-click setup for Lndry
echo ============================================================
echo.

set BRIDGE_DIR=C:\Users\sayan\Desktop\image-gpt
set LNDRY_DIR=C:\Users\sayan\Desktop\lndry

:: ── 1. Install all workspace packages ────────────────────────
echo [1/4] Installing npm packages...
cd /d "%BRIDGE_DIR%"
call npm install
if %errorlevel% neq 0 (
  echo ERROR: npm install failed. Make sure Node 20+ is in PATH.
  pause & exit /b 1
)

:: ── 2. Build all workspace packages ──────────────────────────
echo.
echo [2/4] Building all packages...
call npm run build
if %errorlevel% neq 0 (
  echo ERROR: build failed. Check output above.
  pause & exit /b 1
)

:: ── 3. Copy .env (only if not already present) ───────────────
echo.
echo [3/4] Writing .env file...
if not exist "%BRIDGE_DIR%\.env" (
  copy "%BRIDGE_DIR%\.env.example" "%BRIDGE_DIR%\.env" >nul
)
:: Patch in the generated secrets (sed-style via PowerShell)
powershell -Command "(Get-Content '%BRIDGE_DIR%\.env') -replace '^KIRO_SECRET=$','KIRO_SECRET=DZP8ZFbG4PpBw8MwOs2KdBXuNO80Viwe' | Set-Content '%BRIDGE_DIR%\.env'"
powershell -Command "(Get-Content '%BRIDGE_DIR%\.env') -replace '^AGENT_SECRET=$','AGENT_SECRET=B29WE8hEO4nDEINMTPmrWAE2Mry9SRus' | Set-Content '%BRIDGE_DIR%\.env'"
powershell -Command "(Get-Content '%BRIDGE_DIR%\.env') -replace '^KIRO_GPT_MCP_SECRET=$','KIRO_GPT_MCP_SECRET=DZP8ZFbG4PpBw8MwOs2KdBXuNO80Viwe' | Set-Content '%BRIDGE_DIR%\.env'"
powershell -Command "(Get-Content '%BRIDGE_DIR%\.env') -replace '^AGENT_PROFILE_DIR=$','AGENT_PROFILE_DIR=C:\\Users\\sayan\\AppData\\Local\\kiro-gpt-bridge-profile' | Set-Content '%BRIDGE_DIR%\.env'"
powershell -Command "(Get-Content '%BRIDGE_DIR%\.env') -replace '^KIRO_GPT_MCP_WORKSPACE=$','KIRO_GPT_MCP_WORKSPACE=C:\\Users\\sayan\\Desktop\\lndry' | Set-Content '%BRIDGE_DIR%\.env'"
echo .env written.

:: ── 4. Write mcp.json into the Lndry workspace ───────────────
echo.
echo [4/4] Writing .kiro\settings\mcp.json...
if not exist "%LNDRY_DIR%\.kiro\settings" mkdir "%LNDRY_DIR%\.kiro\settings"
(
echo {
echo   "mcpServers": {
echo     "kiro-gpt-bridge": {
echo       "command": "node",
echo       "args": ["%BRIDGE_DIR:\=\\%\\mcp-server\\dist\\index.js"],
echo       "env": {
echo         "KIRO_GPT_MCP_SECRET": "DZP8ZFbG4PpBw8MwOs2KdBXuNO80Viwe",
echo         "KIRO_GPT_MCP_RELAY_URL": "ws://localhost:3001",
echo         "KIRO_GPT_MCP_WORKSPACE": "%LNDRY_DIR:\=\\%"
echo       },
echo       "disabled": false,
echo       "autoApprove": [
echo         "generate_image",
echo         "generate_logo",
echo         "generate_hero",
echo         "generate_icon_set",
echo         "generate_ui_mockup"
echo       ]
echo     }
echo   }
echo }
) > "%LNDRY_DIR%\.kiro\settings\mcp.json"
echo mcp.json written.

echo.
echo ============================================================
echo  Setup complete! Now do this:
echo.
echo  STEP A — Start the relay (keep this window open):
echo    cd %BRIDGE_DIR%\relay-server
echo    node dist\index.js
echo.
echo  STEP B — Start the browser-agent (new window):
echo    cd %BRIDGE_DIR%\browser-agent  
echo    node dist\index.js
echo    (A Chrome window opens — log into ChatGPT Pro once)
echo.
echo  STEP C — Restart Kiro IDE so it picks up the new mcp.json
echo.
echo  Then tell Kiro to generate the Lndry brand assets!
echo ============================================================
pause
