#!/bin/bash

# 🔧 TÜM SORUNLARI ÇÖZEN SCRIPT
# Terminal'de: bash fix-all.sh
# sudo şifresi: 2525

echo "🔧 Tüm sorunları çözüyorum..."
echo ""

cd /Users/kilic/Developer/asaanayazilim

# 1. Temizle
echo "📦 node_modules ve .next temizleniyor..."
rm -rf node_modules .next
npm cache clean --force

# 2. İzinleri düzelt
echo "🔐 Dosya izinleri düzeltiliyor..."
sudo chown -R $(whoami) /Users/kilic/Developer/asaanayazilim

# 3. Extended attributes temizle
echo "🧹 Extended attributes temizleniyor..."
xattr -rc /Users/kilic/Developer/asaanayazilim

# 4. npm cache izinlerini düzelt
echo "🔐 npm cache izinleri düzeltiliyor..."
sudo chown -R 501:20 "/Users/kilic/.npm"

# 5. node_modules'ü yeniden yükle
echo "📥 node_modules yeniden yükleniyor..."
npm install

echo ""
echo "✅ Tüm işlemler tamamlandı!"
echo ""
echo "🔄 Şimdi:"
echo "   1. Cursor'da: Cmd+Shift+P → 'TypeScript: Restart TS Server'"
echo "   2. Cursor'u yeniden başlatın"
echo ""



