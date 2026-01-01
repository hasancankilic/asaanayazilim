# DNS Kayıtları - asaanayazilim.com

## cPanel DNS Zone Editor Ayarları

Aşağıdaki kayıtları cPanel → **Zone Editor** veya **Advanced DNS Zone Editor** bölümüne ekleyin.

### 1. A Kayıtları (IPv4)

```
Type    Name    Address         TTL     Priority
A       @       YOUR_IP_HERE    3600    -
A       www     YOUR_IP_HERE    3600    -
```

**YOUR_IP_HERE:** Hosting firmanızdan aldığınız IP adresini yazın.

**Not:** `@` sembolü root domain (asaanayazilim.com) anlamına gelir.

### 2. CNAME Kayıtları (www yönlendirme)

Eğer www'yu ana domain'e yönlendirmek istiyorsanız:

```
Type    Name    Value           TTL
CNAME   www     @               3600
```

VEYA direkt IP kullanacaksanız A kaydı yeterli (yukarıda).

### 3. MX Kayıtları (Mail)

```
Type    Name    Value                           TTL     Priority
MX      @       mail.asaanayazilim.com          3600    10
MX      @       mail2.asaanayazilim.com         3600    20
```

**Önemli:** Priority değeri düşük olan önceliklidir (10 > 20).

**Not:** Mail sunucu adresini hosting firmanızdan öğrenin. Genellikle:
- `mail.yourdomain.com`
- `mail.yourhosting.com`
- veya IP adresi olabilir

### 4. TXT Kayıtları (SPF, DKIM, DMARC)

#### SPF (Email güvenliği)

```
Type    Name    Value                                           TTL
TXT     @       "v=spf1 include:yourhosting.com ~all"          3600
```

**yourhosting.com:** Hosting firmanızın mail sunucusu domain'i. Örnekler:
- `include:mail.yourhosting.com`
- `include:_spf.google.com` (Gmail kullanıyorsanız)
- veya hosting firmanızın verdiği SPF kaydı

#### DMARC

```
Type    Name    Value                                                           TTL
TXT     _dmarc  "v=DMARC1; p=none; rua=mailto:info@asaanayazilim.com"          3600
```

**p=none:** Başlangıç için (izleme modu)  
**p=quarantine:** Şüpheli emailleri karantinaya al  
**p=reject:** Şüpheli emailleri reddet

#### DKIM (Hosting firmanızdan alınacak)

Hosting firmanız DKIM key'i sağlayacaktır. Örnek:

```
Type    Name    Value                           TTL
TXT     default._domainkey  "v=DKIM1; k=rsa; p=..."  3600
```

### 5. CAA Kayıtları (SSL için - Opsiyonel)

Let's Encrypt için:

```
Type    Name    Value                           TTL
CAA     @       0 issue "letsencrypt.org"       3600
```

### 6. Tüm Kayıtlar Özet Tablosu

| Type | Name | Value | TTL | Priority/Notes |
|------|------|-------|-----|----------------|
| A | @ | YOUR_IP | 3600 | Ana domain |
| A | www | YOUR_IP | 3600 | www subdomain |
| MX | @ | mail.asaanayazilim.com | 3600 | 10 (Primary) |
| MX | @ | mail2.asaanayazilim.com | 3600 | 20 (Backup) |
| TXT | @ | v=spf1 include:... | 3600 | SPF |
| TXT | _dmarc | v=DMARC1; p=none; ... | 3600 | DMARC |
| TXT | default._domainkey | v=DKIM1; ... | 3600 | DKIM (hosting'den) |
| CAA | @ | 0 issue "letsencrypt.org" | 3600 | SSL |

## Kontrol Komutları

### DNS Kayıtlarını Kontrol Etme

Terminal'de:

```bash
# A kaydı
nslookup asaanayazilim.com

# MX kayıtları
nslookup -type=MX asaanayazilim.com

# TXT kayıtları
nslookup -type=TXT asaanayazilim.com
```

Online araçlar:
- https://mxtoolbox.com/
- https://www.whatsmydns.net/
- https://dnschecker.org/

### DNS Propagation Bekleme Süresi

- Nameserver değişikliği: 24-48 saat (genellikle 2-4 saat)
- DNS kayıt değişiklikleri: 1-4 saat
- TTL süresine göre değişir (3600 = 1 saat)

## Önemli Notlar

1. **Hosting IP'nizi Öğrenin:**
   - cPanel ana sayfasında gösterilir
   - Veya hosting firmanıza sorun

2. **Mail Sunucu Bilgileri:**
   - Hosting firmanız mail sunucu adresini size verecektir
   - Genellikle: `mail.yourhosting.com` veya `mail.yourdomain.com`

3. **SPF Kaydı:**
   - Hosting firmanızın mail sunucusunu `include:` ile eklemelisiniz
   - Birden fazla mail servisi kullanıyorsanız: `"v=spf1 include:hosting.com include:gmail.com ~all"`

4. **DKIM:**
   - Hosting firmanız tarafından sağlanır
   - cPanel → Email → Authentication → DKIM bölümünden alınabilir

5. **TXT Kayıtları:**
   - Tırnak işaretleri içinde yazılmalı
   - Birden fazla TXT kaydı olabilir (SPF, DMARC, DKIM ayrı ayrı)

## Vercel Kullanıyorsanız

Vercel otomatik DNS kayıtları sağlar:

1. Vercel Dashboard → Project → Settings → Domains
2. Domain ekleyin: `asaanayazilim.com`
3. Vercel size DNS kayıtlarını gösterecek:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

Bu kayıtları domain kayıt firmanızda yapın (nameserver değil, DNS kayıtları).

