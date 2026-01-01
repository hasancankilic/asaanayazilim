# SEO Ayarları - AŞAANA YAZILIM

## Meta Tags Örnekleri

### Ana Sayfa (Homepage)

```html
<title>AŞAANA YAZILIM - Geleceği Kodluyoruz | Mobil & Web Yazılım</title>
<meta name="description" content="Modern yazılım çözümleri, mobil uygulama geliştirme, web yazılım, yapay zeka ve danışmanlık hizmetleri. Türkiye'nin güvenilir yazılım partneri.">
<meta name="keywords" content="yazılım şirketi, mobil uygulama, web yazılım, yapay zeka, yazılım geliştirme, İstanbul yazılım şirketi, software company, mobile app development, web development, AI solutions">
<meta name="author" content="AŞAANA YAZILIM">
<meta name="robots" content="index, follow">
<meta name="language" content="Turkish, English">
```

**Open Graph:**
```html
<meta property="og:title" content="AŞAANA YAZILIM - Geleceği Kodluyoruz">
<meta property="og:description" content="Modern yazılım çözümleri, mobil uygulama geliştirme, web yazılım, yapay zeka ve danışmanlık hizmetleri.">
<meta property="og:image" content="https://asaanayazilim.com/og-image.jpg">
<meta property="og:url" content="https://asaanayazilim.com">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AŞAANA YAZILIM">
<meta property="og:locale" content="tr_TR">
<meta property="og:locale:alternate" content="en_US">
```

**Twitter Card:**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="AŞAANA YAZILIM - Geleceği Kodluyoruz">
<meta name="twitter:description" content="Modern yazılım çözümleri, mobil uygulama geliştirme, web yazılım.">
<meta name="twitter:image" content="https://asaanayazilim.com/og-image.jpg">
```

### Hizmetler Sayfası

```html
<title>Yazılım Hizmetlerimiz | Mobil & Web Yazılım | AŞAANA YAZILIM</title>
<meta name="description" content="Mobil uygulama, web yazılım, SaaS çözümleri, yapay zeka ve UI/UX tasarım hizmetlerimiz. İşinize değer katan yazılım çözümleri.">
<meta name="keywords" content="mobil uygulama geliştirme, web yazılım hizmetleri, SaaS çözümleri, yapay zeka projeleri, UI UX tasarım, yazılım danışmanlık">
```

### Projeler Sayfası

```html
<title>Yazılım Projelerimiz ve Referanslar | AŞAANA YAZILIM</title>
<meta name="description" content="Başarıyla tamamladığımız mobil ve web yazılım projeleri. Referanslarımız ve çözümlerimiz. Teknoloji stack'i ve başarı hikayeleri.">
<meta name="keywords" content="yazılım projeleri, referanslar, portfolio, başarı hikayeleri, case studies, teknoloji çözümleri">
```

### Blog Sayfası

```html
<title>Yazılım Blog | Teknoloji Trendleri | AŞAANA YAZILIM</title>
<meta name="description" content="Yazılım geliştirme, teknoloji trendleri, iş dünyası ve dijital dönüşüm hakkında güncel yazılar, ipuçları ve rehberler.">
<meta name="keywords" content="yazılım blog, teknoloji blog, dijital dönüşüm, yazılım geliştirme ipuçları, teknoloji trendleri">
```

### İletişim Sayfası

```html
<title>İletişim | Yazılım Projeleriniz İçin Bize Ulaşın | AŞAANA YAZILIM</title>
<meta name="description" content="Yazılım projeleriniz için bizimle iletişime geçin. İstanbul merkezli yazılım şirketi. Ücretsiz danışmanlık ve teklif alın.">
<meta name="keywords" content="yazılım şirketi iletişim, yazılım danışmanlık, proje teklifi, İstanbul yazılım firması">
```

## JSON-LD Structured Data

Projede zaten var (`app/layout.tsx`), ama özelleştirmek için:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AŞAANA YAZILIM",
  "description": "Modern Yazılım • Mobil & Web • Yapay Zeka",
  "url": "https://asaanayazilim.com",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "TRY"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-XXX-XXX-XXXX",
    "contactType": "customer service",
    "email": "info@asaanayazilim.com",
    "areaServed": "TR",
    "availableLanguage": ["Turkish", "English"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "TR",
    "addressLocality": "İstanbul"
  }
}
```

## Sitemap.xml

Proje otomatik sitemap oluşturuyor (`app/sitemap.ts`). Erişim:
```
https://asaanayazilim.com/sitemap.xml
```

## Robots.txt

Proje otomatik robots.txt oluşturuyor (`app/robots.ts`). İçerik:

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/

Sitemap: https://asaanayazilim.com/sitemap.xml
```

## Google Search Console Kurulumu

### Adım 1: Search Console'a Ekleme

1. https://search.google.com/search-console
2. Property ekle → URL öneki: `https://asaanayazilim.com`
3. Doğrulama yöntemi seçin

### Adım 2: HTML Etiketi ile Doğrulama (Önerilen)

1. Doğrulama kodu alın (örnek: `abc123xyz`)
2. `app/layout.tsx` dosyasına ekleyin:

```tsx
<head>
  <meta name="google-site-verification" content="abc123xyz" />
  {/* Diğer meta tags */}
</head>
```

### Adım 3: DNS ile Doğrulama (Alternatif)

1. TXT kaydı ekleyin: `google-site-verification=abc123xyz`
2. DNS Zone Editor'dan ekleyin
3. Doğrulamayı tamamlayın

### Adım 4: Sitemap Gönderme

1. Search Console → Sitemaps
2. `sitemap.xml` ekleyin
3. Gönder butonuna tıklayın

### Adım 5: URL İnceleme

1. Search Console → URL İnceleme
2. Ana sayfa URL'ini girin: `https://asaanayazilim.com/tr`
3. "İndeksleme iste" butonuna tıklayın

## Google Analytics Kurulumu

### Adım 1: Google Analytics Hesabı

1. https://analytics.google.com
2. Hesap oluştur: "AŞAANA YAZILIM"
3. Property oluştur: "Website"
4. Measurement ID alın: `G-XXXXXXXXXX`

### Adım 2: Projeye Ekleme

Environment variable ekleyin:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**NOT:** Projede zaten entegre! Sadece env variable eklemeniz yeterli.

### Adım 3: Test

1. Analytics → Realtime → Overview
2. Sitenizi ziyaret edin
3. Realtime'da görünmeli

## Bing Webmaster Tools (Opsiyonel)

1. https://www.bing.com/webmasters
2. Site ekle: `https://asaanayazilim.com`
3. XML sitemap gönderin
4. Doğrulama yapın

## Yandex Webmaster (Opsiyonel - Türkiye için)

1. https://webmaster.yandex.com
2. Site ekle
3. HTML etiketi veya DNS ile doğrulama
4. Sitemap gönderin

## SEO İpuçları

### 1. İçerik Optimizasyonu

- **Title:** 50-60 karakter (mobilde görünecek şekilde)
- **Description:** 150-160 karakter (arama sonuçlarında görünür)
- **Keywords:** Doğal kullanın, keyword stuffing yapmayın

### 2. URL Yapısı

- ✅ İyi: `/tr/hizmetler/mobil-uygulama`
- ❌ Kötü: `/tr/services?id=1&cat=mobile`

### 3. İç Linkleme

- Blog yazılarında ilgili sayfalara link verin
- Navigation menüsü tutarlı olsun
- Footer'da önemli sayfalara link verin

### 4. Görsel Optimizasyonu

- Alt text ekleyin: `<img alt="Mobil Uygulama Geliştirme">`
- Dosya isimlerini açıklayıcı yapın: `mobil-uygulama-gelistirme.jpg`
- Image sitemap ekleyebilirsiniz

### 5. Hız Optimizasyonu

- ✅ Next.js Image optimization (zaten var)
- ✅ Code splitting (zaten var)
- ✅ CDN kullanın (Vercel otomatik)
- ✅ Gzip compression (.htaccess'te var)

### 6. Mobil Uyumluluk

- ✅ Responsive design (zaten var)
- ✅ Mobile-first approach (zaten var)
- ✅ Touch-friendly buttons (zaten var)

## Local SEO (Yerel Arama)

### Google Business Profile

1. https://business.google.com
2. İşletme ekle: "AŞAANA YAZILIM"
3. Adres, telefon, çalışma saatleri ekleyin
4. Fotoğraflar yükleyin
5. Müşteri yorumlarını yönetin

### Schema.org LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AŞAANA YAZILIM",
  "image": "https://asaanayazilim.com/logo.png",
  "@id": "https://asaanayazilim.com",
  "url": "https://asaanayazilim.com",
  "telephone": "+90-XXX-XXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Adres",
    "addressLocality": "İstanbul",
    "postalCode": "34000",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.0082,
    "longitude": 28.9784
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  }
}
```

## Performans Metrikleri

### Hedefler

- **PageSpeed Score:** 90+ (mobile ve desktop)
- **First Contentful Paint (FCP):** < 1.8s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.8s
- **Cumulative Layout Shift (CLS):** < 0.1

### Test Araçları

- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

## Sosyal Medya Paylaşımı

### Open Graph Image

`public/og-image.jpg` dosyası oluşturun:
- Boyut: 1200x630px
- Format: JPG veya PNG
- İçerik: Logo + başlık

### Twitter Card Image

- Boyut: 1200x675px
- Format: JPG
- İçerik: Logo + başlık

## Monitoring ve Raporlama

### Aylık Kontroller

1. Google Search Console → Performance raporu
2. Google Analytics → Traffic raporu
3. PageSpeed Insights testi
4. Broken links kontrolü
5. Sitemap güncelliği

---

**Önemli:** Proje zaten SEO optimizasyonu içeriyor. Bu dokümantasyon özelleştirme ve geliştirme için rehberdir.

