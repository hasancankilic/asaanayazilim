# Müşteri Siteleri için Template Kullanım Rehberi

Bu altyapıyı müşteri projeleri için template olarak kullanmak için adım adım rehber.

---

## 🎯 Genel Yaklaşım

Bu proje, müşteri siteleri için **başlangıç template'i** olarak kullanılabilir. Her müşteri için yeni bir kopya oluşturup özelleştirirsiniz.

---

## 📋 Adım Adım: Yeni Müşteri Sitesi Oluşturma

### 1. Proje Kopyalama

```bash
# Ana template'i kopyalayın
cp -r asaanayazilim customer-site-name
cd customer-site-name

# Git repository'sini yeniden başlatın
rm -rf .git
git init
git add .
git commit -m "Initial commit: Customer Site Name"
```

### 2. Temel Değişiklikler

#### A. Package.json

```json
{
  "name": "customer-site-name",
  "version": "1.0.0",
  "description": "Customer Site Name - Website",
  ...
}
```

#### B. Domain ve Site URL

`.env.production`:
```env
NEXT_PUBLIC_SITE_URL=https://customerdomain.com
```

#### C. Logo ve Branding

1. **Logo Değiştirme:**
   ```bash
   # Yeni logo'yu yükleyin
   cp new-logo.png public/logo.png
   ```

2. **Favicon:**
   ```bash
   # app/icon.tsx dosyasını özelleştirin
   # veya public/favicon.ico ekleyin
   ```

3. **Brand Colors (Tailwind):**

   `tailwind.config.ts`:
   ```typescript
   theme: {
     extend: {
       colors: {
         primary: {
           // Müşteri brand rengi
           50: '#...',
           500: '#...',
           900: '#...',
         },
       },
     },
   },
   ```

#### D. İçerik Güncellemeleri

1. **Translation Files:**

   `messages/tr.json` - Türkçe içerikleri müşteri içerikleriyle değiştirin:
   ```json
   {
     "homepage": {
       "title": "Müşteri Şirket Adı",
       "description": "Müşteri açıklaması",
       ...
     }
   }
   ```

   `messages/en.json` - İngilizce içerikleri çevirin

2. **Contact Information:**

   `lib/constants.ts`:
   ```typescript
   export const CONTACT_INFO = {
     email: 'info@customerdomain.com',
     phone: '+90 XXX XXX XX XX',
     address: 'Müşteri Adresi',
     // ...
   };
   ```

#### E. SEO Meta Tags

`app/[locale]/layout.tsx` - Metadata'yı güncelleyin:
```typescript
export const metadata: Metadata = {
  title: 'Müşteri Şirket Adı',
  description: 'Müşteri açıklaması',
  // ...
};
```

### 3. Database Kurulumu

```bash
# Yeni database oluşturun
# cPanel'de veya PostgreSQL'de

# .env dosyasını güncelleyin
DATABASE_URL="postgresql://user:password@host:5432/customer_db"

# Migration çalıştırın
npm run db:push
```

### 4. Admin Credentials

`.env.production`:
```env
ADMIN_EMAIL=admin@customerdomain.com
ADMIN_PASSWORD=secure-password-for-customer
```

### 5. Deployment

Vercel kullanıyorsanız:
1. Yeni Vercel project oluşturun
2. Repository'yi bağlayın
3. Environment variables ekleyin
4. Domain bağlayın

---

## 🔄 Çoklu Müşteri Yönetimi (İleride)

İleride multi-tenant yapı kurmak isterseniz:

### Senaryo: Tek Admin Panel, Çoklu Müşteri

```
admin.asaanayazilim.com
  ├── customer1.com (subdomain)
  ├── customer2.com (subdomain)
  └── customer3.com (subdomain)
```

**Gereksinimler:**
- Subdomain-based routing
- Shared database, tenant isolation
- Centralized admin panel

**Şimdilik:** Her müşteri için ayrı deployment önerilir (daha basit, daha güvenli).

---

## 📦 Template Özelleştirme Checklist

Her yeni müşteri için:

- [ ] Proje kopyalandı
- [ ] Package.json güncellendi (name, description)
- [ ] Logo değiştirildi
- [ ] Brand colors güncellendi
- [ ] Domain/Site URL güncellendi
- [ ] Translation files güncellendi (tr.json, en.json)
- [ ] Contact info güncellendi
- [ ] SEO meta tags güncellendi
- [ ] Database oluşturuldu
- [ ] Admin credentials ayarlandı
- [ ] Environment variables ayarlandı
- [ ] Deployment yapıldı
- [ ] SSL kuruldu
- [ ] Domain bağlandı
- [ ] Test edildi

---

## 🛠️ Hızlı Setup Script (İsteğe Bağlı)

Yeni müşteri sitesi için hızlı kurulum script'i oluşturabilirsiniz:

```bash
#!/bin/bash
# setup-customer.sh

echo "Müşteri adı: "
read CUSTOMER_NAME
echo "Domain: "
read DOMAIN
echo "Database adı: "
read DB_NAME

# Proje kopyala
cp -r . "../$CUSTOMER_NAME"
cd "../$CUSTOMER_NAME"

# Package.json güncelle
sed -i '' "s/asaanayazilim/$CUSTOMER_NAME/g" package.json

# .env.example oluştur
cat > .env.production << EOF
DATABASE_URL="postgresql://user:password@host:5432/$DB_NAME"
ADMIN_EMAIL=admin@$DOMAIN
ADMIN_PASSWORD=CHANGE_THIS_PASSWORD
NEXT_PUBLIC_SITE_URL=https://$DOMAIN
EOF

echo "✅ $CUSTOMER_NAME için proje hazır!"
echo "📝 .env.production dosyasını düzenleyin"
echo "🎨 Logo ve içerikleri güncelleyin"
```

---

## 💡 İpuçları

### 1. Ortak Bileşenleri Ayırın

Eğer çok sayıda müşteri sitesi yapacaksanız:

```
shared-components/
├── Button.tsx
├── Card.tsx
└── ...

customer-template/
└── (mevcut proje)
```

Ortak bileşenleri npm package olarak yayınlayabilirsiniz.

### 2. Design System

`lib/design-system.ts` dosyası brand renklerini merkezi yönetir. Her müşteri için güncelleyin.

### 3. CMS İçerikleri

Admin panelden blog ve proje eklemek için:
- `/admin/blog` → Blog yönetimi
- `/admin/projects` → Proje yönetimi

İlk kurulumda örnek içerik ekleyebilirsiniz.

### 4. Backup Stratejisi

Her müşteri sitesi için:
- Database backup (günlük)
- Code backup (Git)
- Media files backup (uploads klasörü)

---

## 📊 Müşteri Site Özellikleri

Her müşteri sitesi şunları içerir:

✅ Çoklu dil desteği (TR/EN)  
✅ Admin panel (Blog & Projects CRUD)  
✅ SEO optimizasyonu  
✅ Contact form  
✅ Analytics entegrasyonu  
✅ Responsive design  
✅ Modern UI/UX  

---

## 🔐 Güvenlik Notları

Her müşteri sitesi için:

1. **Ayrı Admin Credentials:**
   - Her müşteri için farklı admin şifresi
   - Güçlü şifreler (min 16 karakter)

2. **Ayrı Database:**
   - Müşteri verileri izole
   - Backup stratejisi

3. **Environment Variables:**
   - Production secrets güvenli saklanmalı
   - Git'e commit edilmemeli

---

## 📞 Destek

Müşteri siteleri için template kullanımı hakkında sorularınız için:

- Email: info@asaanayazilim.com
- Dokümantasyon: Bu dosya + DEPLOYMENT_GUIDE_TR.md

---

**Versiyon:** 1.0  
**Son Güncelleme:** Ocak 2025

