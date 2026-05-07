@echo off
setlocal EnableDelayedExpansion

cd /d "%~dp0"
set "PRIMARY_PORT=5050"
set "FALLBACK_PORT=5070"
set "SERVER_MARKER=esahyogi-admin-manage-v2"

call :kill_port %PRIMARY_PORT%
call :kill_port %FALLBACK_PORT%

call :launch_server %PRIMARY_PORT%
call :wait_for_server %PRIMARY_PORT%
if not errorlevel 1 (
    set "ACTIVE_PORT=%PRIMARY_PORT%"
    goto open_browser
)

echo 5050 par fresh officer server verify nahi hua. 5070 try kiya ja raha hai...
call :launch_server %FALLBACK_PORT%
call :wait_for_server %FALLBACK_PORT%
if not errorlevel 1 (
    set "ACTIVE_PORT=%FALLBACK_PORT%"
    goto open_browser
)

echo Fresh officer server verify nahi ho paaya.
echo Manual link try karo:
echo http://127.0.0.1:%PRIMARY_PORT%/officer/login
echo http://127.0.0.1:%FALLBACK_PORT%/officer/login
pause
exit /b 1

:open_browser
echo.
echo Officer login link:
echo http://127.0.0.1:%ACTIVE_PORT%/officer/login
echo Officer dashboard link:
echo http://127.0.0.1:%ACTIVE_PORT%/officer
start "" "http://127.0.0.1:%ACTIVE_PORT%/officer/login"
exit /b 0

:kill_port
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":%~1 .*LISTENING"') do (
    taskkill /PID %%P /F >nul 2>&1
)
exit /b 0

:launch_server
start "e Sahyogi Server %~1" cmd /k "cd /d ""%~dp0"" && set PORT=%~1 && python app.py"
exit /b 0

:wait_for_server
powershell -NoProfile -Command "$port = %~1; $marker = '%SERVER_MARKER%'; $healthy = $false; for ($i = 0; $i -lt 20; $i++) { try { $response = Invoke-WebRequest -UseBasicParsing -Uri ('http://127.0.0.1:' + $port + '/api/server-meta/') -TimeoutSec 2; if ($response.StatusCode -eq 200 -and $response.Content -match $marker) { $healthy = $true; break } } catch { }; Start-Sleep -Seconds 1 }; if ($healthy) { exit 0 } else { exit 1 }"
exit /b %errorlevel%
