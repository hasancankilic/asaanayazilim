# Favicon Dosyaları

Bu klasöre aşağıdaki favicon dosyalarını ekleyin:

## Gerekli Dosyalar:

1. **favicon.ico** (16x16, 32x32, 48x48 içeren multi-size ICO)
2. **favicon-16x16.png** (16x16 PNG)
3. **favicon-32x32.png** (32x32 PNG)
4. **apple-touch-icon.png** (180x180 PNG)

## Oluşturma Yöntemleri:

### Yöntem 1: Online Tool
- https://realfavicongenerator.net/
- Logo dosyanızı yükleyin
- Tüm formatları indirin
- Bu klasöre kopyalayın

### Yöntem 2: ImageMagick (Terminal)
```bash
# Logo'dan favicon oluştur
convert public/logo.png -resize 16x16 public/favicon/favicon-16x16.png
convert public/logo.png -resize 32x32 public/favicon/favicon-32x32.png
convert public/logo.png -resize 180x180 public/favicon/apple-touch-icon.png

# ICO dosyası oluştur
convert public/logo.png -define icon:auto-resize=16,32,48 public/favicon/favicon.ico
```

### Yöntem 3: Photoshop/GIMP
- Logo'yu açın
- Her boyut için yeni dosya oluşturun
- Export edin

## Not:
Mevcut `app/icon.tsx` dosyası dinamik favicon oluşturuyor, ancak statik dosyalar da eklenmelidir.

