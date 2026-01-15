import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://asaanayazilim.com'
      : 'http://localhost:3000');
  const locales = ['tr', 'en'];

  const staticRoutes = [
    '',
    '/hakkimizda',
    '/iletisim',
    '/blog',
    '/projeler',
    '/hizmetler',
  ];

  const staticPages: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      staticPages.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            tr: `${baseUrl}/tr${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      });
    }
  }

  // Dynamic pages from CMS (only if Sanity is configured)
  let dynamicPages: MetadataRoute.Sitemap = [];
  
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const { client } = await import('@/lib/sanity/client');
      const { blogPostsQuery, projectsQuery, servicesQuery } = await import('@/lib/sanity/queries');
      
      if (!client) {
        return staticPages;
      }
      
      const [blogPosts, projects, services] = await Promise.all([
        client.fetch(blogPostsQuery),
        client.fetch(projectsQuery),
        client.fetch(servicesQuery),
      ]);

    const dynamicPages: MetadataRoute.Sitemap = [];

    for (const locale of locales) {
      for (const post of blogPosts) {
        dynamicPages.push({
          url: `${baseUrl}/${locale}/blog/${post.slug.current}`,
          lastModified: new Date(post.publishedAt || post._createdAt),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
          alternates: {
            languages: {
              'tr-TR': `${baseUrl}/tr/blog/${post.slug.current}`,
              'en-US': `${baseUrl}/en/blog/${post.slug.current}`,
              'x-default': `${baseUrl}/tr/blog/${post.slug.current}`,
            },
          },
        });
      }

      for (const project of projects) {
        dynamicPages.push({
          url: `${baseUrl}/${locale}/projeler/${project.slug.current}`,
          lastModified: new Date(project._createdAt),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
          alternates: {
            languages: {
              'tr-TR': `${baseUrl}/tr/projeler/${project.slug.current}`,
              'en-US': `${baseUrl}/en/projeler/${project.slug.current}`,
              'x-default': `${baseUrl}/tr/projeler/${project.slug.current}`,
            },
          },
        });
      }

      for (const service of services) {
        dynamicPages.push({
          url: `${baseUrl}/${locale}/hizmetler/${service.slug.current}`,
          lastModified: new Date(service._createdAt),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
          alternates: {
            languages: {
              'tr-TR': `${baseUrl}/tr/hizmetler/${service.slug.current}`,
              'en-US': `${baseUrl}/en/hizmetler/${service.slug.current}`,
              'x-default': `${baseUrl}/tr/hizmetler/${service.slug.current}`,
            },
          },
        });
      }
    }

      return [...staticPages, ...dynamicPages];
    } catch (error) {
      console.error('Error generating sitemap from CMS:', error);
      return staticPages;
    }
  }

  return staticPages;
}


