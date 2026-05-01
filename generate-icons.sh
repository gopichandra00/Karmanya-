#!/bin/bash

# Icon Generation Script for Karmanya PWA
# This script helps generate the required icon sizes from a base icon

echo "🖼️  Karmanya PWA Icon Generator"
echo "================================"
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed."
    echo "Please install it first:"
    echo "  - Windows: choco install imagemagick"
    echo "  - macOS: brew install imagemagick"
    echo "  - Ubuntu: sudo apt install imagemagick"
    exit 1
fi

# Check if base icon exists
BASE_ICON="icon-base.png"
if [ ! -f "$BASE_ICON" ]; then
    echo "❌ Base icon '$BASE_ICON' not found in public directory."
    echo ""
    echo "📝 Instructions:"
    echo "1. Create a 512x512 PNG icon named 'icon-base.png'"
    echo "2. Place it in the 'public' directory"
    echo "3. Run this script again"
    echo ""
    echo "💡 You can use online tools like:"
    echo "   - https://favicon.io/favicon-generator/"
    echo "   - https://realfavicongenerator.net/"
    exit 1
fi

echo "✅ Found base icon: $BASE_ICON"
echo "🔄 Generating icon sizes..."

# Icon sizes needed for PWA
SIZES=(72 96 128 144 152 192 384 512)

for size in "${SIZES[@]}"; do
    OUTPUT="icon-${size}.png"
    echo "  📏 Creating ${size}x${size} icon..."

    # Use ImageMagick to resize and create icons
    convert "$BASE_ICON" \
        -resize "${size}x${size}" \
        -background transparent \
        "$OUTPUT"

    if [ $? -eq 0 ]; then
        echo "    ✅ $OUTPUT created"
    else
        echo "    ❌ Failed to create $OUTPUT"
    fi
done

echo ""
echo "🎉 Icon generation complete!"
echo ""
echo "📋 Generated files:"
for size in "${SIZES[@]}"; do
    echo "   - icon-${size}.png"
done
echo ""
echo "📱 Your PWA is now ready for mobile installation!"
echo "   Test it by running: npm run dev"
echo "   Then visit: http://localhost:3000"