#!/bin/bash

# macOS Next.js İzin Sorunu Düzeltme Scripti
# Bu script'i terminal'de çalıştırın: bash fix-permissions-macos.sh

set -e

echo "🔧 macOS Next.js izin sorunlarını düzeltiyor..."

cd "$(dirname "$0")"

# 1. Eski server'ı durdur
echo "📛 Eski server'ları durduruyor..."
pkill -f "next dev" 2>/dev/null || true
sleep 2

# 2. Build cache'i temizle
echo "🧹 Build cache'i temizliyor..."
rm -rf .next node_modules/.cache 2>/dev/null || true

# 3. Extended attributes'ı temizle
echo "🔓 Extended attributes'ı temizliyor..."
xattr -rc node_modules 2>/dev/null || true

# 4. İzinleri düzelt
echo "🔐 İzinleri düzeltiyor..."
chmod -R u+rwX node_modules 2>/dev/null || true

# 5. Next.js dosyalarını özel olarak düzelt
echo "⚡ Next.js dosyalarını düzeltiyor..."
if [ -d "node_modules/next" ]; then
    xattr -rc node_modules/next 2>/dev/null || true
    chmod -R u+rwX node_modules/next 2>/dev/null || true
    find node_modules/next -type f -exec chmod 644 {} \; 2>/dev/null || true
    find node_modules/next -type d -exec chmod 755 {} \; 2>/dev/null || true
fi

# 6. Sorunlu dosyayı kontrol et
PROBLEM_FILE="node_modules/next/dist/client/components/router-reducer/create-href-from-url.js"
if [ -f "$PROBLEM_FILE" ]; then
    echo "✅ Sorunlu dosya mevcut: $PROBLEM_FILE"
    xattr -c "$PROBLEM_FILE" 2>/dev/null || true
    chmod 644 "$PROBLEM_FILE" 2>/dev/null || true
    echo "✅ Dosya izinleri düzeltildi"
    
    # Dosyayı test et
    if cat "$PROBLEM_FILE" > /dev/null 2>&1; then
        echo "✅ Dosya okunabilir"
    else
        echo "❌ Dosya hala okunamıyor - node_modules'ü yeniden kurmanız gerekebilir"
    fi
else
    echo "⚠️  Sorunlu dosya bulunamadı - Next.js kurulu değil"
fi

echo ""
echo "✅ İşlem tamamlandı!"
echo ""
echo "Şimdi dev server'ı başlatın:"
echo "  npm run dev"
echo ""
echo "Eğer hala sorun varsa, node_modules'ü yeniden kurun:"
echo "  rm -rf node_modules package-lock.json"
echo "  npm install"


