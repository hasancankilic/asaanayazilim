# 🚨 ACİL ÇÖZÜM - TERMİNAL'DE ÇALIŞTIRIN

## ❌ SORUN

Browser'da "Operation not permitted (os error 1)" hatası görünüyor.
Server 500 hatası veriyor.

**Neden:** macOS dosya izinleri ve extended attributes sorunu.

---

## ✅ ÇÖZÜM: TERMİNAL'DE ŞUNU ÇALIŞTIRIN

### 1. Terminal'i Açın
Cursor'un terminal'ini açın (Terminal > New Terminal)

### 2. Şu Komutları Sırayla Çalıştırın:

```bash
cd /Users/kilic/Developer/asaanayazilim
```

```bash
bash fix-permissions-aggressive.sh
```

**ÖNEMLİ:**
- Script çalışırken **sudo şifresi isteyecek** → `2525` yazın
- `npm install` 2-5 dakika sürebilir
- Tüm işlemler bitene kadar bekleyin

### 3. Script Bittikten Sonra:

```bash
npm run dev
```

---

## 🔍 SCRIPT NE YAPIYOR?

1. ✅ Çalışan process'leri durdurur
2. ✅ `node_modules` ve `.next` cache'ini temizler
3. ✅ Tüm dosya izinlerini düzeltir (sudo gerekli)
4. ✅ Extended attributes'ı temizler
5. ✅ `npm install` çalıştırır
6. ✅ `node_modules` izinlerini tekrar düzeltir
7. ✅ Next.js dosyalarını özellikle kontrol eder

---

## ✅ BEKLENEN SONUÇ

Script başarılı olduktan sonra:
- ✅ Server hatasız başlayacak
- ✅ `http://localhost:3000` açılacak
- ✅ "Operation not permitted" hatası kaybolacak
- ✅ Build başarılı olacak

---

## ⚠️ EĞER HALA SORUN VARSA

Terminal'de şunu çalıştırın:

```bash
sudo xattr -rc /Users/kilic/Developer/asaanayazilim/node_modules
sudo chown -R $(whoami):staff /Users/kilic/Developer/asaanayazilim/node_modules
sudo chmod -R u+rw /Users/kilic/Developer/asaanayazilim/node_modules
```

Sonra tekrar:

```bash
npm run dev
```

---

**ŞİMDİ TERMİNAL'DE `bash fix-permissions-aggressive.sh` ÇALIŞTIRIN!**


