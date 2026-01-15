import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import ContactPageClient from '@/components/ContactPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';

  return generateSEOMetadata({
    title: locale === 'tr'
      ? 'İletişim | AŞAANA YAZILIM'
      : 'Contact | AŞAANA YAZILIM',
    description: locale === 'tr'
      ? 'Asaana Yazılım ile iletişime geçin. Projeniz için web, mobil ve yapay zeka çözümleri sunuyoruz.'
      : 'Contact Asaana Software. We deliver web, mobile and AI solutions for your project.',
    locale,
    url: locale === 'tr' ? '/tr/iletisim' : '/en/iletisim',
    image: '/og-image.jpg',
  });
}

export default function ContactPage() {
  return <ContactPageClient />;
}
