@echo off
title Robo do WhatsApp - MOTORA
cd /d "%~dp0"
if not exist node_modules (
  echo Instalando o robo pela primeira vez. Aguarde...
  call npm install
)
:inicio
node robo.js
echo O robo parou. Reiniciando em 30 segundos...
timeout /t 30 /nobreak >nul
goto inicio
