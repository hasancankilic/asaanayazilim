/**
 * Structured Data (JSON-LD) Generator
 * Google-approved schema.org markup for AŞAANA YAZILIM
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asaanayazilim.com';

export interface StructuredDataOptions {
  type?: 'Organization' | 'LocalBusiness' | 'WebSite' | 'SoftwareApplication';
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  locale?: 'tr' | 'en';
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(options: StructuredDataOptions = {}) {
  const name = options.name || 'AŞAANA YAZILIM';
  const description = options.description || 'Modern yazılım çözümleri, mobil uygulama geliştirme, web yazılım, yapay zeka ve danışmanlık hizmetleri';
  const url = options.url || siteUrl;
  const logo = options.logo || `${siteUrl}/logo.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
      width: 512,
      height: 512,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@asaanayazilim.com',
      availableLanguage: ['Turkish', 'English'],
    },
    sameAs: [
      // Add social media links when available
      // 'https://www.linkedin.com/company/asaanayazilim',
      // 'https://twitter.com/asaanayazilim',
      // 'https://www.facebook.com/asaanayazilim',
    ],
    foundingDate: '2024', // Update with actual founding date
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'İstanbul',
      // addressStreet: 'Street Address', // Add when available
      // postalCode: '34000', // Add when available
    },
  };
}

/**
 * Generate LocalBusiness schema
 */
export function generateLocalBusinessSchema(options: StructuredDataOptions = {}) {
  const name = options.name || 'AŞAANA YAZILIM';
  const description = options.description || 'Modern yazılım çözümleri, mobil uygulama geliştirme, web yazılım, yapay zeka ve danışmanlık hizmetleri';
  const url = options.url || siteUrl;
  const logo = options.logo || `${siteUrl}/logo.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#organization`,
    name,
    description,
    image: logo,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
      width: 512,
      height: 512,
    },
    telephone: '+90-XXX-XXX-XX-XX', // Update with actual phone number
    email: 'info@asaanayazilim.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'İstanbul',
      // addressStreet: 'Street Address', // Add when available
      // postalCode: '34000', // Add when available
    },
    geo: {
      '@type': 'GeoCoordinates',
      // latitude: 41.0082, // Add when available
      // longitude: 28.9784, // Add when available
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
    servesCuisine: 'Software Development Services',
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema(options: StructuredDataOptions = {}) {
  const url = options.url || siteUrl;
  const name = options.name || 'AŞAANA YAZILIM';
  const locale = options.locale || 'tr';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name,
    description: locale === 'tr'
      ? 'Modern yazılım çözümleri, mobil uygulama geliştirme, web yazılım, yapay zeka ve danışmanlık hizmetleri'
      : 'Modern software solutions, mobile app development, web software, artificial intelligence and consulting services',
    inLanguage: locale === 'tr' ? 'tr-TR' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate SoftwareApplication schema
 */
export function generateSoftwareApplicationSchema(options: StructuredDataOptions = {}) {
  const name = options.name || 'AŞAANA YAZILIM';
  const description = options.description || 'Modern yazılım çözümleri, mobil uygulama geliştirme, web yazılım, yapay zeka ve danışmanlık hizmetleri';
  const url = options.url || siteUrl;
  const logo = options.logo || `${siteUrl}/logo.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
  };
}

/**
 * Generate comprehensive structured data for homepage
 */
export function generateHomepageStructuredData(locale: 'tr' | 'en' = 'tr') {
  const baseUrl = locale === 'tr' ? `${siteUrl}/tr` : `${siteUrl}/en`;

  return [
    generateOrganizationSchema({
      url: siteUrl,
      locale,
    }),
    generateLocalBusinessSchema({
      url: siteUrl,
      locale,
    }),
    generateWebSiteSchema({
      url: baseUrl,
      locale,
    }),
  ];
}

