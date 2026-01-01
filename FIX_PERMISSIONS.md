# 🔧 DOSYA İZİN SORUNU ÇÖZÜMÜ

## ❌ SORUN
```
Operation not permitted (os error 1)
Failed to read source code from node_modules/next/dist/...
```

Bu macOS dosya izin hatası. `node_modules` klasörüne erişim yok.

---

## ✅ ÇÖZÜM (Terminal'de Çalıştırın)

### 1. Proje dizinine gidin
```bash
cd /Users/kilic/Developer/asaanayazilim
```

### 2. node_modules ve cache'i temizleyin
```bash
rm -rf node_modules .next
npm cache clean --force
```

### 3. Dosya izinlerini düzeltin
```bash
sudo chown -R $(whoami) /Users/kilic/Developer/asaanayazilim
```

### 4. Extended attributes temizleyin (macOS)
```bash
xattr -rc /Users/kilic/Developer/asaanayazilim
```

### 5. node_modules'ü yeniden yükleyin (SUDO KULLANMAYIN!)
```bash
npm install
```

### 6. Build test
```bash
npm run build
```

### 7. Dev server test
```bash
npm run dev
```

---

## ⚠️ ÖNEMLİ NOTLAR

1. **SUDO KULLANMAYIN** `npm install` için
2. `chown` komutu için sudo gerekebilir (kendi dosyalarınız için)
3. `xattr` komutu macOS'ta extended attributes temizler (quarantine flag vb.)

---

## 🎯 BEKLENEN SONUÇ

- ✅ `npm run build` başarılı olmalı
- ✅ `npm run dev` çalışmalı
- ✅ `http://localhost:3000/tr` açılmalı

---

**Bu komutları terminal'de çalıştırın, sonra tekrar deneyin!**



