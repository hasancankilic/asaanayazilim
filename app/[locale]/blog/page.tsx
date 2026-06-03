import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeader from '@/components/SectionHeader';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import DynamicIcon from '@/components/DynamicIcon';
import { getAllStaticBlogPosts, BLOG_CATEGORIES } from '@/lib/blog-data';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || 'tr') as 'tr' | 'en';
  const t = await getTranslations({ locale, namespace: 'blog' });
  const { generateMetadata: generateSEOMetadata } = await import('@/lib/metadata');

  return generateSEOMetadata({
    title: locale === 'tr'
      ? 'Blog | ERP, Yazılım ve Teknoloji Rehberi | AŞAANA YAZILIM'
      : 'Blog | ERP, Software & Technology Guide | AŞAANA YAZILIM',
    description: locale === 'tr'
      ? 'ERP yazılımı, özel yazılım, mobil uygulama ve iş otomasyonu hakkında uzman rehberleri. İşletmenizi dijital dönüştürme ipuçları.'
      : 'Expert guides on ERP software, custom development, mobile apps and business automation.',
    locale,
    url: locale === 'tr' ? '/tr/blog' : '/en/blog',
    image: '/og-image.jpg',
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('blog');

  // Start with static posts (always available, no DB needed)
  const staticPosts = getAllStaticBlogPosts().map((p) => ({
    id: `static-${p.slug}`,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    coverImageUrl: null as string | null,
    category: p.category,
    readTime: p.readTime,
    publishedAt: p.publishedAt,
    createdAt: p.publishedAt,
    isStatic: true,
  }));

  // Try to fetch DB posts (merge, DB overrides static by slug)
  let dbPosts: any[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog`, { next: { revalidate: 3600 } });
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data?.posts) {
        dbPosts = result.data.posts.map((p: any) => ({ ...p, isStatic: false }));
      }
    }
  } catch {
    // DB not available, use static posts only
  }

  // Merge: DB posts override static posts with same slug
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const mergedPosts = [
    ...dbPosts,
    ...staticPosts.filter((p) => !dbSlugs.has(p.slug)),
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader
            title={t('title')}
            description={t('description')}
            iconName="BookOpen"
            headingLevel="h1"
          />
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="px-4 py-2 bg-blue-600/30 border border-blue-500/40 text-blue-300 rounded-full text-sm font-medium">
              Tümü ({mergedPosts.length})
            </span>
            {BLOG_CATEGORIES.map((cat) => {
              const count = mergedPosts.filter((p) => p.category === cat.name || p.category === cat.slug).length;
              if (count === 0) return null;
              return (
                <span
                  key={cat.slug}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 rounded-full text-sm font-medium hover:bg-white/10 transition-colors cursor-default"
                >
                  {cat.icon} {cat.name} ({count})
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          {mergedPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">
                {t('emptyState.title')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mergedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] h-full flex flex-col">
                    {/* Image */}
                    {post.coverImageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.coverImageUrl}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category Badge */}
                      {post.category && (
                        <span className="inline-flex self-start px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-medium mb-3">
                          {post.category}
                        </span>
                      )}

                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-white/70 mb-4 leading-relaxed flex-1 line-clamp-3 text-sm">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-white/50 mb-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1">
                          <DynamicIcon iconName="Calendar" className="w-3.5 h-3.5" />
                          {new Date(post.publishedAt).toLocaleDateString(
                            locale === 'en' ? 'en-US' : 'tr-TR',
                            { year: 'numeric', month: 'long', day: 'numeric' }
                          )}
                        </div>
                        {post.readTime && (
                          <div className="flex items-center gap-1">
                            <DynamicIcon iconName="Clock" className="w-3.5 h-3.5" />
                            {post.readTime} dk
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center text-blue-400 font-medium text-sm group-hover:translate-x-2 transition-transform">
                        {t('readMore')}
                        <DynamicIcon iconName="ArrowRight" className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-12 text-center border border-blue-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              {t('contactCta.title')}
            </h3>
            <p className="text-white/70 mb-8 text-lg">
              {t('contactCta.description')}
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105"
            >
              {t('contactCta.button')}
              <DynamicIcon iconName="ArrowRight" className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
