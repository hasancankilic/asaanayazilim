# Production Deployment Rehberi

Bu rehber, AŞAANA YAZILIM sitesini production'a deploy etmek için gerekli tüm adımları içerir.

---

## 📋 İçindekiler

1. [Environment Variables Ayarlama](#1-environment-variables-ayarlama)
2. [Sanity CMS Kurulumu](#2-sanity-cms-kurulumu)
3. [Analytics Database Entegrasyonu](#3-analytics-database-entegrasyonu)
4. [Vercel Deployment](#4-vercel-deployment)
5. [Diğer Platformlar](#5-diğer-platformlar)
6. [Post-Deployment Kontrolleri](#6-post-deployment-kontrolleri)

---

## 1. Environment Variables Ayarlama

### 1.1 Local Development (.env.local)

Proje root dizininde `.env.local` dosyası oluşturun:

```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin ve değerleri güncelleyin:

```env
# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Admin Credentials
NEXT_PUBLIC_ADMIN_EMAIL=hasancankilic25@gmail.com
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
ADMIN_EMAIL=hasancankilic25@gmail.com
ADMIN_PASSWORD=your-secure-password

# Admin API Token
ADMIN_API_TOKEN=generate-a-secure-random-token
NEXT_PUBLIC_ADMIN_API_TOKEN=generate-a-secure-random-token
```

**⚠️ ÖNEMLİ:** `.env.local` dosyasını asla Git'e commit etmeyin! (zaten .gitignore'da)

### 1.2 Production (Vercel)

#### Adım 1: Vercel Dashboard'a Gidin
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projenizi seçin
2. **Settings** → **Environment Variables**

#### Adım 2: Environment Variables Ekleyin

Aşağıdaki değişkenleri ekleyin:

**Zorunlu:**
```
NEXT_PUBLIC_SITE_URL = https://yourdomain.com
NEXT_PUBLIC_ADMIN_EMAIL = hasancankilic25@gmail.com
NEXT_PUBLIC_ADMIN_PASSWORD = your-secure-password
ADMIN_EMAIL = hasancankilic25@gmail.com
ADMIN_PASSWORD = your-secure-password
ADMIN_API_TOKEN = generate-a-secure-random-token
NEXT_PUBLIC_ADMIN_API_TOKEN = generate-a-secure-random-token
NODE_ENV = production
```

**Opsiyonel (Sanity CMS için):**
```
NEXT_PUBLIC_SANITY_PROJECT_ID = your-project-id
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SANITY_API_VERSION = 2024-01-01
SANITY_API_TOKEN = your-sanity-api-token
```

**Opsiyonel (Analytics Database için):**
```
DATABASE_URL = postgresql://user:password@host:5432/database
# VEYA
MONGODB_URI = mongodb://user:password@host:27017/database
# VEYA
KV_REST_API_URL = https://your-kv-instance.vercel.app
KV_REST_API_TOKEN = your-kv-token
```

**Opsiyonel (Email için):**
```
RESEND_API_KEY = re_your_api_key_here
RESEND_FROM_EMAIL = noreply@yourdomain.com
RESEND_TO_EMAIL = info@yourdomain.com
```

**Opsiyonel (Google Analytics için):**
```
NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
```

#### Adım 3: Environment Seçimi

Her değişken için **Environment** seçin:
- ✅ **Production** (mutlaka seçin)
- ✅ **Preview** (opsiyonel, test için)
- ✅ **Development** (opsiyonel, local için)

#### Adım 4: Deploy

Değişkenleri ekledikten sonra:
1. **Deployments** → **Redeploy** (veya yeni commit push edin)
2. Build log'larını kontrol edin

---

## 2. Sanity CMS Kurulumu

### 2.1 Sanity Projesi Oluşturma

#### Adım 1: Sanity CLI Kurulumu
```bash
npm install -g @sanity/cli
```

#### Adım 2: Sanity Projesi Oluşturma
```bash
cd /Users/kilic/Developer/asaanayazilim
npx sanity init
```

**Sorular:**
- "Create new project" → **Yes**
- Project name → **AŞAANA YAZILIM** (veya istediğiniz isim)
- Dataset name → **production**
- Output path → **./sanity** (mevcut dizini kullan)
- Use TypeScript? → **Yes**
- Template → **Clean project with no predefined schemas**

#### Adım 3: Project ID'yi Alın

Sanity Studio açıldığında veya [Sanity Manage](https://sanity.io/manage) sayfasından:
1. Projenizi seçin
2. **API** → **Project ID**'yi kopyalayın

#### Adım 4: Environment Variables'a Ekleyin

**Local (.env.local):**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Production (Vercel):**
Yukarıdaki değerleri Vercel Environment Variables'a ekleyin.

#### Adım 5: Sanity API Token Oluşturma

1. [Sanity Manage](https://sanity.io/manage) → Projenizi seçin
2. **API** → **Tokens** → **Add API token**
3. Token name → **Production Token**
4. Permissions → **Editor** (read + write)
5. Token'ı kopyalayın

**Production (Vercel):**
```
SANITY_API_TOKEN=your-token-here
```

**⚠️ ÖNEMLİ:** Token'ı asla public repository'ye commit etmeyin!

### 2.2 Sanity Schemas Kontrolü

Mevcut schemas'ları kontrol edin:
```bash
ls sanity/schemas/
```

Şu dosyalar olmalı:
- `index.ts` - Schema exports
- `blogPost.ts` - Blog post schema
- `project.ts` - Project schema

### 2.3 Sanity Studio Test

```bash
npm run dev
```

Tarayıcıda açın:
- `http://localhost:3000/admin/studio`

Login yapın ve içerik ekleyin.

---

## 3. Analytics Database Entegrasyonu

Şu anda analytics verileri in-memory store'da tutuluyor. Production'da database kullanmanız önerilir.

### 3.1 Seçenek 1: Vercel KV (Redis) - Önerilen

#### Adım 1: Vercel KV Oluşturma

1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Storage** → **Create Database** → **KV**
3. Database name → **analytics-kv**
4. Region → Size yakın bölgeyi seçin

#### Adım 2: Environment Variables

Vercel otomatik olarak şu değişkenleri ekler:
```
KV_REST_API_URL=https://your-kv-instance.vercel.app
KV_REST_API_TOKEN=your-kv-token
```

#### Adım 3: Package Installation

```bash
npm install @vercel/kv
```

#### Adım 4: Analytics API Güncelleme

`app/api/analytics/route.ts` dosyasını güncelleyin (aşağıdaki örnek kodu kullanın).

### 3.2 Seçenek 2: PostgreSQL

#### Adım 1: Database Oluşturma

**Vercel Postgres:**
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Storage** → **Create Database** → **Postgres**
3. Database name → **analytics-db**

**Veya başka bir provider:**
- [Supabase](https://supabase.com) (ücretsiz tier)
- [Neon](https://neon.tech) (ücretsiz tier)
- [Railway](https://railway.app) (ücretsiz tier)

#### Adım 2: Connection String

Database provider'dan connection string'i alın:
```
postgresql://user:password@host:5432/database
```

#### Adım 3: Environment Variables

```
DATABASE_URL=postgresql://user:password@host:5432/database
```

#### Adım 4: Package Installation

```bash
npm install @vercel/postgres
# VEYA
npm install pg
```

### 3.3 Seçenek 3: MongoDB

#### Adım 1: MongoDB Oluşturma

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (ücretsiz tier)
- [Railway MongoDB](https://railway.app) (ücretsiz tier)

#### Adım 2: Connection String

```
mongodb://user:password@host:27017/database
```

#### Adım 3: Environment Variables

```
MONGODB_URI=mongodb://user:password@host:27017/database
```

#### Adım 4: Package Installation

```bash
npm install mongodb
```

### 3.4 Analytics API Güncelleme Örneği

**Vercel KV (Redis) Örneği:**

`app/api/analytics/route.ts` dosyasını şu şekilde güncelleyin:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { kv } from '@vercel/kv';

// Helper functions for KV storage
async function getPageViews(): Promise<Record<string, number>> {
  try {
    const data = await kv.get('analytics:pageViews');
    return data || {};
  } catch {
    return {};
  }
}

async function setPageViews(page: string, count: number) {
  try {
    const pageViews = await getPageViews();
    pageViews[page] = count;
    await kv.set('analytics:pageViews', pageViews);
  } catch (error) {
    console.error('Error setting page views:', error);
  }
}

async function addEvent(event: { event: string; data: Record<string, any>; timestamp: number; page: string }) {
  try {
    const events = await kv.lrange('analytics:events', 0, 999); // Last 1000 events
    await kv.lpush('analytics:events', JSON.stringify(event));
    if (events.length >= 1000) {
      await kv.rpop('analytics:events');
    }
  } catch (error) {
    console.error('Error adding event:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, event, data, page, sessionId } = body;

    if (type === 'pageview') {
      const pageViews = await getPageViews();
      const count = pageViews[page || '/'] || 0;
      await setPageViews(page || '/', count + 1);

      // Track session
      if (sessionId) {
        const sessionKey = `analytics:session:${sessionId}`;
        const session = await kv.get(sessionKey) || {
          start: Date.now(),
          pages: [],
          lastActivity: Date.now(),
        };
        session.pages.push(page || '/');
        session.lastActivity = Date.now();
        await kv.set(sessionKey, session, { ex: 1800 }); // 30 minutes TTL
      }
    } else if (type === 'event') {
      await addEvent({
        event: event || 'unknown',
        data: data || {},
        timestamp: Date.now(),
        page: page || '/',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // ... authentication check (mevcut kod) ...

  try {
    const pageViews = await getPageViews();
    const events = await kv.lrange('analytics:events', 0, 49); // Last 50 events
    
    const eventsByType = events.reduce((acc, evtStr) => {
      const evt = JSON.parse(evtStr);
      acc[evt.event] = (acc[evt.event] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recentEvents = events
      .reverse()
      .map((evtStr) => {
        const evt = JSON.parse(evtStr);
        return {
          ...evt,
          date: new Date(evt.timestamp).toISOString(),
        };
      });

    // Calculate active users
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    const sessionKeys = await kv.keys('analytics:session:*');
    const activeUsers = await Promise.all(
      sessionKeys.map(async (key) => {
        const session = await kv.get(key);
        return session && (now - session.lastActivity < fiveMinutes);
      })
    ).then(results => results.filter(Boolean).length);

    return NextResponse.json({
      pageViews,
      eventsByType,
      recentEvents,
      totalPageViews: Object.values(pageViews).reduce((a: number, b: number) => a + b, 0),
      totalEvents: events.length,
      activeUsers,
    });
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
```

---

## 4. Vercel Deployment

### 4.1 GitHub Repository'ye Push

```bash
git add .
git commit -m "Production ready"
git push origin main
```

### 4.2 Vercel'de Proje Oluşturma

1. [Vercel Dashboard](https://vercel.com/dashboard)
2. **Add New** → **Project**
3. GitHub repository'nizi seçin
4. **Import**

### 4.3 Build Settings

Vercel otomatik olarak Next.js'i algılar. Eğer değişiklik yapmak isterseniz:

**Build Command:** `npm run build`  
**Output Directory:** `.next`  
**Install Command:** `npm install`

### 4.4 Environment Variables

Yukarıdaki [1.2 Production](#12-production-vercel) bölümündeki adımları takip edin.

### 4.5 Deploy

1. **Deploy** butonuna tıklayın
2. Build log'larını izleyin
3. Deploy tamamlandığında URL'yi kontrol edin

---

## 5. Diğer Platformlar

### 5.1 Netlify

1. [Netlify Dashboard](https://app.netlify.com)
2. **Add new site** → **Import an existing project**
3. GitHub repository'nizi seçin
4. **Site settings** → **Environment variables** → Değişkenleri ekleyin
5. **Deploy site**

### 5.2 Railway

1. [Railway Dashboard](https://railway.app)
2. **New Project** → **Deploy from GitHub repo**
3. Repository'nizi seçin
4. **Variables** → Environment variables ekleyin
5. **Deploy**

### 5.3 Self-Hosted (VPS)

```bash
# Server'da
git clone your-repo-url
cd asaanayazilim
npm install
npm run build

# .env.local dosyası oluştur
nano .env.local
# Environment variables'ları ekle

# PM2 ile çalıştır
npm install -g pm2
pm2 start npm --name "asaanayazilim" -- start
pm2 save
```

---

## 6. Post-Deployment Kontrolleri

### 6.1 Site Kontrolleri

- [ ] Ana sayfa açılıyor mu? (`/tr`, `/en`)
- [ ] Tüm sayfalar yükleniyor mu?
- [ ] İletişim formu çalışıyor mu?
- [ ] Console'da hata var mı?

### 6.2 Admin Panel Kontrolleri

- [ ] `/admin/login` açılıyor mu?
- [ ] Login yapılabiliyor mu?
- [ ] `/admin/dashboard` erişilebiliyor mu?
- [ ] Tüm admin sayfaları yükleniyor mu?
- [ ] Analytics verileri görünüyor mu?
- [ ] Sanity Studio (eğer kullanılıyorsa) çalışıyor mu?

### 6.3 API Kontrolleri

```bash
# Login test
curl -X POST https://yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email","password":"your-password"}'

# Analytics test (admin token ile)
curl https://yourdomain.com/api/analytics \
  -H "Authorization: Bearer your-api-token"
```

### 6.4 Performance Kontrolleri

- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) test edin
- [ ] [Lighthouse](https://developers.google.com/web/tools/lighthouse) test edin
- [ ] Vercel Analytics dashboard'u kontrol edin

---

## 🔒 Güvenlik Kontrolleri

1. **Environment Variables:**
   - [ ] Tüm sensitive değişkenler production'da ayarlandı mı?
   - [ ] `.env.local` Git'e commit edilmedi mi?
   - [ ] Admin şifreleri güçlü mü?

2. **Authentication:**
   - [ ] Admin login çalışıyor mu?
   - [ ] Unauthorized erişimler engelleniyor mu?
   - [ ] Cookie'ler HttpOnly ve Secure mi?

3. **API Security:**
   - [ ] Tüm admin API'leri authentication kontrolü yapıyor mu?
   - [ ] Rate limiting var mı?

---

## 📞 Destek

Sorun yaşarsanız:
1. Build log'larını kontrol edin
2. Browser console'u kontrol edin
3. Server log'larını kontrol edin
4. Environment variables'ları doğrulayın

---

## ✅ Checklist

**Pre-Deployment:**
- [ ] `.env.example` dosyası oluşturuldu
- [ ] Local `.env.local` test edildi
- [ ] `npm run build` başarılı
- [ ] Tüm route'lar test edildi

**Deployment:**
- [ ] Repository GitHub'a push edildi
- [ ] Vercel'de proje oluşturuldu
- [ ] Environment variables eklendi
- [ ] Deploy başarılı

**Post-Deployment:**
- [ ] Site açılıyor
- [ ] Admin panel çalışıyor
- [ ] Analytics çalışıyor (eğer database kullanılıyorsa)
- [ ] Sanity Studio çalışıyor (eğer kullanılıyorsa)

---

**Status:** ✅ **PRODUCTION DEPLOYMENT GUIDE READY**

