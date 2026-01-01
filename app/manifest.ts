import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asaanayazilim.com';

  return {
    name: 'AŞAANA YAZILIM - Geleceği Kodluyoruz',
    short_name: 'AŞAANA YAZILIM',
    description: 'Modern yazılım çözümleri, mobil uygulama geliştirme, web yazılım, yapay zeka ve danışmanlık hizmetleri',
    start_url: '/tr',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#1e293b',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    categories: ['business', 'productivity', 'technology'],
    lang: 'tr',
    dir: 'ltr',
    scope: '/',
  };
}
