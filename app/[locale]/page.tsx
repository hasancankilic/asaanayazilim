import { getTranslations } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import { generateHomepageStructuredData } from '@/lib/structured-data';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import FeaturedProjects from '@/components/FeaturedProjects';
import CTA from '@/components/CTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<any> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';
  const url = locale === 'tr' ? '/tr' : '/en';

  const t = await getTranslations({ locale, namespace: 'homepage' });

  return generateSEOMetadata({
    title: locale === 'tr' 
      ? 'AŞAANA YAZILIM - Geleceği Kodluyoruz | Modern Yazılım Çözümleri'
      : 'AŞAANA YAZILIM - Coding the Future | Modern Software Solutions',
    description: locale === 'tr'
      ? 'Modern yazılım çözümleri, mobil uygulama geliştirme, web yazılım, yapay zeka ve danışmanlık hizmetleri. Türkiye\'nin güvenilir yazılım partneri.'
      : 'Modern software solutions, mobile app development, web software, artificial intelligence and consulting services. Turkey\'s trusted software partner.',
    locale,
    url,
    image: '/og-image.jpg',
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';
  const structuredData = generateHomepageStructuredData(locale);

  return (
    <>
      {structuredData.map((data, index) => (
        <Script
          key={index}
          id={`homepage-structured-data-${locale}-${index}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <FeaturedProjects />
      <CTA />
      <Footer />
    </>
  );
}
