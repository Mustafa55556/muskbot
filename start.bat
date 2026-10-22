@echo off
chcp 65001 >nul
title MuskBot - Discord Music Bot
echo ===================================================
echo     تشغيل بوت الموسيقى (MuskBot Discord Music)
echo ===================================================
echo.

:loop
echo [%date% %time%] جاري تشغيل البوت...
node index.js
echo.
echo [%date% %time%] توقف البوت أو حدثت إعادة اتصال. سيتم إعادة التشغيل خلال 5 ثوانٍ...
timeout /t 5 /nobreak >nul
goto loop
