import { MetadataRoute } from 'next';
import { staticBlogPosts } from '@/lib/blog-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://asaanayazilim.com'
      : 'http://localhost:3000')
  ).trim().replace(/\/+$/, '');
  const locales = ['tr', 'en'];

  const staticRoutes = [
    '',
    '/hakkimizda',
    '/iletisim',
    '/blog',
    '/projeler',
    '/hizmetler',
    '/erp-yazilimi',
    '/ozel-yazilim',
    '/mobil-uygulama-gelistirme',
    '/web-gelistirme',
  ];

  const highPriorityRoutes = ['/erp-yazilimi', '/ozel-yazilim', '/mobil-uygulama-gelistirme', '/web-gelistirme'];

  const staticPages: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      staticPages.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : highPriorityRoutes.includes(route) ? 0.9 : 0.8,
        alternates: {
          languages: {
            tr: `${baseUrl}/tr${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      });
    }

    // Add all static blog posts
    for (const post of staticBlogPosts) {
      staticPages.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            tr: `${baseUrl}/tr/blog/${post.slug}`,
            en: `${baseUrl}/en/blog/${post.slug}`,
          },
        },
      });
    }
  }
  

  return staticPages;
}
