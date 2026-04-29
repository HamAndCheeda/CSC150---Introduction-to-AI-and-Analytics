@echo off
cd /d "%~dp0"
if exist "index.html" (
    start "" "index.html"
    if errorlevel 1 (
        explorer "index.html"
    )
) else (
    echo index.html not found in %CD%
    pause
)
