@echo off
REM Icon Generation Script for Karmanya PWA (Windows)
REM This script helps generate the required icon sizes from a base icon

echo 🖼️  Karmanya PWA Icon Generator
echo ================================
echo.

REM Check if ImageMagick is installed
convert -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ImageMagick is not installed.
    echo Please install it first:
    echo   - Download from: https://imagemagick.org/script/download.php#windows
    echo   - Or use: choco install imagemagick
    goto :eof
)

REM Check if base icon exists
if not exist "icon-base.png" (
    echo ❌ Base icon 'icon-base.png' not found in public directory.
    echo.
    echo 📝 Instructions:
    echo 1. Create a 512x512 PNG icon named 'icon-base.png'
    echo 2. Place it in the 'public' directory
    echo 3. Run this script again
    echo.
    echo 💡 You can use online tools like:
    echo    - https://favicon.io/favicon-generator/
    echo    - https://realfavicongenerator.net/
    goto :eof
)

echo ✅ Found base icon: icon-base.png
echo 🔄 Generating icon sizes...

REM Icon sizes needed for PWA
set SIZES=72 96 128 144 152 192 384 512

for %%s in (%SIZES%) do (
    set OUTPUT=icon-%%s.png
    echo   📏 Creating %%sx%%s icon...

    REM Use ImageMagick to resize and create icons
    convert icon-base.png -resize %%sX%%s -background transparent icon-%%s.png

    if %errorlevel% equ 0 (
        echo     ✅ icon-%%s.png created
    ) else (
        echo     ❌ Failed to create icon-%%s.png
    )
)

echo.
echo 🎉 Icon generation complete!
echo.
echo 📋 Generated files:
for %%s in (%SIZES%) do (
    echo    - icon-%%s.png
)
echo.
echo 📱 Your PWA is now ready for mobile installation!
echo    Test it by running: npm run dev
echo    Then visit: http://localhost:3000
pause