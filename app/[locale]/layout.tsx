import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import '../globals.css';
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import { generateHomepageStructuredData } from '@/lib/structured-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';
  const url = locale === 'tr' ? '/tr' : '/en';

  return generateSEOMetadata({
    locale,
    url,
  });
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  let locale: string;
  
  try {
    const resolvedParams = await params;
    locale = resolvedParams.locale;

    // Validate locale
    if (!locale || !routing.locales.includes(locale as any)) {
      // Use default locale instead of notFound for better UX
      locale = routing.defaultLocale;
    }
  } catch (error: any) {
    // If params resolution fails or NEXT_NOT_FOUND is thrown, use default locale
    // Don't call notFound() again as it will create an error loop
    if (error?.digest === 'NEXT_NOT_FOUND') {
      locale = routing.defaultLocale;
    } else {
      console.error('Error resolving params, using default locale:', error);
      locale = routing.defaultLocale;
    }
  }

  // Load messages using next-intl's getMessages
  let messages: any = {};
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error('Error loading messages:', error);
    // Fallback: try default locale
    try {
      messages = await getMessages({ locale: routing.defaultLocale });
    } catch (defaultError) {
      console.error('Error loading default messages:', defaultError);
      // Empty messages object as last resort
      messages = {};
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asaanayazilim.com';
  const structuredData = generateHomepageStructuredData(locale as 'tr' | 'en');

  return (
    <>
      <div className="cosmic-bg fixed inset-0 -z-10"></div>
      {structuredData.map((data, index) => (
        <Script
          key={index}
          id={`structured-data-${locale}-${index}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
