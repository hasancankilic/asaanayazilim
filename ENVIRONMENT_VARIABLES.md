# Environment Variables Kılavuzu

## Development (.env.local)

Bu dosyayı proje root dizininde oluşturun:

```env
# Database (SQLite - Development)
DATABASE_URL="file:./dev.db"

# Admin Authentication
ADMIN_EMAIL=hasancankilic25@gmail.com
ADMIN_PASSWORD=your-secure-password-here

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Analytics (Opsiyonel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email Service (Opsiyonel - Contact form için)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@asaanayazilim.com
RESEND_TO_EMAIL=info@asaanayazilim.com
```

## Production (.env.production)

Vercel veya cPanel'de environment variables olarak ekleyin:

```env
# Database (PostgreSQL - Production)
DATABASE_URL="postgresql://username:password@host:5432/asaanayazilim_db"

# Admin Authentication
ADMIN_EMAIL=info@asaanayazilim.com
ADMIN_PASSWORD=VERY-SECURE-PASSWORD-MIN-16-CHARS

# Site URL
NEXT_PUBLIC_SITE_URL=https://asaanayazilim.com

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@asaanayazilim.com
RESEND_TO_EMAIL=info@asaanayazilim.com
```

## Önemli Notlar

1. **ASLA `.env` dosyalarını Git'e commit etmeyin!**
2. Production şifreleri çok güçlü olmalı (min 16 karakter)
3. Database URL'i production'da PostgreSQL olmalı
4. `NEXT_PUBLIC_*` prefix'li değişkenler client-side'da kullanılabilir
5. Diğer değişkenler sadece server-side'da kullanılır

## Vercel'de Eklemek İçin

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Her bir değişkeni ekleyin
3. Environment: Production, Preview, Development seçeneklerini işaretleyin
4. Save butonuna tıklayın
5. Yeni bir deployment tetikleyin

## cPanel Node.js'de Eklemek İçin

1. cPanel → Setup Node.js App
2. Uygulamanızı seçin
3. Environment Variables bölümüne gidin
4. Her bir değişkeni ekleyin
5. Restart Application butonuna tıklayın

