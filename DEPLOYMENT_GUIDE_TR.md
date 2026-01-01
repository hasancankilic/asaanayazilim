# AŞAANA YAZILIM - Canlıya Alma ve Kurulum Kılavuzu

**Alan Adı:** asaanayazilim.com  
**Hazırlayan:** AŞAANA YAZILIM Teknik Ekibi  
**Tarih:** Ocak 2025  
**Versiyon:** 1.0

---

## 📋 İÇİNDEKİLER

1. [Genel Bakış](#1-genel-bakış)
2. [Hosting / Domain Kurulum](#2-hosting--domain-kurulum)
3. [Kurumsal Mail Kurulumu](#3-kurumsal-mail-kurulumu)
4. [Web Sitesi Yayına Alma](#4-web-sitesi-yayına-alma)
5. [SEO ve Teknik Ayarlar](#5-seo-ve-teknik-ayarlar)
6. [Güvenlik & Performans](#6-güvenlik--performans)
7. [Teslim Paketi ve Dokümantasyon](#7-teslim-paketi-ve-dokümantasyon)

---

## 1. GENEL BAKIŞ

### Proje Özellikleri

- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **Database:** Prisma ORM + SQLite (development) / PostgreSQL (production)
- **Authentication:** Cookie-based admin sistemi
- **CMS:** Admin panel ile blog ve proje yönetimi
- **i18n:** Türkçe/İngilizce çoklu dil desteği

### ÖNEMLİ NOT

Bu proje **Next.js** ile geliştirilmiştir. Next.js projelerini canlıya almak için 2 seçenek vardır:

**Seçenek A: Vercel (ÖNERİLEN - En Kolay)**
- Next.js'in geliştiricisi tarafından sağlanır
- Otomatik SSL, CDN, optimizasyon
- Ücretsiz plan yeterli
- 5 dakikada kurulum

**Seçenek B: cPanel Node.js Hosting (Gelişmiş)**
- Node.js desteği olan hosting gerekir
- Manuel kurulum gerekir
- Daha fazla yapılandırma

Bu dokümantasyon **her iki yöntemi** de içermektedir.

---

## 2. HOSTING / DOMAIN KURULUM

### 2.1. Nameserver Ayarları (Domain Kayıt Firmasından)

Domain kayıt firmanızın panelinden (örneğin: Turhost, Natro, GoDaddy):

1. Domain yönetim paneline giriş yapın
2. `asaanayazilim.com` domainini seçin
3. **Nameserver / DNS Yönetimi** bölümüne gidin
4. Hosting firmanızdan aldığınız nameserver'ları girin:

```
Örnek Nameserver'lar (hosting firmanızdan alınacak):
ns1.yourhosting.com
ns2.yourhosting.com
```

**Not:** Nameserver değişikliği 24-48 saat içinde aktif olur (genellikle 2-4 saat).

### 2.2. DNS Kayıtları (cPanel DNS Zone Editor)

cPanel → **Zone Editor** veya **Advanced DNS Zone Editor** bölümüne gidin.

#### Gerekli DNS Kayıtları:

```dns
# A Kaydı (Ana Domain)
A       @       203.0.113.1      3600    (Hosting IP'niz)
A       www     203.0.113.1      3600    (www için)

# CNAME (www yönlendirme - alternatif)
CNAME   www     @                 3600

# MX Kayıtları (Mail için)
MX      @       mail.asaanayazilim.com    10    3600
MX      @       mail2.asaanayazilim.com   20    3600

# TXT Kayıtları
TXT     @       "v=spf1 include:yourhosting.com ~all"    3600
TXT     _dmarc  "v=DMARC1; p=none; rua=mailto:info@asaanayazilim.com"  3600

# CAA (SSL için - opsiyonel)
CAA     @       0 issue "letsencrypt.org"  3600
```

**Hosting IP'nizi öğrenmek için:**
- cPanel ana sayfasında gösterilir
- Veya hosting firmanıza sorun

### 2.3. SSL Kurulumu (HTTPS)

#### AutoSSL (cPanel - Otomatik)

1. cPanel → **SSL/TLS Status** veya **AutoSSL**
2. **Run AutoSSL** butonuna tıklayın
3. 5-10 dakika bekleyin
4. Sertifika otomatik kurulur ve yenilenir

#### Let's Encrypt (Manuel)

1. cPanel → **SSL/TLS**
2. **Manage SSL sites**
3. Domain seçin: `asaanayazilim.com` ve `www.asaanayazilim.com`
4. **Run AutoSSL** veya **Install Certificate** butonuna tıklayın

#### SSL Kontrolü

Kurulumdan 10 dakika sonra:
```
https://www.ssllabs.com/ssltest/analyze.html?d=asaanayazilim.com
```

Buradan SSL durumunu kontrol edin. **A** veya **A+** olmalı.

### 2.4. cPanel Ayarları Sırası

1. ✅ Nameserver'ları domain kayıt firmasından ayarlayın
2. ✅ DNS kayıtlarını cPanel'de yapılandırın (yukarıdaki tablo)
3. ✅ SSL sertifikasını kurun (AutoSSL)
4. ✅ Database oluşturun (MySQL/PostgreSQL)
5. ✅ Node.js uygulamasını yapılandırın (eğer Node.js hosting kullanıyorsanız)
6. ✅ Dosyaları yükleyin (Bölüm 4'e bakın)

---

## 3. KURUMSAL MAİL KURULUMU

### 3.1. cPanel'de Mail Hesapları Oluşturma

1. cPanel → **Email Accounts**
2. Her mail için **Create** butonuna tıklayın:

#### Mail 1: info@asaanayazilim.com
```
Email: info@asaanayazilim.com
Password: [Güçlü bir şifre belirleyin - min 12 karakter]
Mailbox Quota: 10240 MB (10GB) veya Unlimited
```

#### Mail 2: destek@asaanayazilim.com
```
Email: destek@asaanayazilim.com
Password: [Güçlü bir şifre belirleyin]
Mailbox Quota: 10240 MB (10GB) veya Unlimited
```

#### Mail 3: iletisim@asaanayazilim.com
```
Email: iletisim@asaanayazilim.com
Password: [Güçlü bir şifre belirleyin]
Mailbox Quota: 10240 MB (10GB) veya Unlimited
```

**Şifre Güvenliği:**
- En az 12 karakter
- Büyük/küçük harf, rakam, özel karakter içermeli
- Örnek: `Asaana2025!Yazilim`

### 3.2. Mail Sunucu Bilgileri

Mail hesaplarını oluşturduktan sonra, cPanel size şu bilgileri verir:

```
Gelen Mail (IMAP):
Sunucu: mail.asaanayazilim.com veya imap.asaanayazilim.com
Port: 993 (SSL) veya 143 (STARTTLS)
Kullanıcı: info@asaanayazilim.com (tam email adresi)
Şifre: [Belirlediğiniz şifre]

Giden Mail (SMTP):
Sunucu: mail.asaanayilim.com veya smtp.asaanayazilim.com
Port: 465 (SSL) veya 587 (STARTTLS)
Kullanıcı: info@asaanayazilim.com (tam email adresi)
Şifre: [Belirlediğiniz şifre]
Güvenlik: SSL/TLS veya STARTTLS
```

**Not:** Hosting firmanı bu bilgileri size verecektir. Genellikle cPanel → **Email Accounts** → **Connect Devices** bölümünde görünür.

### 3.3. Gmail'e Mail Ekleme

1. Gmail → **Ayarlar** ⚙️ → **Tüm ayarları görüntüle**
2. **Hesaplar ve İçe Aktarma** sekmesi
3. **Başka bir e-posta adresinden posta al** bölümünde **E-posta hesabı ekle**
4. Bilgileri girin:

```
E-posta adresi: info@asaanayazilim.com
Kullanıcı adı: info@asaanayazilim.com
Şifre: [Mail şifreniz]
POP sunucusu: mail.asaanayazilim.com
Port: 995 (SSL)
```

5. **Gönderilen e-postaları Gmail'den gönder** seçeneğini işaretleyin
6. SMTP ayarları:

```
SMTP sunucusu: mail.asaanayazilim.com
Port: 587
Kullanıcı adı: info@asaanayazilim.com
Şifre: [Mail şifreniz]
Güvenli bağlantı: TLS kullan
```

### 3.4. Outlook'a Mail Ekleme

1. Outlook → **Dosya** → **Hesap Ekle**
2. **Gelişmiş ayarları kullan** seçeneğini işaretleyin
3. **Internet E-posta** seçin
4. Bilgileri girin:

```
E-posta adresi: info@asaanayazilim.com
Hesap türü: IMAP
Gelen posta sunucusu: mail.asaanayazilim.com
Port: 993
Şifreleme: SSL/TLS
Giden posta sunucusu: mail.asaanayazilim.com
Port: 587
Şifreleme: STARTTLS
Kullanıcı adı: info@asaanayazilim.com
Şifre: [Mail şifreniz]
```

### 3.5. MX Kayıtları Kontrolü

MX kayıtlarının doğru olduğundan emin olun. DNS Zone Editor'da şunlar olmalı:

```
MX      @       mail.asaanayazilim.com    10    3600
```

**Kontrol için:**
```bash
# Terminal'de test edin:
nslookup -type=MX asaanayazilim.com
```

veya online: https://mxtoolbox.com/

---

## 4. WEB SİTESİ YAYINA ALMA

### ⚠️ ÖNEMLİ: Next.js Projesi için Seçenekler

Bu proje Next.js ile geliştirilmiştir. 2 seçeneğiniz var:

### SEÇENEK A: Vercel ile Yayına Alma (ÖNERİLEN)

Vercel, Next.js'in resmi hosting platformudur ve **ücretsizdir**.

#### Adımlar:

1. **Vercel Hesabı Oluşturun:**
   - https://vercel.com → Sign Up
   - GitHub hesabınızla giriş yapın (önerilen)

2. **Projeyi GitHub'a Yükleyin:**
   ```bash
   cd /Users/kilic/Developer/asaanayazilim
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/kullaniciadi/asaanayazilim.git
   git push -u origin main
   ```

3. **Vercel'e Bağlayın:**
   - Vercel dashboard → **Add New Project**
   - GitHub repository'nizi seçin
   - **Import** butonuna tıklayın

4. **Environment Variables Ekleyin:**
   Vercel → Project Settings → Environment Variables:

   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   ADMIN_EMAIL=hasancankilic25@gmail.com
   ADMIN_PASSWORD=your-secure-password
   NEXT_PUBLIC_SITE_URL=https://asaanayazilim.com
   ```

5. **Domain Bağlayın:**
   - Project Settings → Domains
   - `asaanayazilim.com` ve `www.asaanayazilim.com` ekleyin
   - DNS kayıtlarını güncelleyin (Vercel size verecek)

6. **Deploy:**
   - Otomatik deploy olur
   - 2-3 dakika içinde siteniz yayında!

**Vercel Avantajları:**
- ✅ Ücretsiz SSL (otomatik)
- ✅ CDN (dünya çapında hızlı)
- ✅ Otomatik deployment
- ✅ Preview deployments
- ✅ Analytics dahil

### SEÇENEK B: cPanel Node.js Hosting ile Yayına Alma

Eğer Node.js desteği olan cPanel hosting kullanıyorsanız:

#### 4.1. Build Alma

Projeyi build edin:

```bash
cd /Users/kilic/Developer/asaanayazilim

# Dependencies yükleyin
npm install

# Production build
npm run build

# Build klasörü hazır
```

#### 4.2. Dosyaları Yükleme

**FTP ile:**
1. FileZilla veya benzeri FTP client kullanın
2. Bağlantı bilgileri (cPanel → FTP Accounts):
   ```
   Host: ftp.asaanayazilim.com veya hosting IP
   Username: cpanel_username
   Password: cpanel_password
   Port: 21
   ```

3. **Node.js uygulaması için:**
   - cPanel → **Setup Node.js App**
   - **Create Application** butonuna tıklayın
   - Ayarlar:
     ```
     Node.js Version: 18.x veya 20.x
     Application Root: asaanayazilim
     Application URL: asaanayazilim.com
     Application Startup File: server.js
     ```

4. **Dosyaları Yükleyin:**
   - FTP ile `application root` klasörüne yükleyin
   - VEYA cPanel File Manager → Upload

**Gerekli Dosyalar:**
```
asaanayazilim/
├── .next/              (Build klasörü)
├── public/             (Static dosyalar)
├── node_modules/       (Dependencies - production build'den önce yüklenmeli)
├── package.json
├── next.config.mjs
├── prisma/
├── .env.production     (Environment variables)
└── server.js           (Node.js entry point - oluşturulmalı)
```

#### 4.3. server.js Dosyası Oluşturun

cPanel Node.js için `server.js` dosyası gerekir:

```javascript
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
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
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

#### 4.4. Environment Variables

cPanel → Node.js App → Environment Variables:

```
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/database
ADMIN_EMAIL=hasancankilic25@gmail.com
ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_SITE_URL=https://asaanayazilim.com
```

#### 4.5. Database Kurulumu

cPanel → PostgreSQL veya MySQL Databases:

1. Database oluşturun: `asaanayazilim_db`
2. User oluşturun ve database'e ekleyin
3. Connection string'i `.env` dosyasına ekleyin:

```
# PostgreSQL için:
DATABASE_URL=postgresql://username:password@localhost:5432/asaanayazilim_db

# MySQL için (Prisma schema'yı mysql'e çevirmeniz gerekir):
DATABASE_URL=mysql://username:password@localhost:3306/asaanayazilim_db
```

4. Database migration:

```bash
# SSH üzerinden veya cPanel Terminal:
cd /home/username/asaanayazilim
npx prisma migrate deploy
npx prisma generate
```

#### 4.6. .htaccess Dosyası (Gerekirse)

Eğer static export yapıyorsanız veya Apache kullanıyorsanız:

```apache
# .htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # HTTPS yönlendirme
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # www yönlendirme (opsiyonel)
  RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
  RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
  
  # Next.js routing
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /index.html [L]
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

**Dosya konumu:** `public_html/.htaccess` veya `public_html/asaanayazilim/.htaccess`

---

## 5. SEO ve TEKNİK AYARLAR

### 5.1. Meta Tags (Title, Description, Keywords)

Projede zaten var ama özelleştirmek için:

**Ana Sayfa:**
```
Title: AŞAANA YAZILIM - Geleceği Kodluyoruz | Mobil & Web Yazılım
Description: Modern yazılım çözümleri, mobil uygulama geliştirme, web yazılım, yapay zeka ve danışmanlık hizmetleri. Türkiye'nin güvenilir yazılım partneri.
Keywords: yazılım şirketi, mobil uygulama, web yazılım, yapay zeka, yazılım geliştirme, İstanbul yazılım şirketi
```

**Hizmetler:**
```
Title: Yazılım Hizmetlerimiz | AŞAANA YAZILIM
Description: Mobil uygulama, web yazılım, SaaS çözümleri, yapay zeka ve UI/UX tasarım hizmetlerimiz. İşinize değer katan yazılım çözümleri.
```

**Projeler:**
```
Title: Yazılım Projelerimiz | AŞAANA YAZILIM
Description: Başarıyla tamamladığımız mobil ve web yazılım projeleri. Referanslarımız ve çözümlerimiz.
```

**Blog:**
```
Title: Yazılım Blog | AŞAANA YAZILIM
Description: Yazılım geliştirme, teknoloji trendleri, iş dünyası ve dijital dönüşüm hakkında güncel yazılar.
```

**İletişim:**
```
Title: İletişim | AŞAANA YAZILIM
Description: Yazılım projeleriniz için bizimle iletişime geçin. İstanbul merkezli yazılım şirketi.
```

### 5.2. Sitemap.xml

Proje otomatik sitemap oluşturuyor. Kontrol için:

```
https://asaanayazilim.com/sitemap.xml
```

**Manuel sitemap oluşturma (gerekirse):**

`public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://asaanayazilim.com/tr</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://asaanayazilim.com/tr/hizmetler</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://asaanayazilim.com/tr/projeler</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://asaanayazilim.com/tr/blog</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://asaanayazilim.com/tr/iletisim</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://asaanayazilim.com/en</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**robots.txt:**

`public/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/

Sitemap: https://asaanayazilim.com/sitemap.xml
```

### 5.3. Google Search Console Kurulumu

1. **Search Console'a Giriş:**
   - https://search.google.com/search-console
   - Google hesabınızla giriş yapın

2. **Property Ekle:**
   - URL öneki: `https://asaanayazilim.com`
   - Alternatif: `https://www.asaanayazilim.com`

3. **Doğrulama:**
   - **HTML etiketi** yöntemini seçin
   - Verilen meta tag'i kopyalayın
   - Projeye ekleyin: `app/layout.tsx` → `<head>` içine

   ```tsx
   <meta name="google-site-verification" content="VERIFICATION_CODE" />
   ```

4. **Sitemap Gönder:**
   - Search Console → Sitemaps
   - `sitemap.xml` ekleyin

5. **URL İnceleme:**
   - Ana sayfa URL'ini gönderin
   - Indexing isteği yapın

### 5.4. Google Analytics Kurulumu

1. **Google Analytics Hesabı:**
   - https://analytics.google.com
   - Property oluşturun: `AŞAANA YAZILIM`

2. **Measurement ID Alın:**
   - G-XXXXXXXXXX formatında bir ID alacaksınız

3. **Environment Variable Ekleyin:**
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Projede zaten entegre!** Sadece env variable'ı eklemeniz yeterli.

**Kontrol:**
- Analytics → Realtime → Şu anda aktif kullanıcılar görünmeli

---

## 6. GÜVENLİK & PERFORMANS

### 6.1. Temel Güvenlik Ayarları

#### Environment Variables Güvenliği

**ASLA şunları commit etmeyin:**
- `.env.local`
- `.env.production`
- Database şifreleri
- API anahtarları
- Admin şifreleri

**.gitignore kontrolü:**
```
.env*.local
.env
.env.production
```

#### Admin Panel Güvenliği

- ✅ Cookie-based authentication aktif
- ✅ HTTP-only cookies kullanılıyor
- ✅ Production'da secure flag aktif
- ✅ Session timeout: 7 gün

**Öneriler:**
- Admin şifresini güçlü tutun (min 16 karakter)
- 2FA ekleyebilirsiniz (ileride)
- Admin paneli sadece güvenli ağlardan erişilebilir yapın (firewall)

#### Database Güvenliği

- ✅ Prisma ORM ile SQL injection koruması
- ✅ Prepared statements kullanılıyor
- ✅ Input validation (Zod)

**Production için:**
- Database erişimini sadece localhost'tan kısıtlayın
- Güçlü database şifreleri kullanın
- Regular backups alın

### 6.2. Cache ve Performans

#### Next.js Optimizasyonları

Projede zaten var:
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting
- ✅ Static generation (mümkün olan sayfalarda)
- ✅ Dynamic imports

#### CDN (Vercel için)

Vercel otomatik CDN sağlar. cPanel için:
- Cloudflare ücretsiz plan önerilir
- CDN cache: Static dosyalar için aktif

#### Browser Caching

`.htaccess` dosyasında cache headers zaten var (Bölüm 4.6).

### 6.3. Gereksiz Açıkların Kapatılması

#### Headers (Security Headers)

`next.config.mjs` içinde:

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
        }
      ],
    },
  ]
}
```

#### Rate Limiting

API route'larında rate limiting eklenebilir (ileride).

---

## 7. TESLİM PAKETİ VE DOKÜMANTASYON

### 7.1. Proje Dosya Yapısı

```
asaanayazilim/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Çoklu dil route'ları
│   │   ├── page.tsx             # Ana sayfa
│   │   ├── hizmetler/           # Hizmetler
│   │   ├── projeler/            # Projeler
│   │   ├── blog/                # Blog
│   │   ├── iletisim/            # İletişim
│   │   └── layout.tsx           # Layout
│   ├── admin/                   # Admin panel
│   │   ├── login/               # Login
│   │   ├── dashboard/           # Dashboard
│   │   ├── blog/                # Blog yönetimi
│   │   ├── projects/            # Proje yönetimi
│   │   └── media/               # Medya kütüphanesi
│   └── api/                     # API routes
│       ├── auth/                # Authentication
│       └── admin/               # Admin API
│           ├── blog/            # Blog CRUD
│           ├── projects/        # Project CRUD
│           └── upload/          # File upload
├── components/                   # React components
│   ├── AdminLayout.tsx          # Admin layout
│   ├── Navbar.tsx               # Navigation
│   ├── Footer.tsx               # Footer
│   └── ...                      # Diğer components
├── lib/                          # Utilities
│   ├── db.ts                    # Prisma client
│   ├── auth-prisma.ts           # Authentication
│   ├── slug.ts                  # Slug generation
│   └── ...                      # Diğer utilities
├── prisma/                       # Database schema
│   └── schema.prisma            # Prisma schema
├── public/                       # Static files
│   ├── robots.txt               # SEO
│   ├── sitemap.xml              # Sitemap
│   └── ...                      # Images, icons
├── messages/                     # i18n translations
│   ├── tr.json                  # Türkçe
│   └── en.json                  # İngilizce
├── package.json                  # Dependencies
├── next.config.mjs              # Next.js config
├── tsconfig.json                # TypeScript config
└── tailwind.config.ts           # Tailwind CSS config
```

### 7.2. Kullanılan Teknolojiler

```
Frontend:
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animasyonlar)

Backend:
- Next.js API Routes
- Prisma ORM
- SQLite (dev) / PostgreSQL (prod)

Database:
- SQLite (development)
- PostgreSQL (production ready)

Authentication:
- Cookie-based session
- bcryptjs (password hashing)

i18n:
- next-intl (Türkçe/İngilizce)

CMS:
- Custom admin panel
- Blog & Project management

Other:
- Zod (validation)
- Lucide React (icons)
- Vercel Analytics
- Speed Insights
```

### 7.3. Environment Variables Listesi

#### Development (.env.local)

```env
# Database
DATABASE_URL="file:./dev.db"

# Admin
ADMIN_EMAIL=hasancankilic25@gmail.com
ADMIN_PASSWORD=your-password

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (opsiyonel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### Production (.env.production)

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# Admin
ADMIN_EMAIL=info@asaanayazilim.com
ADMIN_PASSWORD=very-secure-password-here

# Site
NEXT_PUBLIC_SITE_URL=https://asaanayazilim.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 7.4. Geliştirmeye Açık Noktalar

#### İyileştirme Önerileri:

1. **Blog ve Projeler:**
   - Rich text editor eklenebilir (TinyMCE, Lexical)
   - Image optimization API eklenebilir
   - Bulk operations (toplu silme/yayınlama)

2. **Admin Panel:**
   - Analytics dashboard genişletilebilir
   - User management (çoklu admin)
   - Role-based permissions
   - 2FA authentication

3. **Performance:**
   - ISR (Incremental Static Regeneration)
   - Edge caching
   - Image CDN entegrasyonu

4. **Features:**
   - Contact form email notifications
   - Newsletter subscription
   - Blog comments sistemi
   - Search functionality (blog/projects)

### 7.5. Müşteri Siteleri için Çoğaltma

Bu altyapıyı müşteri siteleri için kullanmak için:

#### Adımlar:

1. **Template Olarak Kullan:**
   ```bash
   # Yeni proje oluştur
   git clone https://github.com/your-org/website-template.git customer-site
   cd customer-site
   ```

2. **Değiştirilecekler:**
   - `messages/tr.json` ve `messages/en.json` → Müşteri içerikleri
   - `public/logo.png` → Müşteri logosu
   - Brand colors (Tailwind config)
   - Domain ve environment variables

3. **Hızlı Kurulum Script:**
   ```bash
   # setup-customer.sh
   #!/bin/bash
   echo "Müşteri adı: "
   read CUSTOMER_NAME
   echo "Domain: "
   read DOMAIN
   
   # Dosya isimlerini değiştir
   # Environment variables ayarla
   # Database oluştur
   # Deploy
   ```

4. **Multi-tenant Yapısı (İleride):**
   - Tek database, çoklu tenant
   - Subdomain-based routing
   - Shared admin panel

### 7.6. Backup Stratejisi

#### Database Backup:

```bash
# PostgreSQL backup
pg_dump -h localhost -U username -d database_name > backup_$(date +%Y%m%d).sql

# SQLite backup
cp prisma/dev.db backups/dev_$(date +%Y%m%d).db
```

#### Automated Backups (cPanel):

cPanel → **Backup** → **Generate/Download a Full Website Backup**

**Önerilen sıklık:**
- Daily: Database
- Weekly: Full backup

### 7.7. Monitoring ve Maintenance

#### Uptime Monitoring:

- UptimeRobot (ücretsiz)
- Pingdom
- Vercel Analytics (built-in)

#### Error Tracking:

- Sentry (ücretsiz plan)
- Vercel Error Tracking (built-in)

#### Performance Monitoring:

- Google PageSpeed Insights
- GTmetrix
- Vercel Analytics

---

## 📞 DESTEK VE SORULAR

### Deployment Sorunları için:

1. **Log Kontrolü:**
   - Vercel: Dashboard → Deployments → Logs
   - cPanel: Error Logs, Application Logs

2. **Database Bağlantı Sorunları:**
   - Connection string kontrolü
   - Database user permissions
   - Firewall rules

3. **SSL Sorunları:**
   - AutoSSL yeniden çalıştırın
   - DNS propagation bekleyin (24-48 saat)

### İletişim:

Teknik destek için:
- Email: info@asaanayazilim.com
- Destek: destek@asaanayazilim.com

---

## ✅ CHECKLIST - Canlıya Alma

- [ ] Domain nameserver'ları ayarlandı
- [ ] DNS kayıtları yapıldı (A, MX, TXT)
- [ ] SSL sertifikası kuruldu
- [ ] Mail hesapları oluşturuldu (info, destek, iletisim)
- [ ] Mail client'lara bağlandı (Gmail/Outlook)
- [ ] Database oluşturuldu ve migration yapıldı
- [ ] Environment variables ayarlandı
- [ ] Dosyalar yüklendi (Vercel veya cPanel)
- [ ] Site erişilebilir (https://asaanayazilim.com)
- [ ] Admin panel çalışıyor
- [ ] Google Search Console kuruldu
- [ ] Google Analytics kuruldu
- [ ] Sitemap.xml erişilebilir
- [ ] robots.txt erişilebilir
- [ ] SSL test edildi (A veya A+)
- [ ] Backup stratejisi belirlendi

---

**Dokümantasyon Versiyonu:** 1.0  
**Son Güncelleme:** Ocak 2025  
**Hazırlayan:** AŞAANA YAZILIM Teknik Ekibi

