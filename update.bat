@echo off
chcp 65001 >nul
cd /d "%~dp0"

where git >nul 2>&1 || (echo Brak gita. Zainstaluj: https://git-scm.com & pause & exit /b 1)

if not exist ".git" (
  echo Pierwsze uruchomienie - konfiguracja.
  echo Utworz puste repozytorium na github.com/new i wklej jego adres,
  echo np. https://github.com/TWOJ-LOGIN/biblioteka.git
  set /p URL=Adres repozytorium:
  git init -b main
  git remote add origin %URL%
)

git add -A
git diff --cached --quiet && (echo Brak zmian do wyslania. & pause & exit /b 0)

set MSG=%*
if "%MSG%"=="" set MSG=Aktualizacja %date% %time:~0,5%
git commit -m "%MSG%"
git push -u origin main

if errorlevel 1 (echo. & echo BLAD wysylania - sprawdz komunikat powyzej.) else (echo. & echo Gotowe! Strona odswiezy sie za ok. minute.)
pause
