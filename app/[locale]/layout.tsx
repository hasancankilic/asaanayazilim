import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../globals.css';
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import WhatsAppButton from '@/components/WhatsAppButton';
import VisitorTracker from '@/components/VisitorTracker';

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
      locale = routing.defaultLocale;
    }
  } catch (error: any) {
    if (error?.digest === 'NEXT_NOT_FOUND') {
      locale = routing.defaultLocale;
    } else {
      console.error('Error resolving params, using default locale:', error);
      locale = routing.defaultLocale;
    }
  }

  let messages: any = {};
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error('Error loading messages:', error);
    try {
      messages = await getMessages({ locale: routing.defaultLocale });
    } catch (defaultError) {
      console.error('Error loading default messages:', defaultError);
      messages = {};
    }
  }

  return (
    <>
      <div className="cosmic-bg fixed inset-0 -z-10"></div>
      <NextIntlClientProvider messages={messages}>
        {children}
        <WhatsAppButton />
        <VisitorTracker />
      </NextIntlClientProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
