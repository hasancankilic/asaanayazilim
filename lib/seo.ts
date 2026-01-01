import { Metadata } from 'next';

export function generateMetadata({
  title,
  description,
  image,
  url,
  locale = 'tr',
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  locale?: string;
}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'AŞAANA YAZILIM',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'tr-TR': `${siteUrl}/tr${url || ''}`,
        'en-US': `${siteUrl}/en${url || ''}`,
      },
    },
  };
}

export function generateJsonLd({
  type = 'SoftwareCompany',
  name,
  description,
  url,
  logo,
}: {
  type?: string;
  name: string;
  description: string;
  url: string;
  logo?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
  const logoUrl = logo
    ? logo.startsWith('http')
      ? logo
      : `${siteUrl}${logo}`
    : `${siteUrl}/logo.png`;

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url: fullUrl,
    logo: logoUrl,
  };

  if (type === 'SoftwareCompany') {
    return {
      ...baseSchema,
      '@type': 'SoftwareApplication',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'TRY',
      },
    };
  }

  return baseSchema;
}





