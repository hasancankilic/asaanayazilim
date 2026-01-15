/**
 * Comprehensive SEO Metadata Generator
 * Google-compliant, production-ready metadata for AŞAANA YAZILIM
 */

import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asaanayazilim.com';
const siteName = 'AŞAANA YAZILIM';
const defaultTitle = 'AŞAANA YAZILIM - Geleceği Kodluyoruz';
const defaultDescriptionTR = 'Modern yazılım çözümleri, mobil uygulama geliştirme, web yazılım, yapay zeka ve danışmanlık hizmetleri. Türkiye\'nin güvenilir yazılım partneri.';
const defaultDescriptionEN = 'Modern software solutions, mobile app development, web software, artificial intelligence and consulting services. Turkey\'s trusted software partner.';
const keywords = 'yazılım şirketi, mobil uygulama, web yazılım, yapay zeka, yazılım geliştirme, İstanbul yazılım şirketi, software company, mobile app development, web development, AI solutions, SaaS, software consulting';

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  locale?: 'tr' | 'en';
  type?: 'website' | 'article';
  noindex?: boolean;
  absoluteTitle?: boolean;
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  locale = 'tr',
  type = 'website',
  noindex = false,
  absoluteTitle = false,
}: GenerateMetadataOptions = {}): Metadata {
  const finalTitle = title
    ? absoluteTitle
      ? title
      : `${title} | ${siteName}`
    : defaultTitle;
  
  const finalDescription = description || (locale === 'tr' ? defaultDescriptionTR : defaultDescriptionEN);
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}/og-image.jpg`;

  const localeCode = locale === 'tr' ? 'tr_TR' : 'en_US';
  const alternateLocale = locale === 'tr' ? 'en_US' : 'tr_TR';
  const otherLocale = locale === 'tr' ? 'en' : 'tr';
  const alternateUrl = fullUrl.includes(`/${locale}`)
    ? fullUrl.replace(`/${locale}`, `/${otherLocale}`)
    : `${siteUrl}/${otherLocale}${url || ''}`;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: fullUrl,
      languages: {
        tr: locale === 'tr' ? fullUrl : alternateUrl,
        en: locale === 'en' ? fullUrl : alternateUrl,
        'x-default': `${siteUrl}/tr`,
      },
    },
    openGraph: {
      type,
      title: finalTitle,
      description: finalDescription,
      url: fullUrl,
      siteName,
      locale: localeCode,
      alternateLocale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [imageUrl],
      creator: '@asaanayazilim', // Update with actual Twitter handle if available
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add Google Search Console verification code when available
      // google: 'verification-code-here',
    },
    category: 'Technology',
    classification: 'Software Development',
  };
}

/**
 * Generate title template for consistent branding
 */
export const titleTemplate = `%s | ${siteName}`;

/**
 * Default metadata for root layout
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: titleTemplate,
  },
  description: defaultDescriptionTR,
  keywords,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon/safari-pinned-tab.svg', color: '#3b82f6' },
    ],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteName,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    siteName,
    title: defaultTitle,
    description: defaultDescriptionTR,
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescriptionTR,
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

