@echo off
REM ============================================================
REM  Bat 3 server local cho kenh Tuan LA Lab.
REM  Double-click file nay -> mo 3 cua so, moi cua so 1 server.
REM  Dong 1 cua so = tat server do (hoac bam Ctrl+C trong do).
REM ============================================================
cd /d "%~dp0"

start "admin :8124"  cmd /k "npm run edit"
start "astro :8123"  cmd /k "npm run dev -- --port 8123"
start "studio :3000" cmd /k "cd video && npm run studio"

echo.
echo   Da bat 3 server. Mo trinh duyet:
echo     Dashboard quan ly : http://localhost:8124/admin
echo     Preview blog       : http://localhost:8123  (dung khi Sua local)
echo     Remotion Studio    : http://localhost:3000
echo.
echo   (Cua so nay dong duoc; 3 cua so server thi giu mo.)
pause
