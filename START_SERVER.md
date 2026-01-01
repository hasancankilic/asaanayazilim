# 🚀 DEV SERVER BAŞLATMA REHBERİ

## ❌ SORUN
Browser'da `ERR_CONNECTION_REFUSED` hatası görüyorsunuz.
Bu, dev server'ın çalışmadığı anlamına gelir.

---

## ✅ ÇÖZÜM ADIMLARI

### 1️⃣ İZİN SORUNUNU ÇÖZÜN (Henüz yapmadıysanız)

Terminal'de şu komutu çalıştırın:

```bash
cd /Users/kilic/Developer/asaanayazilim
bash fix-permissions.sh
```

Bu script:
- ✅ `node_modules` ve `.next` cache'i temizler
- ✅ Dosya izinlerini düzeltir
- ✅ Extended attributes temizler
- ✅ `node_modules`'ü yeniden yükler

**ÖNEMLİ:** Script çalışırken `sudo` şifresi isteyebilir. Şifrenizi girin.

---

### 2️⃣ DEV SERVER'I BAŞLATIN

İzin sorunu çözüldükten sonra, terminal'de:

```bash
npm run dev
```

**Beklenen çıktı:**
```
▲ Next.js 14.2.35
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000
```

---

### 3️⃣ TARAYICIDA TEST EDİN

Server başladıktan sonra:

1. **Ana sayfa (TR):**
   - `http://localhost:3000/tr`

2. **Ana sayfa (EN):**
   - `http://localhost:3000/en`

3. **Admin login:**
   - `http://localhost:3000/admin/login`

---

## 🔍 SORUN GİDERME

### Dev server başlamıyorsa:

1. **Port kontrolü:**
   ```bash
   lsof -ti:3000
   ```
   Eğer bir process dönerse, port kullanımda demektir.

2. **Port'u temizle:**
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

3. **Farklı port'ta başlat:**
   ```bash
   PORT=3001 npm run dev
   ```
   Sonra `http://localhost:3001/tr` adresini kullanın.

---

### Build hatası alıyorsanız:

1. **.next klasörünü temizle:**
   ```bash
   rm -rf .next
   ```

2. **Tekrar build et:**
   ```bash
   npm run build
   ```

3. **Dev server'ı başlat:**
   ```bash
   npm run dev
   ```

---

## ✅ BAŞARILI OLDUĞUNDA GÖRECEKLERİNİZ

- ✅ Terminal'de "ready started server" mesajı
- ✅ Browser'da sayfa açılır
- ✅ Console'da hata olmaz
- ✅ MIME type hatası olmaz

---

## 📋 HIZLI KOMUTLAR

```bash
# 1. İzin sorununu çöz
bash fix-permissions.sh

# 2. Dev server'ı başlat
npm run dev

# 3. Tarayıcıda aç
open http://localhost:3000/tr
```

---

**Script'i çalıştırıp dev server'ı başlatın!**



