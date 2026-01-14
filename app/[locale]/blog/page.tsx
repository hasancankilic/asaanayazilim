import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeader from '@/components/SectionHeader';
import EmptyState from '@/components/EmptyState';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { BookOpen, Calendar, ArrowRight } from '@/lib/icons';
import { fetchSanityData, isSanityAvailable } from '@/lib/sanity/client';
import { blogPostsQuery } from '@/lib/sanity/queries';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import DynamicIcon from '@/components/DynamicIcon';

export const revalidate = 0; // Always revalidate for real-time updates
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
    title: t('meta.title'),
    description: t('meta.description'),
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
  
  let blogPosts: any[] = [];
  let hasError = false;
  let isConfigured = false;

  // Check if Sanity is configured
  isConfigured = isSanityAvailable();

  if (isConfigured) {
    // Try to fetch blog posts
    const result = await fetchSanityData<any[]>(blogPostsQuery);
    if (result) {
      blogPosts = result;
    } else {
      hasError = true;
    }
  } else {
    // Sanity not configured - show friendly message
    hasError = true;
  }

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
          />
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          {!isConfigured ? (
            <EmptyState
              title={t('emptyState.notConfiguredTitle')}
              description={t('emptyState.notConfiguredDescription')}
              actionLabel={t('emptyState.actionLabel')}
              actionHref="/"
            />
          ) : hasError || blogPosts.length === 0 ? (
            <EmptyState
              title={t('emptyState.title')}
              description={t('emptyState.description')}
              actionLabel={t('emptyState.actionLabel')}
              actionHref="/"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group block"
                >
                  <div className="glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] h-full flex flex-col">
                    {/* Image */}
                    {(post.mainImage || post.coverImage) && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={(post.mainImage || post.coverImage)?.asset?.url || '/images/placeholder.jpg'}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Category Badge */}
                        {post.category && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white text-sm font-medium backdrop-blur-sm">
                            {post.category}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-white/70 mb-4 leading-relaxed flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      
                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-white/50 mb-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1">
                          <DynamicIcon iconName="Calendar" className="w-4 h-4" />
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })
                            : new Date(post._createdAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
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
