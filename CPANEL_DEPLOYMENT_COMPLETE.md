# cPanel Reseller Hosting - TAM DEPLOYMENT REHBERİ
## asaanayazilim.com - Canlıya Alma

---

## ⚠️ KRİTİK TESPİT: Next.js Projesi

Bu proje **Next.js 14 (App Router)** ile geliştirilmiştir ve **Node.js backend** gerektirir.

### Proje Özellikleri:
- ✅ Next.js 14 App Router
- ✅ API Routes (`/api/admin`, `/api/auth`, `/api/contact`)
- ✅ Server Components
- ✅ Database (Prisma + SQLite/PostgreSQL)
- ✅ Admin Panel (Server-side authentication)
- ✅ Server Actions

### cPanel Reseller Hosting Uyumluluğu:

**SORUN:** Standart cPanel hosting (Apache/PHP) Next.js'i doğrudan çalıştıramaz.

**ÇÖZÜMLER:**

#### Seçenek 1: Node.js Desteği Olan cPanel (ÖNERİLEN)
Eğer hosting'inizde Node.js desteği varsa:
- cPanel → Setup Node.js App
- Node.js 18.x veya 20.x seçin
- Bu rehberi takip edin

#### Seçenek 2: Static Export (SINIRLI - Admin Panel ÇALIŞMAZ)
- API routes çalışmaz
- Admin panel çalışmaz
- Database bağlantısı yok
- Sadece frontend görünür

#### Seçenek 3: Vercel (EN İYİ ÇÖZÜM)
- Next.js'in resmi hosting'i
- Ücretsiz
- 5 dakikada kurulum
- Otomatik SSL, CDN

**Bu rehber:** Seçenek 1 için hazırlandı (Node.js desteği olan cPanel).

---

## 1️⃣ PROJE KONTROLÜ

### Proje Tipi: Next.js 14 (Node.js Framework)

**Teknoloji Stack:**
- Framework: Next.js 14.2.35
- Language: TypeScript
- Build Tool: Next.js built-in
- Database: Prisma ORM (SQLite dev, PostgreSQL prod)
- Authentication: Cookie-based (server-side)
- API: Next.js API Routes

### Production Build Komutları:

```bash
# 1. Dependencies yükle
npm install --production

# 2. Prisma client generate
npm run db:generate

# 3. Production build
npm run build

# 4. Build çıktısı: .next/ klasörü
```

**Çıktı Klasörü:** `.next/` (Next.js internal build)

**NOT:** Next.js static export yapmaz, Node.js server gerektirir.

### PHP Kontrolü:

❌ **PHP yok** - Bu proje PHP kullanmıyor.

---

## 2️⃣ HOSTING UYUMLULUK ANALİZİ

### cPanel + Node.js Uyumluluğu

**GEREKSİNİMLER:**
- ✅ Node.js 18.x veya 20.x
- ✅ npm veya yarn
- ✅ PostgreSQL database (production için)
- ✅ SSH erişimi (önerilir)
- ✅ Minimum 1GB RAM
- ✅ Minimum 2GB disk alanı

### .htaccess Dosyası

Next.js Node.js server çalıştırdığı için `.htaccess` **GEREKMEZ**.

Ancak, eğer Apache reverse proxy kullanıyorsanız veya static dosyalar için:

**public_html/.htaccess** (Opsiyonel - sadece reverse proxy için):

```apache
# .htaccess - Next.js için Reverse Proxy (Opsiyonel)
# NOT: Bu sadece Apache'nin Node.js'e proxy yapması için

<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # HTTPS yönlendirme
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # www yönlendirme (opsiyonel)
  RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
  RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
  
  # Node.js'e proxy (eğer Apache reverse proxy kullanıyorsanız)
  # RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

**ÖNEMLİ:** Çoğu cPanel Node.js hosting'de `.htaccess` gerekmeyebilir. Node.js app direkt çalışır.

---

## 3️⃣ BEYAZ EKRAN & SERVER ERROR ÇÖZÜMÜ

### Next.js Beyaz Ekran Nedenleri ve Çözümleri

#### 1. Node.js Versiyonu Uyumsuz

**Kontrol:**
```bash
node --version
# 18.x veya 20.x olmalı
```

**Çözüm:**
- cPanel → Setup Node.js App → Node.js 18.x veya 20.x seçin

#### 2. Dependencies Yüklenmemiş

**Kontrol:**
```bash
cd /home/username/asaanayazilim
ls node_modules
# Klasör boşsa dependencies yüklenmemiş
```

**Çözüm:**
```bash
npm install --production
```

#### 3. Environment Variables Eksik

**Kontrol:**
```bash
cat .env.production
# veya cPanel → Node.js App → Environment Variables
```

**Çözüm:**
Gerekli env variables ekleyin (Bölüm 4'e bakın).

#### 4. Database Bağlantı Hatası

**Kontrol:**
```bash
# Error log'ta görünecek
tail -f logs/error.log
```

**Çözüm:**
- DATABASE_URL doğru mu?
- Database oluşturuldu mu?
- Prisma migration yapıldı mı?

#### 5. Port Çakışması

**Kontrol:**
```bash
netstat -tulpn | grep :3000
```

**Çözüm:**
- cPanel Node.js App'te port ayarını kontrol edin
- Genellikle otomatik atanır

#### 6. Build Hatası

**Kontrol:**
```bash
npm run build
# Hata mesajlarını okuyun
```

**Çözüm:**
- TypeScript hatalarını düzeltin
- Missing dependencies yükleyin

### Error Log Konumları

**cPanel Error Logs:**
1. cPanel → **Error Log** (Apache errors)
2. cPanel → **Node.js App** → **View Logs** (Node.js errors)
3. SSH: `/home/username/logs/error_log`
4. SSH: `/home/username/nodevenv/username/asaanayazilim/logs/error.log`

**Next.js Error Logs:**
```bash
# Application root'ta
tail -f .next/trace
tail -f logs/node.log
```

### Debug Mode Açma (Geçici)

**Development mode (debug için):**

`.env.production`:
```env
NODE_ENV=development
NEXT_DEBUG=1
```

**NOT:** Production'da `NODE_ENV=production` olmalı.

---

## 4️⃣ DOSYA YAPISI

### cPanel Node.js App Dosya Yapısı

**Application Root:** `/home/username/asaanayazilim` (veya hosting'inizin belirlediği)

```
/home/username/asaanayazilim/
├── .next/                      # Build output (npm run build sonrası)
│   ├── static/
│   ├── server/
│   └── ...
├── public/                     # Static files
│   ├── images/
│   ├── logo.png
│   ├── robots.txt
│   └── ...
├── app/                        # Next.js App Router
│   ├── [locale]/
│   ├── admin/
│   ├── api/
│   └── ...
├── components/                 # React components
├── lib/                        # Utilities
│   ├── db.ts
│   ├── auth-prisma.ts
│   └── ...
├── prisma/
│   └── schema.prisma
├── messages/                   # i18n translations
├── node_modules/               # Dependencies (npm install)
├── package.json
├── package-lock.json
├── next.config.mjs
├── tsconfig.json
├── .env.production            # Production environment variables
├── server.js                  # Node.js entry point (cPanel için)
└── .gitignore
```

**public_html/ klasörü KULLANILMAZ** (Node.js app direkt çalışır).

**NOT:** cPanel Node.js App'te dosyalar `application root` klasörüne yüklenir, `public_html` değil.

---

## 5️⃣ DOMAIN & DNS

### Nameserver Kullanımı (Önerilen)

Domain kayıt firmanızda nameserver'ları hosting firmanızın nameserver'larına ayarlayın:

**Örnek Nameserver'lar (hosting firmanızdan alınacak):**
```
ns1.yourhosting.com
ns2.yourhosting.com
```

**Domain Kayıt Firmasında:**
1. Domain yönetim paneline giriş yapın
2. `asaanayazilim.com` seçin
3. **Nameserver / DNS Yönetimi**
4. Nameserver'ları girin
5. Kaydet

**Propagation Süresi:** 2-24 saat (genellikle 2-4 saat)

### A Record Kullanımı (Alternatif)

Eğer nameserver kullanmıyorsanız, domain kayıt firmanızda:

**DNS Kayıtları:**
```
Type    Name    Value           TTL
A       @       YOUR_HOSTING_IP 3600
A       www     YOUR_HOSTING_IP 3600
CNAME   www     @               3600
```

**YOUR_HOSTING_IP:** Hosting firmanızdan alınacak IP adresi.

### SSL Kurulumu (AutoSSL / Let's Encrypt)

#### cPanel AutoSSL (Otomatik)

1. cPanel → **SSL/TLS Status**
2. Domain seçin: `asaanayazilim.com`
3. **Run AutoSSL** butonuna tıklayın
4. 5-10 dakika bekleyin
5. SSL otomatik kurulur ve yenilenir

#### Manuel SSL Kurulumu

1. cPanel → **SSL/TLS**
2. **Manage SSL sites**
3. Domain seçin
4. **Install Certificate** butonuna tıklayın

#### SSL Kontrolü

```bash
# Terminal'de
curl -I https://asaanayazilim.com

# Online
https://www.ssllabs.com/ssltest/analyze.html?d=asaanayazilim.com
```

---

## 6️⃣ ADIM ADIM DEPLOYMENT

### Adım 1: cPanel Node.js App Oluşturma

1. cPanel → **Setup Node.js App**
2. **Create Application** butonuna tıklayın
3. Ayarlar:
   ```
   Node.js Version: 18.x veya 20.x
   Application Root: asaanayazilim
   Application URL: asaanayazilim.com
   Application Startup File: server.js
   Application Mode: Production
   ```
4. **Create** butonuna tıklayın

### Adım 2: Dosyaları Yükleme

#### FTP ile (FileZilla):

1. **Bağlantı Bilgileri:**
   ```
   Host: ftp.asaanayazilim.com veya hosting IP
   Username: cpanel_username
   Password: cpanel_password
   Port: 21
   ```

2. **Yüklenecek Klasör:**
   - Application root klasörüne yükleyin (örn: `/home/username/asaanayazilim`)

3. **Dosyaları Yükleyin:**
   - Tüm proje dosyalarını yükleyin
   - `.next/` klasörünü YÜKLEMEYİN (build server'da yapılacak)

#### File Manager ile:

1. cPanel → **File Manager**
2. Application root klasörüne gidin
3. **Upload** butonuna tıklayın
4. Dosyaları seçin ve yükleyin

### Adım 3: Dependencies Yükleme

**SSH ile (Önerilen):**

```bash
# Application root'a gidin
cd /home/username/asaanayazilim

# Dependencies yükle
npm install --production

# Prisma client generate
npm run db:generate
```

**cPanel Terminal ile (Alternatif):**

1. cPanel → **Terminal**
2. Aynı komutları çalıştırın

### Adım 4: Database Kurulumu

1. cPanel → **PostgreSQL Databases** (veya MySQL)
2. Database oluşturun: `asaanayazilim_db`
3. User oluşturun ve database'e ekleyin
4. Connection string'i not edin

**PostgreSQL Connection String:**
```
postgresql://username:password@localhost:5432/asaanayazilim_db
```

### Adım 5: Environment Variables

cPanel → **Node.js App** → **Environment Variables**:

```env
NODE_ENV=production
DATABASE_URL=postgresql://username:password@localhost:5432/asaanayazilim_db
ADMIN_EMAIL=info@asaanayazilim.com
ADMIN_PASSWORD=your-secure-password-here
NEXT_PUBLIC_SITE_URL=https://asaanayazilim.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**VEYA** application root'ta `.env.production` dosyası oluşturun:

```bash
cd /home/username/asaanayazilim
nano .env.production
```

İçeriği yukarıdaki gibi ekleyin.

### Adım 6: Database Migration

```bash
cd /home/username/asaanayazilim

# Prisma migration
npx prisma migrate deploy

# Veya db push (development için)
npx prisma db push
```

### Adım 7: Production Build

```bash
cd /home/username/asaanayazilim

# Build
npm run build
```

**Build çıktısı:** `.next/` klasörü oluşacak.

### Adım 8: server.js Dosyası Oluşturma

Application root'ta `server.js` dosyası oluşturun:

```javascript
// server.js - cPanel Node.js için
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ 
  dev,
  hostname,
  port,
  customServer: true,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
    });
});
```

### Adım 9: Application Restart

cPanel → **Node.js App** → **Restart Application**

### Adım 10: Test

```
https://asaanayazilim.com
https://asaanayazilim.com/tr
https://asaanayazilim.com/admin/login
```

---

## 7️⃣ SON KONTROL LİSTESİ

### ✅ Site Açılıyor mu?

```bash
curl -I https://asaanayazilim.com
# HTTP/1.1 200 OK olmalı
```

**Browser'da test:**
- https://asaanayazilim.com → Ana sayfa açılıyor mu?
- https://asaanayazilim.com/tr → Türkçe sayfa açılıyor mu?
- https://asaanayazilim.com/en → İngilizce sayfa açılıyor mu?

### ✅ Mobil Uyumlu mu?

1. Chrome DevTools → Mobile view
2. Responsive test yapın
3. Tüm sayfalar mobilde görünüyor mu?

### ✅ Console Error Var mı?

1. Browser → F12 → Console
2. Kırmızı hata var mı kontrol edin
3. Network tab → Failed requests var mı?

### ✅ 404 Var mı?

1. `/admin` → Login sayfası açılıyor mu?
2. `/tr/hizmetler` → Hizmetler sayfası açılıyor mu?
3. Rastgele URL: `/test-404` → 404 sayfası gösteriliyor mu?

### ✅ SSL Aktif mi?

1. Browser'da 🔒 ikonu var mı?
2. https://www.ssllabs.com/ssltest/ → A veya A+ olmalı
3. Mixed content hatası var mı? (Console'da kontrol)

### ✅ Admin Panel Çalışıyor mu?

1. https://asaanayazilim.com/admin/login
2. Login yapabiliyor musunuz?
3. Dashboard açılıyor mu?
4. Blog yönetimi çalışıyor mu?

### ✅ API Routes Çalışıyor mu?

```bash
# Health check
curl https://asaanayazilim.com/api/auth/check

# Contact form test (optional)
curl -X POST https://asaanayazilim.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

### ✅ Database Bağlantısı

1. Admin panelden blog post oluşturun
2. Database'e kaydedildi mi kontrol edin
3. Sayfada görünüyor mu?

### ✅ Performance

1. Google PageSpeed Insights: https://pagespeed.web.dev/
2. Score: 80+ (mobile ve desktop)
3. LCP < 2.5s

---

## 8️⃣ SORUN GİDERME

### Beyaz Ekran

1. **Error log kontrol:**
   ```bash
   tail -f /home/username/logs/error_log
   ```

2. **Node.js log kontrol:**
   - cPanel → Node.js App → View Logs

3. **Build kontrol:**
   ```bash
   cd /home/username/asaanayazilim
   npm run build
   ```

### 500 Server Error

1. **Environment variables kontrol:**
   - Tüm gerekli env variables ekli mi?

2. **Database bağlantı kontrol:**
   ```bash
   # PostgreSQL bağlantı test
   psql -h localhost -U username -d asaanayazilim_db
   ```

3. **Dependencies kontrol:**
   ```bash
   npm install --production
   ```

### 404 Not Found

1. **Routes kontrol:**
   - `app/` klasöründe route'lar var mı?

2. **Middleware kontrol:**
   - `middleware.ts` doğru mu?

### SSL Hatası

1. **AutoSSL yeniden çalıştır:**
   - cPanel → SSL/TLS Status → Run AutoSSL

2. **DNS kontrol:**
   - DNS propagation tamamlandı mı?

---

## 9️⃣ ÇIKTI: KOPYALA-YAPIŞTIR KOMUTLAR

### Tam Deployment Komutları (SSH)

```bash
# 1. Application root'a gidin
cd /home/username/asaanayazilim

# 2. Dependencies yükle
npm install --production

# 3. Prisma client generate
npm run db:generate

# 4. Database migration
npx prisma migrate deploy

# 5. Production build
npm run build

# 6. Application restart (cPanel'den yapın veya)
pm2 restart asaanayazilim
```

### server.js Dosyası İçeriği

**Dosya:** `/home/username/asaanayazilim/server.js`

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ 
  dev,
  hostname,
  port,
  customServer: true,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
    });
});
```

### .env.production Dosyası İçeriği

**Dosya:** `/home/username/asaanayazilim/.env.production`

```env
NODE_ENV=production
DATABASE_URL=postgresql://username:password@localhost:5432/asaanayazilim_db
ADMIN_EMAIL=info@asaanayazilim.com
ADMIN_PASSWORD=CHANGE-THIS-PASSWORD-MIN-16-CHARACTERS
NEXT_PUBLIC_SITE_URL=https://asaanayazilim.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**ÖNEMLİ:** `DATABASE_URL` ve `ADMIN_PASSWORD` değerlerini kendi değerlerinizle değiştirin!

---

## 🎯 ÖZET: YAPILACAKLAR LİSTESİ

1. ✅ cPanel Node.js App oluştur (Node.js 18.x/20.x)
2. ✅ Dosyaları application root'a yükle (FTP/File Manager)
3. ✅ Dependencies yükle (`npm install --production`)
4. ✅ Database oluştur (PostgreSQL)
5. ✅ Environment variables ekle
6. ✅ Prisma migration çalıştır
7. ✅ Production build al (`npm run build`)
8. ✅ server.js dosyası oluştur
9. ✅ Application restart
10. ✅ SSL kur (AutoSSL)
11. ✅ Test et (site açılıyor mu, admin çalışıyor mu)
12. ✅ DNS/Nameserver ayarla
13. ✅ Final kontroller

---

**HAZIRLAYAN:** AŞAANA YAZILIM Teknik Ekibi  
**TARİH:** Ocak 2025  
**VERSİYON:** 1.0

**NOT:** Bu rehber Node.js desteği olan cPanel hosting için hazırlanmıştır. Eğer hosting'inizde Node.js yoksa, Vercel (ücretsiz) kullanmanız önerilir.

