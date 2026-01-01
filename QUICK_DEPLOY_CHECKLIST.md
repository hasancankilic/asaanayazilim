# Hızlı Canlıya Alma Checklist

## ✅ Ön Hazırlık

- [ ] Domain satın alındı (asaanayazilim.com)
- [ ] Hosting/reseller hosting satın alındı
- [ ] cPanel erişim bilgileri alındı
- [ ] Hosting IP adresi öğrenildi
- [ ] Mail sunucu bilgileri alındı

## 🌐 Domain ve DNS

- [ ] Nameserver'lar domain kayıt firmasından ayarlandı
- [ ] DNS kayıtları cPanel'de yapıldı (A, MX, TXT)
- [ ] DNS propagation beklendi (2-4 saat)
- [ ] DNS kayıtları kontrol edildi (nslookup veya online araçlarla)

## 🔒 SSL

- [ ] SSL sertifikası kuruldu (AutoSSL veya Let's Encrypt)
- [ ] HTTPS çalışıyor (https://asaanayazilim.com)
- [ ] SSL test edildi (https://www.ssllabs.com/ssltest/)
- [ ] www ve non-www yönlendirmesi yapıldı

## 📧 Mail Kurulumu

- [ ] info@asaanayazilim.com oluşturuldu
- [ ] destek@asaanayazilim.com oluşturuldu
- [ ] iletisim@asaanayazilim.com oluşturuldu
- [ ] Mail şifreleri güçlü belirlendi (min 12 karakter)
- [ ] MX kayıtları doğru yapıldı
- [ ] SPF kaydı eklendi
- [ ] DMARC kaydı eklendi
- [ ] DKIM key eklendi (hosting'den)
- [ ] Mail Gmail/Outlook'a bağlandı ve test edildi

## 💾 Database

- [ ] PostgreSQL database oluşturuldu (cPanel'de)
- [ ] Database user oluşturuldu ve yetkilendirildi
- [ ] Connection string hazırlandı
- [ ] Prisma migration çalıştırıldı
- [ ] Database bağlantısı test edildi

## 🚀 Web Sitesi Deployment

### Vercel (ÖNERİLEN)

- [ ] Vercel hesabı oluşturuldu
- [ ] Proje GitHub'a yüklendi
- [ ] Vercel'e bağlandı
- [ ] Environment variables eklendi
- [ ] Domain bağlandı (asaanayazilim.com)
- [ ] İlk deployment başarılı
- [ ] Site erişilebilir

### cPanel Node.js (ALTERNATİF)

- [ ] Node.js app oluşturuldu (cPanel'de)
- [ ] Node.js version seçildi (18.x veya 20.x)
- [ ] Application root belirlendi
- [ ] server.js entry point ayarlandı
- [ ] Dosyalar FTP/File Manager ile yüklendi
- [ ] Environment variables eklendi
- [ ] Dependencies yüklendi (npm install --production)
- [ ] Build alındı (npm run build)
- [ ] Application restart edildi
- [ ] Site erişilebilir

## ⚙️ Environment Variables

- [ ] DATABASE_URL eklendi (PostgreSQL connection string)
- [ ] ADMIN_EMAIL eklendi
- [ ] ADMIN_PASSWORD eklendi (güçlü şifre)
- [ ] NEXT_PUBLIC_SITE_URL eklendi (https://asaanayazilim.com)
- [ ] NEXT_PUBLIC_GA_ID eklendi (Google Analytics - opsiyonel)

## 🔐 Admin Panel

- [ ] Admin login çalışıyor (/admin/login)
- [ ] Admin credentials ile giriş yapıldı
- [ ] Dashboard erişilebilir
- [ ] Blog yönetimi çalışıyor
- [ ] Project yönetimi çalışıyor
- [ ] Test blog post oluşturuldu
- [ ] Test project oluşturuldu

## 🔍 SEO

- [ ] robots.txt erişilebilir (https://asaanayazilim.com/robots.txt)
- [ ] sitemap.xml erişilebilir (https://asaanayazilim.com/sitemap.xml)
- [ ] Google Search Console kuruldu
- [ ] Domain doğrulandı (HTML tag veya DNS)
- [ ] Sitemap Google'a gönderildi
- [ ] Google Analytics kuruldu
- [ ] Analytics kodu eklendi (env variable)
- [ ] Analytics tracking çalışıyor (realtime test)

## 🛡️ Güvenlik

- [ ] Admin şifresi güçlü (min 16 karakter)
- [ ] Environment variables güvenli (şifreler expose edilmedi)
- [ ] HTTPS zorunlu yapıldı
- [ ] Security headers aktif
- [ ] .env dosyaları .gitignore'da

## ⚡ Performans

- [ ] Site hızı test edildi (PageSpeed Insights)
- [ ] Image optimization çalışıyor
- [ ] CDN aktif (Vercel otomatik, cPanel için Cloudflare)
- [ ] Browser caching aktif

## 📊 Monitoring

- [ ] Uptime monitoring kuruldu (UptimeRobot - opsiyonel)
- [ ] Error tracking kuruldu (Sentry - opsiyonel)
- [ ] Backup stratejisi belirlendi
- [ ] İlk backup alındı

## 📝 Final Kontroller

- [ ] Ana sayfa açılıyor
- [ ] Tüm sayfalar erişilebilir (hizmetler, projeler, blog, iletişim)
- [ ] Mobil görünüm test edildi
- [ ] İletişim formu çalışıyor (eğer varsa)
- [ ] Tüm linkler çalışıyor
- [ ] 404 sayfası çalışıyor
- [ ] SSL certificate geçerli
- [ ] Mixed content hatası yok (https/http karışımı)

## ✅ Teslim

- [ ] Tüm dokümantasyon okundu
- [ ] Admin panel kullanımı öğrenildi
- [ ] Backup prosedürü anlaşıldı
- [ ] Destek iletişim kanalları belirlendi

---

## 🎉 Canlıya Alma Tamamlandı!

Tüm checklist'ler tamamlandığında siteniz canlıda olacaktır.

**Site URL:** https://asaanayazilim.com  
**Admin Panel:** https://asaanayazilim.com/admin/login

