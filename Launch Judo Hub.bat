@echo off
title Judo Hub
cd /d "%~dp0"
echo.
echo  ==========================================
echo   Judo Hub - Starting...
echo  ==========================================
echo.
echo  Keep this window open while using the app.
echo  Close it (or press Enter) to shut down.
echo.

python -c "import http.server,threading,webbrowser,time,sys; s=http.server.HTTPServer(('127.0.0.1',8765),http.server.SimpleHTTPRequestHandler); t=threading.Thread(target=s.serve_forever); t.daemon=True; t.start(); print('  Running at http://localhost:8765'); print('  Opening browser...'); time.sleep(0.8); webbrowser.open('http://localhost:8765/judo-hub.html'); input(''); s.shutdown()" 2>nul

if %errorlevel% neq 0 (
    python3 -c "import http.server,threading,webbrowser,time,sys; s=http.server.HTTPServer(('127.0.0.1',8765),http.server.SimpleHTTPRequestHandler); t=threading.Thread(target=s.serve_forever); t.daemon=True; t.start(); print('  Running at http://localhost:8765'); print('  Opening browser...'); time.sleep(0.8); webbrowser.open('http://localhost:8765/judo-hub.html'); input(''); s.shutdown()" 2>nul
)

if %errorlevel% neq 0 (
    echo.
    echo  Python not found. Please install Python from https://python.org
    echo  (It's free and takes 2 minutes)
    echo.
    pause
)
