# 🚨 HIZLI ÇÖZÜM - İZİN SORUNU

## ⚡ TEK KOMUT ÇÖZÜMÜ

Terminal'de şu komutu çalıştırın:

```bash
bash fix-permissions.sh
```

Bu script otomatik olarak:
1. ✅ `node_modules` ve `.next` cache'i temizler
2. ✅ Dosya izinlerini düzeltir
3. ✅ Extended attributes temizler (macOS)
4. ✅ `node_modules`'ü yeniden yükler

---

## 📋 MANUEL ADIMLAR (Alternatif)

Eğer script çalışmazsa, terminal'de tek tek çalıştırın:

```bash
# 1. Proje dizinine git
cd /Users/kilic/Developer/asaanayazilim

# 2. Temizle
rm -rf node_modules .next
npm cache clean --force

# 3. İzinleri düzelt
sudo chown -R $(whoami) /Users/kilic/Developer/asaanayazilim

# 4. Extended attributes temizle
xattr -rc /Users/kilic/Developer/asaanayazilim

# 5. Yeniden yükle
npm install

# 6. Dev server'ı başlat
npm run dev
```

---

## ✅ SONRAKİ ADIMLAR

İzin sorunu çözüldükten sonra:

1. **Dev server'ı başlatın:**
   ```bash
   npm run dev
   ```

2. **Tarayıcıda test edin:**
   - `http://localhost:3000/tr`
   - `http://localhost:3000/en`
   - `http://localhost:3000/admin/login`

3. **Console kontrolü:**
   - F12 → Console tab
   - Hata olmamalı
   - MIME type hatası olmamalı

---

## 🎯 BEKLENEN SONUÇ

- ✅ `npm run build` başarılı olmalı
- ✅ `npm run dev` çalışmalı
- ✅ Sayfalar açılmalı
- ✅ Console'da hata olmamalı

---

**Script'i çalıştırın ve sonucu paylaşın!**



