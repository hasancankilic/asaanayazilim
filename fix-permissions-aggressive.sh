#!/bin/bash

echo "🔧 AGGRESIF İZİN DÜZELTME BAŞLIYOR..."
echo ""

# 1. Proje dizinine git
cd /Users/kilic/Developer/asaanayazilim || { echo "❌ Hata: Proje dizinine gidilemedi."; exit 1; }

# 2. Tüm process'leri durdur
echo "🛑 Çalışan process'leri durduruyorum..."
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true

# 3. Cache'leri temizle
echo "📦 Cache'leri temizliyorum..."
rm -rf node_modules .next
npm cache clean --force

# 4. Tüm dosya izinlerini düzelt (sudo şifresi: 2525)
echo "🔐 Dosya izinleri düzeltiliyor (sudo gerekli)..."
sudo chown -R $(whoami):staff /Users/kilic/Developer/asaanayazilim
sudo chmod -R u+rw /Users/kilic/Developer/asaanayazilim

# 5. Extended attributes temizle (macOS)
echo "🧹 Extended attributes temizleniyor..."
xattr -rc /Users/kilic/Developer/asaanayazilim

# 6. npm cache izinlerini düzelt
echo "🔐 npm cache izinleri düzeltiliyor..."
sudo chown -R $(whoami) ~/.npm 2>/dev/null || true
sudo chmod -R u+rw ~/.npm 2>/dev/null || true

# 7. node_modules'ü yeniden yükle
echo "📥 node_modules yeniden yükleniyor (bu 2-5 dakika sürebilir)..."
npm install

# 8. node_modules içindeki izinleri tekrar düzelt
echo "🔐 node_modules izinleri düzeltiliyor..."
sudo chown -R $(whoami):staff node_modules
sudo chmod -R u+rw node_modules

# 9. Özellikle Next.js dosyalarını kontrol et
echo "✅ Next.js dosyalarını kontrol ediyorum..."
if [ -f "node_modules/next/dist/client/components/router-reducer/create-href-from-url.js" ]; then
    sudo chmod 644 "node_modules/next/dist/client/components/router-reducer/create-href-from-url.js"
    echo "✅ create-href-from-url.js izinleri düzeltildi"
else
    echo "⚠️  create-href-from-url.js henüz yüklenmedi"
fi

echo ""
echo "✅ İZİN DÜZELTME TAMAMLANDI!"
echo ""
echo "🚀 Şimdi dev server'ı başlatın:"
echo "   npm run dev"


