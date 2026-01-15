import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import { generateHomepageStructuredData } from '@/lib/structured-data';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

const Services = dynamic(() => import('@/components/Services'), {
  ssr: false,
  loading: () => <div className="min-h-[520px]" aria-hidden="true" />,
});
const WhyUs = dynamic(() => import('@/components/WhyUs'), {
  ssr: false,
  loading: () => <div className="min-h-[520px]" aria-hidden="true" />,
});
const FeaturedProjects = dynamic(() => import('@/components/FeaturedProjects'), {
  ssr: false,
  loading: () => <div className="min-h-[520px]" aria-hidden="true" />,
});
const CTA = dynamic(() => import('@/components/CTA'), {
  ssr: false,
  loading: () => <div className="min-h-[320px]" aria-hidden="true" />,
});
const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
  loading: () => <div className="min-h-[200px]" aria-hidden="true" />,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<any> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';
  const url = locale === 'tr' ? '/tr' : '/en';

  return generateSEOMetadata({
    title: locale === 'tr'
      ? 'Asaana Yazılım | Web, Mobil ve Yapay Zeka Çözümleri'
      : 'Asaana Software | Web, Mobile and AI Solutions',
    description: locale === 'tr'
      ? 'Asaana Yazılım; web yazılım, mobil uygulama ve yapay zeka çözümleriyle markaların dijital dönüşümünü hızlandırır.'
      : 'Asaana Software accelerates digital transformation with web, mobile, and AI solutions.',
    absoluteTitle: true,
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
