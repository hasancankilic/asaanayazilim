# Production Kurulum Rehberi - Türkçe

Bu rehber, production deployment için gerekli tüm adımları Türkçe olarak açıklar.

---

## 🎯 Hızlı Başlangıç

### 1. Environment Variables Ayarlama

#### Local Development (.env.local)

Proje root dizininde `.env.local` dosyası oluşturun:

```bash
# Terminal'de proje dizininde:
cp .env.example .env.local
```

Dosyayı açın ve şu değerleri güncelleyin:

```env
# Site URL (local için)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Admin Giriş Bilgileri
NEXT_PUBLIC_ADMIN_EMAIL=hasancankilic25@gmail.com
NEXT_PUBLIC_ADMIN_PASSWORD=güvenli-şifreniz-buraya
ADMIN_EMAIL=hasancankilic25@gmail.com
ADMIN_PASSWORD=güvenli-şifreniz-buraya

# Admin API Token (rastgele güvenli bir token oluşturun)
ADMIN_API_TOKEN=rastgele-güvenli-token-buraya
NEXT_PUBLIC_ADMIN_API_TOKEN=rastgele-güvenli-token-buraya
```

**Token Oluşturma:**
```bash
# Terminal'de:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Production (Vercel)

1. **Vercel Dashboard'a gidin:**
   - https://vercel.com/dashboard
   - Projenizi seçin

2. **Settings → Environment Variables** bölümüne gidin

3. **Aşağıdaki değişkenleri ekleyin:**

   **Zorunlu Değişkenler:**
   ```
   NEXT_PUBLIC_SITE_URL = https://yourdomain.com
   NEXT_PUBLIC_ADMIN_EMAIL = hasancankilic25@gmail.com
   NEXT_PUBLIC_ADMIN_PASSWORD = güvenli-şifreniz
   ADMIN_EMAIL = hasancankilic25@gmail.com
   ADMIN_PASSWORD = güvenli-şifreniz
   ADMIN_API_TOKEN = rastgele-güvenli-token
   NEXT_PUBLIC_ADMIN_API_TOKEN = rastgele-güvenli-token
   NODE_ENV = production
   ```

   **Her değişken için:**
   - ✅ **Production** seçeneğini işaretleyin
   - ✅ **Preview** seçeneğini işaretleyin (opsiyonel)
   - ❌ **Development** seçeneğini işaretlemeyin (local için .env.local kullanın)

4. **Save** butonuna tıklayın

5. **Deployments → Redeploy** yapın (veya yeni commit push edin)

---

### 2. Sanity CMS Kurulumu

#### Adım 1: Sanity CLI Kurulumu

```bash
npm install -g @sanity/cli
```

#### Adım 2: Sanity Projesi Oluşturma

```bash
# Proje dizininde:
npx sanity init
```

**Sorular ve Cevaplar:**
- "Create new project?" → **Yes** (Y)
- "Project name" → **AŞAANA YAZILIM** (veya istediğiniz isim)
- "Use the default dataset configuration?" → **Yes** (Y)
- "Dataset name" → **production** (Enter'a basın)
- "Output path" → **./sanity** (Enter'a basın - mevcut dizini kullan)
- "Use TypeScript?" → **Yes** (Y)
- "Template" → **Clean project with no predefined schemas** seçin

#### Adım 3: Project ID'yi Bulma

1. Sanity Studio açıldığında URL'de project ID görünecek
   - Veya: https://sanity.io/manage → Projenizi seçin → **API** → **Project ID**

2. **Project ID'yi kopyalayın**

#### Adım 4: Environment Variables'a Ekleme

**Local (.env.local):**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-buraya
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Production (Vercel):**
Yukarıdaki değerleri Vercel Environment Variables'a ekleyin.

#### Adım 5: Sanity API Token Oluşturma

1. https://sanity.io/manage → Projenizi seçin
2. **API** → **Tokens** → **Add API token**
3. **Token name:** Production Token
4. **Permissions:** Editor (read + write)
5. **Token'ı kopyalayın** (bir daha gösterilmeyecek!)

**Production (Vercel):**
```
SANITY_API_TOKEN=your-token-buraya
```

**⚠️ ÖNEMLİ:** Token'ı asla public repository'ye commit etmeyin!

#### Adım 6: Test

```bash
npm run dev
```

Tarayıcıda:
- http://localhost:3000/admin/studio

Login yapın ve içerik ekleyin.

---

### 3. Analytics Database Kurulumu (Vercel KV - Önerilen)

#### Adım 1: Vercel KV Oluşturma

1. **Vercel Dashboard** → Projeniz
2. **Storage** → **Create Database** → **KV**
3. **Database name:** analytics-kv
4. **Region:** Size yakın bölgeyi seçin (örn: Europe)
5. **Create**

#### Adım 2: Environment Variables

Vercel otomatik olarak şu değişkenleri ekler:
```
KV_REST_API_URL=https://your-kv-instance.vercel.app
KV_REST_API_TOKEN=your-kv-token
```

Bu değişkenler otomatik olarak production'da kullanılabilir.

#### Adım 3: Package Installation

```bash
npm install @vercel/kv
```

#### Adım 4: Analytics API Güncelleme

1. `app/api/analytics/route-kv-example.ts` dosyasını açın
2. İçeriğini kopyalayın
3. `app/api/analytics/route.ts` dosyasını açın
4. Mevcut içeriği silin ve kopyaladığınız kodu yapıştırın
5. Dosyayı kaydedin

**Veya:**
```bash
cp app/api/analytics/route-kv-example.ts app/api/analytics/route.ts
```

#### Adım 5: Test

```bash
npm run dev
```

Admin panelinde Analytics sayfasını kontrol edin.

---

### 4. Vercel Deployment

#### Adım 1: GitHub'a Push

```bash
git add .
git commit -m "Production ready"
git push origin main
```

#### Adım 2: Vercel'de Proje Oluşturma

1. https://vercel.com/dashboard
2. **Add New** → **Project**
3. GitHub repository'nizi seçin
4. **Import**

#### Adım 3: Build Settings

Vercel otomatik olarak Next.js'i algılar. Değişiklik yapmanıza gerek yok.

#### Adım 4: Environment Variables

Yukarıdaki [1. Environment Variables](#1-environment-variables-ayarlama) bölümündeki adımları takip edin.

#### Adım 5: Deploy

1. **Deploy** butonuna tıklayın
2. Build log'larını izleyin
3. Deploy tamamlandığında URL'yi kontrol edin

---

## ✅ Kontrol Listesi

### Pre-Deployment
- [ ] `.env.local` dosyası oluşturuldu ve test edildi
- [ ] `npm run build` başarılı
- [ ] Local'de tüm route'lar test edildi
- [ ] Admin login çalışıyor
- [ ] Sanity Studio çalışıyor (eğer kullanılıyorsa)

### Deployment
- [ ] Repository GitHub'a push edildi
- [ ] Vercel'de proje oluşturuldu
- [ ] Tüm environment variables eklendi
- [ ] Deploy başarılı

### Post-Deployment
- [ ] Site açılıyor (https://yourdomain.com)
- [ ] `/tr` ve `/en` route'ları çalışıyor
- [ ] `/admin/login` açılıyor
- [ ] Login yapılabiliyor
- [ ] `/admin/dashboard` erişilebiliyor
- [ ] Analytics çalışıyor (eğer database kullanılıyorsa)
- [ ] Sanity Studio çalışıyor (eğer kullanılıyorsa)

---

## 🔧 Sorun Giderme

### Build Hataları

**Hata:** "Environment variable not found"
- **Çözüm:** Vercel Dashboard'da environment variables'ları kontrol edin

**Hata:** "Sanity client not configured"
- **Çözüm:** `NEXT_PUBLIC_SANITY_PROJECT_ID` değişkenini kontrol edin

### Runtime Hataları

**Hata:** "Analytics API error"
- **Çözüm:** KV database'in oluşturulduğundan ve environment variables'ların ayarlandığından emin olun

**Hata:** "Admin login not working"
- **Çözüm:** `ADMIN_EMAIL` ve `ADMIN_PASSWORD` değişkenlerini kontrol edin

---

## 📞 Yardım

Sorun yaşarsanız:
1. Build log'larını kontrol edin (Vercel Dashboard → Deployments → Build Logs)
2. Browser console'u kontrol edin (F12)
3. Environment variables'ları doğrulayın
4. Local'de test edin (`npm run dev`)

---

**Status:** ✅ **PRODUCTION SETUP GUIDE READY**

