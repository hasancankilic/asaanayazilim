import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import PageTransition from '@/components/PageTransition';
import DynamicIcon from '@/components/DynamicIcon';
import ShareButton from '@/components/ShareButton';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getStaticBlogPost } from '@/lib/blog-data';
import { generateFAQSchema, generateArticleSchema } from '@/lib/blog-templates';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: Promise<{ id: string; locale?: string }>;
}

export async function generateStaticParams() {
  // All static blog post slugs
  const { staticBlogPosts } = await import('@/lib/blog-data');
  return staticBlogPosts.map((post) => ({ id: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { id, locale = 'tr' } = resolvedParams;
  const { generateMetadata: generateSEOMetadata } = await import('@/lib/metadata');

  // Check static posts first
  const staticPost = getStaticBlogPost(id);
  if (staticPost) {
    return generateSEOMetadata({
      title: staticPost.seoTitle || staticPost.title,
      description: staticPost.seoDescription || staticPost.excerpt,
      locale: locale as 'tr' | 'en',
      url: locale === 'tr' ? `/tr/blog/${id}` : `/en/blog/${id}`,
      type: 'article',
    });
  }

  // Try DB
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog/${id}`, { next: { revalidate: 3600 } });
    if (response.ok) {
      const result = await response.json();
      const post = result.data?.post;
      if (post) {
        return generateSEOMetadata({
          title: post.seoTitle || post.title,
          description: post.seoDescription || post.excerpt,
          image: post.coverImageUrl || undefined,
          locale: locale as 'tr' | 'en',
          url: locale === 'tr' ? `/tr/blog/${id}` : `/en/blog/${id}`,
          type: 'article',
        });
      }
    }
  } catch { /* ignore */ }

  return generateSEOMetadata({
    title: locale === 'tr' ? 'Blog Yazısı Bulunamadı' : 'Blog Post Not Found',
    description: '',
    locale: locale as 'tr' | 'en',
    url: locale === 'tr' ? `/tr/blog/${id}` : `/en/blog/${id}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id, locale } = await params;
  const t = await getTranslations('blogPost');

  // Check static posts first (zero-latency, always available)
  const staticPost = getStaticBlogPost(id);

  let post: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    coverImageUrl?: string | null;
    category?: string;
    readTime?: number;
    publishedAt: string;
    faq?: { q: string; a: string }[];
    seoTitle?: string;
    seoDescription?: string;
  } | null = null;

  if (staticPost) {
    post = {
      title: staticPost.title,
      slug: staticPost.slug,
      content: staticPost.content,
      excerpt: staticPost.excerpt,
      coverImageUrl: null,
      category: staticPost.category,
      readTime: staticPost.readTime,
      publishedAt: staticPost.publishedAt,
      faq: staticPost.faq,
      seoTitle: staticPost.seoTitle,
      seoDescription: staticPost.seoDescription,
    };
  } else {
    // Fallback: try DB
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/blog/${id}`, { next: { revalidate: 3600 } });
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data?.post) {
          const dbPost = result.data.post;
          post = {
            title: dbPost.title,
            slug: dbPost.slug,
            content: dbPost.content,
            excerpt: dbPost.excerpt,
            coverImageUrl: dbPost.coverImageUrl,
            category: dbPost.category,
            readTime: dbPost.readTime,
            publishedAt: dbPost.publishedAt || dbPost.createdAt,
            faq: dbPost.faqContent ? JSON.parse(dbPost.faqContent) : [],
            seoTitle: dbPost.seoTitle,
            seoDescription: dbPost.seoDescription,
          };
        }
      }
    } catch { /* ignore */ }
  }

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.publishedAt);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asaanayazilim.com';
  const canonicalUrl = `${siteUrl}/${locale || 'tr'}/blog/${post.slug}`;

  // Schema markup
  const articleSchema = generateArticleSchema({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || '',
    url: canonicalUrl,
    datePublished: post.publishedAt,
  });

  const faqSchema = post.faq && post.faq.length > 0 ? generateFAQSchema(post.faq) : null;

  const structuredData = faqSchema ? [articleSchema, faqSchema] : [articleSchema];

  // Determine accent color for lead form based on category
  const categoryColor = post.category === 'ERP' ? 'blue'
    : post.category === 'Custom Software' ? 'purple'
    : post.category === 'Mobile Apps' ? 'cyan'
    : 'emerald';

  return (
    <main className="min-h-screen">
      {/* Structured Data */}
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors group"
          >
            <DynamicIcon iconName="ArrowLeft" className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('backToBlog')}
          </Link>

          {/* Category Badge */}
          {post.category && (
            <span className="inline-flex px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-4">
              {post.category}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <DynamicIcon iconName="Calendar" className="w-4 h-4" />
              {publishedDate.toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <DynamicIcon iconName="Clock" className="w-4 h-4" />
                {post.readTime} dk okuma
              </div>
            )}
          </div>
        </div>
      </section>

      <PageTransition>
        {/* Content */}
        <article className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div
                className="prose prose-invert max-w-none text-white/80 leading-relaxed
                  prose-headings:text-white prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:mb-5
                  prose-strong:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                  prose-ul:text-base md:prose-ul:text-lg prose-li:text-white/80 prose-li:mb-2
                  prose-ol:text-base md:prose-ol:text-lg
                  prose-table:text-sm prose-th:text-white prose-th:bg-white/10 prose-th:px-4 prose-th:py-2
                  prose-td:px-4 prose-td:py-2 prose-td:border-white/10"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* FAQ Section */}
            {post.faq && post.faq.length > 0 && (
              <div className="mt-12 glass-card rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <DynamicIcon iconName="HelpCircle" className="w-6 h-6 text-blue-400" />
                  Sık Sorulan Sorular
                </h2>
                <div className="space-y-6">
                  {post.faq.map((item, idx) => (
                    <div key={idx} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                      <h3 className="text-lg font-semibold text-white mb-2">{item.q}</h3>
                      <p className="text-white/70 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Internal Links */}
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/erp-yazilimi" className="glass-card rounded-xl p-5 hover:border-blue-400/40 transition-all group">
                <span className="text-blue-400 text-sm font-medium">ERP Yazılımı →</span>
                <p className="text-white/60 text-sm mt-1">İşletmenize özel ERP çözümü</p>
              </Link>
              <Link href="/ozel-yazilim" className="glass-card rounded-xl p-5 hover:border-purple-400/40 transition-all group">
                <span className="text-purple-400 text-sm font-medium">Özel Yazılım →</span>
                <p className="text-white/60 text-sm mt-1">Web, mobil ve kurumsal çözümler</p>
              </Link>
              <Link href="/iletisim" className="glass-card rounded-xl p-5 hover:border-emerald-400/40 transition-all group">
                <span className="text-emerald-400 text-sm font-medium">İletişim →</span>
                <p className="text-white/60 text-sm mt-1">Ücretsiz danışmanlık alın</p>
              </Link>
            </div>

            {/* Share Section */}
            <div className="mt-8 glass-card rounded-2xl p-6 border border-blue-500/20">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{t('shareTitle')}</h3>
                  <p className="text-white/60 text-sm">{t('shareDescription')}</p>
                </div>
                <ShareButton title={post.title} slug={post.slug} locale={locale || 'tr'} />
              </div>
            </div>
          </div>
        </article>

        {/* Lead Capture */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto">
            <LeadCaptureForm
              locale={(locale as 'tr' | 'en') || 'tr'}
              serviceType={post.category || 'general'}
              accentColor={categoryColor}
            />
          </div>
        </section>
      </PageTransition>

      <Footer />
    </main>
  );
}
