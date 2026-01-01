#!/bin/bash

# 🔧 EKSİK PAKETLERİ YÜKLEME SCRIPT'İ

echo "🔍 node_modules kontrol ediliyor..."
cd /Users/kilic/Developer/asaanayazilim

# Eksik paketleri kontrol et
if [ ! -d "node_modules/react" ]; then
  echo "❌ react eksik"
fi

if [ ! -d "node_modules/zod" ]; then
  echo "❌ zod eksik"
fi

if [ ! -d "node_modules/lucide-react" ]; then
  echo "❌ lucide-react eksik"
fi

echo ""
echo "📦 Eksik paketleri yüklüyorum..."
echo ""

# npm install çalıştır
npm install

echo ""
echo "✅ Yükleme tamamlandı!"
echo ""
echo "🔄 Şimdi TypeScript server'ı yeniden başlatın:"
echo "   Cursor'da: Cmd+Shift+P → 'TypeScript: Restart TS Server'"
echo ""



