#!/bin/bash

# 🔧 DOSYA İZİN SORUNU ÇÖZÜM SCRIPT'İ
# Bu script'i terminal'de çalıştırın: bash fix-permissions.sh

echo "🔧 Dosya izin sorununu çözüyorum..."
echo ""

# 1. Proje dizinine git
cd /Users/kilic/Developer/asaanayazilim || exit 1

# 2. node_modules ve cache'i temizle
echo "📦 node_modules ve .next cache'i temizleniyor..."
rm -rf node_modules .next
npm cache clean --force

# 3. Dosya izinlerini düzelt
echo "🔐 Dosya izinleri düzeltiliyor..."
sudo chown -R $(whoami) /Users/kilic/Developer/asaanayazilim

# 4. Extended attributes temizle (macOS)
echo "🧹 Extended attributes temizleniyor..."
xattr -rc /Users/kilic/Developer/asaanayazilim

# 5. node_modules'ü yeniden yükle
echo "📥 node_modules yeniden yükleniyor..."
npm install

echo ""
echo "✅ İzin sorunu çözüldü!"
echo ""
echo "🚀 Dev server'ı başlatmak için:"
echo "   npm run dev"
echo ""



