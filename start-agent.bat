@echo off
echo Starting KIRO-GPT Browser Agent...
echo A Chrome window will open — log into ChatGPT Pro once, then leave it running.
cd /d "C:\Users\sayan\Desktop\image-gpt\browser-agent"
set RELAY_URL=ws://localhost:3001
set AGENT_SECRET=B29WE8hEO4nDEINMTPmrWAE2Mry9SRus
set AGENT_PROFILE_DIR=C:\Users\sayan\AppData\Local\kiro-gpt-bridge-profile
node dist\index.js
