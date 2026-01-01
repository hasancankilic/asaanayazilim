# Admin Authentication System - Setup Guide

## ✅ Tamamlanan Özellikler

### 1. **Gerçek Authentication Sistemi**
- ✅ Login API route (`/api/auth/login`) oluşturuldu
- ✅ Şifre doğrulama mekanizması kuruldu
- ✅ Email ve şifre validasyonu eklendi
- ✅ Güvenli hata mesajları (email/şifre ayrımı)

### 2. **Login Formu**
- ✅ Form submit gerçekten çalışıyor
- ✅ Loading state gösteriliyor
- ✅ Hata mesajları gösteriliyor
- ✅ Başarılı login sonrası yönlendirme çalışıyor
- ✅ Debug console.log'lar eklendi

### 3. **Session/Cookie Yönetimi**
- ✅ HttpOnly cookie kullanılıyor
- ✅ 7 günlük session süresi
- ✅ Secure flag (production'da aktif)
- ✅ SameSite: lax

### 4. **Auth Guard**
- ✅ Middleware ile admin route koruması
- ✅ AdminLayout içinde auth kontrolü
- ✅ Login sayfasına otomatik yönlendirme
- ✅ Redirect parametresi ile geri dönüş

### 5. **Tüm Admin Sayfaları**
- ✅ `/admin/dashboard` - Dashboard
- ✅ `/admin/blog` - Blog yönetimi
- ✅ `/admin/projects` - Proje yönetimi
- ✅ `/admin/analytics` - Analytics
- ✅ `/admin/settings` - Ayarlar
- ✅ Tüm sayfalar AdminLayout kullanıyor

## 🔐 Admin Credentials

**Varsayılan:**
- Email: `hasancankilic25@gmail.com`
- Şifre: `admin123`

**Environment Variables:**
```env
NEXT_PUBLIC_ADMIN_EMAIL=hasancankilic25@gmail.com
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

## 📦 bcryptjs Kurulumu (Önerilen)

Şu anda şifreler plain text olarak saklanıyor. Production için bcryptjs kurulumu gerekli:

```bash
npm install bcryptjs @types/bcryptjs
```

Kurulum sonrası:
1. `lib/auth.ts` dosyasındaki TODO'ları tamamlayın
2. Şifre hash'ini oluşturun ve `.env.local`'e ekleyin:
   ```env
   ADMIN_PASSWORD_HASH=<bcrypt_hash>
   ```

## 🧪 Test Adımları

1. **Login Sayfası:**
   ```
   http://localhost:3000/admin/login
   ```

2. **Test Credentials:**
   - Email: `hasancankilic25@gmail.com`
   - Şifre: `admin123`

3. **Beklenen Davranış:**
   - ✅ Form submit edildiğinde loading gösterilir
   - ✅ Başarılı login sonrası `/admin/dashboard`'a yönlendirilir
   - ✅ Hatalı girişte kırmızı hata mesajı gösterilir
   - ✅ Console'da debug log'lar görünür

4. **Admin Sayfaları Test:**
   - ✅ `/admin/dashboard` - Açılmalı
   - ✅ `/admin/blog` - Açılmalı
   - ✅ `/admin/projects` - Açılmalı
   - ✅ `/admin/analytics` - Açılmalı
   - ✅ `/admin/settings` - Açılmalı

5. **Auth Guard Test:**
   - ✅ Login olmadan `/admin/dashboard` → Login'e yönlendirilmeli
   - ✅ Login sonrası tüm admin sayfaları açılmalı
   - ✅ Refresh sonrası session korunmalı

## 🐛 Debug

Console'da şu log'lar görünecek:
- `🔐 Login attempt started`
- `📤 Sending login request...`
- `📥 Response status: 200`
- `📥 Response data: {success: true}`
- `✅ Login successful, redirecting...`

## 🔒 Güvenlik Notları

1. **Şu anda:** Şifreler plain text (sadece development için)
2. **Production için:** bcryptjs kurulumu zorunlu
3. **Cookie:** HttpOnly, Secure (production), SameSite: lax
4. **Session:** 7 günlük süre

## 📝 Sonraki Adımlar

1. ✅ bcryptjs kurulumu
2. ✅ Şifre hash'leme
3. ✅ Environment variable'ları güvenli hale getirme
4. ✅ Rate limiting ekleme (opsiyonel)
5. ✅ 2FA ekleme (opsiyonel)




