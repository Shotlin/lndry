@echo off
echo Starting KIRO-GPT Bridge Relay Server...
cd /d "C:\Users\sayan\Desktop\image-gpt\relay-server"
set KIRO_SECRET=DZP8ZFbG4PpBw8MwOs2KdBXuNO80Viwe
set AGENT_SECRET=B29WE8hEO4nDEINMTPmrWAE2Mry9SRus
set PORT=3001
node dist\index.js
