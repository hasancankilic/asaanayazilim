import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import DynamicIcon from '@/components/DynamicIcon';
import ShareButton from '@/components/ShareButton';
import { fetchSanityData, urlFor, isSanityAvailable } from '@/lib/sanity/client';
import { blogPostQuery, blogPostsQuery } from '@/lib/sanity/queries';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const revalidate = 0; // Always revalidate for real-time updates
export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: Promise<{ id: string; locale?: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await fetchSanityData<any[]>(blogPostsQuery);
    if (!posts) return [];
    return posts.map((post: any) => ({
      id: post.slug.current,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { id, locale = 'tr' } = resolvedParams;
  const { generateMetadata: generateSEOMetadata } = await import('@/lib/metadata');
  
  try {
    const post = await fetchSanityData<any>(blogPostQuery, { slug: id });
    
    if (!post) {
      return generateSEOMetadata({
        title: locale === 'tr' ? 'Blog Yazısı Bulunamadı' : 'Blog Post Not Found',
        description: locale === 'tr' ? 'Aradığınız blog yazısı bulunamadı.' : 'The blog post you are looking for was not found.',
        locale: locale as 'tr' | 'en',
        url: locale === 'tr' ? `/tr/blog/${id}` : `/en/blog/${id}`,
        type: 'article',
      });
    }
    
    const seoTitle = post.seoTitle || post.title || (locale === 'tr' ? 'Blog - AŞAANA YAZILIM' : 'Blog - AŞAANA YAZILIM');
    const seoDescription = post.seoDescription || post.excerpt || (locale === 'tr' ? 'AŞAANA YAZILIM blog yazısı' : 'AŞAANA YAZILIM blog post');
    const seoImage = post.mainImage ? urlFor(post.mainImage).url() : undefined;
    
    return generateSEOMetadata({
      title: seoTitle,
      description: seoDescription,
      image: seoImage,
      locale: locale as 'tr' | 'en',
      url: locale === 'tr' ? `/tr/blog/${id}` : `/en/blog/${id}`,
      type: 'article',
    });
  } catch {
    const { generateMetadata: generateSEOMetadata } = await import('@/lib/metadata');
    return generateSEOMetadata({
      title: locale === 'tr' ? 'Blog - AŞAANA YAZILIM' : 'Blog - AŞAANA YAZILIM',
      description: locale === 'tr' ? 'AŞAANA YAZILIM blog' : 'AŞAANA YAZILIM blog',
      locale: locale as 'tr' | 'en',
      url: locale === 'tr' ? `/tr/blog/${id}` : `/en/blog/${id}`,
    });
  }
}

export default async function BlogPostPage({ 
  params 
}: BlogPostPageProps) {
  const { id, locale } = await params;
  const t = await getTranslations('blogPost');
  
  let post: any = null;

  try {
    post = await fetchSanityData<any>(blogPostQuery, { slug: id });
  } catch (error) {
    console.error('Error fetching blog post:', error);
  }

  if (!post) {
    notFound();
  }

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt)
    : new Date(post._createdAt);

  return (
    <main className="min-h-screen">
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

          <div className="mb-8">
            {post.category && (
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white text-sm font-medium mb-4">
                {post.category}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Meta */}
            <div className="flex items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <DynamicIcon iconName="Calendar" className="w-5 h-5" />
                {publishedDate.toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageTransition>
        {/* Featured Image */}
        {(post.mainImage || post.coverImage) && (
          <section className="px-4 sm:px-6 lg:px-8 mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={(post.mainImage || post.coverImage)?.asset?.url || '/images/placeholder.jpg'}
                  alt={post.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <article className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="prose prose-invert max-w-none text-white/80 leading-relaxed prose-headings:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-ul:text-lg prose-li:text-white/80">
                {post.content && <PortableText value={post.content} />}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-12 glass-card rounded-2xl p-8 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('shareTitle')}</h3>
                  <p className="text-white/60">{t('shareDescription')}</p>
                </div>
                <ShareButton title={post.title} slug={post.slug.current} locale={locale || 'tr'} />
              </div>
            </div>
          </div>
        </article>
      </PageTransition>

      <Footer />
    </main>
  );
}

