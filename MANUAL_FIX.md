# ⚠️ MANUEL İZİN DÜZELTME GEREKLİ

## ❌ SORUN

Script çalıştı ama bazı dosyalar için izin sorunu devam ediyor. Sandbox kısıtlamaları nedeniyle `sudo` komutu çalışmadı.

---

## ✅ MANUEL ÇÖZÜM (Terminal'de Çalıştırın)

### 1. npm cache izinlerini düzeltin

```bash
sudo chown -R 501:20 "/Users/kilic/.npm"
```

### 2. Proje dosya izinlerini düzeltin

```bash
cd /Users/kilic/Developer/asaanayazilim
sudo chown -R $(whoami) /Users/kilic/Developer/asaanayazilim
```

### 3. Extended attributes temizleyin

```bash
xattr -rc /Users/kilic/Developer/asaanayazilim
```

### 4. node_modules'ü tamamen temizleyin ve yeniden yükleyin

```bash
# Eğer hala izin sorunu varsa, sudo ile silin:
sudo rm -rf node_modules

# Sonra normal kullanıcı ile yükleyin:
npm install
```

### 5. Dev server'ı başlatın

```bash
npm run dev
```

---

## 🔍 ALTERNATİF: Farklı Port'ta Başlat

Eğer hala sorun varsa, farklı bir port'ta başlatmayı deneyin:

```bash
PORT=3001 npm run dev
```

Sonra `http://localhost:3001/tr` adresini kullanın.

---

## ⚠️ NOT: Node.js Versiyonu

Mevcut Node.js versiyonu: **v18.19.0**

Bazı paketler Node 20+ istiyor ama genellikle çalışır. Eğer sorun yaşarsanız:

```bash
# nvm kullanıyorsanız:
nvm install 20
nvm use 20

# veya Homebrew ile:
brew install node@20
```

---

## 🎯 BEKLENEN SONUÇ

Manuel izin düzeltmesinden sonra:
- ✅ `npm install` hatasız çalışmalı
- ✅ `npm run dev` server'ı başlatmalı
- ✅ `http://localhost:3000/tr` açılmalı

---

**Manuel komutları terminal'de çalıştırın!**



