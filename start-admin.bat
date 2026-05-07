@echo off
setlocal
chcp 65001 >nul

cd /d "%~dp0"

if "%PORT%"=="" set "PORT=5050"

echo ======================================
echo eSahyogi Admin Server
echo ======================================
echo.
echo Admin login:
echo http://127.0.0.1:%PORT%/admin/login
echo.
echo Admin panel:
echo http://127.0.0.1:%PORT%/admin
echo.
echo Window band mat kariyega.
echo Server isi window me chalega.
echo ======================================
echo.

python app.py

echo.
echo Server band ho gaya ya start nahi ho paaya.
pause
