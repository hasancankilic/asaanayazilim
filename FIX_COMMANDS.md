# Kalıcı Çözüm - Terminal Komutları

## ✅ Analiz Sonuçları

**Mevcut Durum:**
- Node.js: v18.19.0 (Global, /usr/local/bin/node)
- npm: 10.2.3
- Proje sahipliği: kilic:staff (✅ Doğru)
- node_modules: Mevcut değil (temiz durumda)
- nvm: Yüklü değil

**Tespit Edilen Sorunlar:**
1. Node.js 18 kullanılıyor (Next.js 14 + Sanity için Node 20 LTS önerilir)
2. nvm yok - Node versiyon yönetimi yok
3. node_modules temiz (yeniden kurulum yapılabilir)

---

## 🔧 ÇÖZÜM ADIMLARI (Sırayla Çalıştırın)

### Adım 1: Proje Dizinine Gidin
```bash
cd /Users/kilic/Developer/asaanayazilim
```

### Adım 2: Çalışan Process'leri Durdurun
```bash
pkill -f "next" || true
```

### Adım 3: Temizlik (Eğer node_modules/.next varsa)
```bash
rm -rf node_modules .next package-lock.json .npm
```

### Adım 4: Proje Dizini Sahipliğini Kontrol ve Düzelt (SUDO GEREKLİ)
```bash
# Mevcut sahiplik kontrolü
ls -ld .

# Eğer root-owned dosyalar varsa (genelde gerekmez ama emin olmak için):
sudo chown -R $(whoami):staff .

# Extended attributes temizle (macOS quarantines)
xattr -rc . 2>/dev/null || true
```

### Adım 5: npm Cache Temizle
```bash
npm cache clean --force
```

### Adım 6: Bağımlılıkları Kur (SUDO KULLANMAYIN)
```bash
npm install
```

### Adım 7: Kurulum Sonrası İzin Kontrolü
```bash
# node_modules sahipliğini kontrol et
ls -ld node_modules

# Eğer root-owned görürseniz (çok nadir):
sudo chown -R $(whoami):staff node_modules
```

### Adım 8: Build Test
```bash
npm run build
```

### Adım 9: Development Server Başlat
```bash
npm run dev
```

---

## 🚀 ÖNERİ: Node.js LTS ile İzole Ortam (Opsiyonel - Önerilir)

Node 20 LTS kullanmak için nvm kurulumu:

```bash
# nvm kurulumu (Homebrew ile)
brew install nvm

# veya curl ile:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Terminal'i yeniden başlat veya:
source ~/.zshrc

# Node 20 LTS kur
nvm install 20
nvm use 20
nvm alias default 20

# Versiyon kontrolü
node --version  # v20.x.x görmeli

# Sonra npm install tekrar çalıştır
npm install
```

---

## ⚠️ ÖNEMLİ NOTLAR

1. **SUDO KULLANIMI:**
   - Sadece `chown` komutlarında gerekli
   - `npm install` ASLA sudo ile çalıştırmayın

2. **İzin Sorunları:**
   - npm install sonrası node_modules kilic:staff olmalı
   - Eğer root-owned görürseniz → chown yapın

3. **Build Hataları:**
   - EPERM hatası → chown çözümü
   - Module not found → npm install tekrar
   - Next.js compile hatası → .next sil, npm run build tekrar

4. **Kalıcı Çözüm:**
   - nvm kullanarak Node versiyonunu izole edin
   - Proje bazlı Node versiyonu: `.nvmrc` dosyası ekleyin

---

## 📋 HIZLI KOMUT SETİ (Copy-Paste Ready)

```bash
cd /Users/kilic/Developer/asaanayazilim && \
pkill -f "next" || true && \
rm -rf node_modules .next package-lock.json && \
npm cache clean --force && \
npm install && \
npm run build
```

Eğer build başarılı olursa:
```bash
npm run dev
```




