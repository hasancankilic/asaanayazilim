# 🚀 HIZLI DEPLOYMENT - Kopyala Yapıştır

## ⚠️ ÖNEMLİ: Node.js Hosting Gerekli

Bu proje Next.js ile geliştirilmiştir. **Node.js desteği olan cPanel hosting** gerekir.

Eğer Node.js yoksa: **Vercel kullanın** (ücretsiz, 5 dakika): https://vercel.com

---

## 📋 ADIM ADIM (10 DAKİKA)

### 1. cPanel'de Node.js App Oluştur

1. cPanel → **Setup Node.js App**
2. **Create Application**
3. Ayarlar:
   - Node.js Version: **18.x veya 20.x**
   - Application Root: **asaanayazilim**
   - Application URL: **asaanayazilim.com**
   - Application Startup File: **server.js**
   - Mode: **Production**
4. **Create**

### 2. Dosyaları Yükle

**FTP ile:**
- Host: `ftp.asaanayazilim.com`
- Username: `cpanel_username`
- Password: `cpanel_password`
- Klasör: Application root (örn: `/home/username/asaanayazilim`)

**Yüklenecekler:**
- Tüm dosyalar (`.next/` hariç - build server'da yapılacak)

### 3. SSH'de Komutlar (Kopyala-Yapıştır)

```bash
cd /home/username/asaanayazilim
npm install --production
npm run db:generate
npm run build
```

### 4. Database Oluştur

1. cPanel → **PostgreSQL Databases**
2. Database oluştur: `asaanayazilim_db`
3. User oluştur ve database'e ekle
4. Connection string'i not et

### 5. Environment Variables

cPanel → **Node.js App** → **Environment Variables**:

```
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@localhost:5432/asaanayazilim_db
ADMIN_EMAIL=info@asaanayazilim.com
ADMIN_PASSWORD=GÜVENLİ-ŞİFRE-BURAYA
NEXT_PUBLIC_SITE_URL=https://asaanayazilim.com
```

### 6. Database Migration

```bash
cd /home/username/asaanayazilim
npx prisma migrate deploy
```

### 7. server.js Kontrol

`server.js` dosyası proje root'ta olmalı. Yoksa oluşturun (CPANEL_DEPLOYMENT_COMPLETE.md'de var).

### 8. Restart

cPanel → **Node.js App** → **Restart Application**

### 9. SSL

cPanel → **SSL/TLS Status** → **Run AutoSSL**

### 10. Test

https://asaanayazilim.com → ✅ Çalışıyor mu?

---

## 🔧 Sorun Giderme

**Beyaz ekran:**
```bash
tail -f /home/username/logs/error_log
```

**500 Error:**
- Environment variables kontrol
- Database bağlantı kontrol
- `npm install --production` tekrar çalıştır

**404:**
- Routes kontrol
- Build başarılı mı kontrol

---

## 📞 Detaylı Rehber

Tüm detaylar için: **CPANEL_DEPLOYMENT_COMPLETE.md**

