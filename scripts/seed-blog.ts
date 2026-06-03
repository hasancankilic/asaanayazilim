/**
 * Seed Blog Posts — Populates DB with static SEO blog articles
 * Run: npx tsx scripts/seed-blog.ts
 * This copies all static blog posts from lib/blog-data.ts into the Prisma database
 */

import { PrismaClient } from '@prisma/client';
import { staticBlogPosts } from '../lib/blog-data';

const prisma = new PrismaClient();

async function main() {
  console.log(`🌱 Seeding ${staticBlogPosts.length} blog posts...\n`);

  let created = 0;
  let skipped = 0;
  let updated = 0;

  for (const post of staticBlogPosts) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
    });

    const postData = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      faqContent: JSON.stringify(post.faq),
      keywords: JSON.stringify(post.keywords),
      readTime: post.readTime,
      status: 'PUBLISHED' as const,
      publishedAt: new Date(post.publishedAt),
    };

    if (existing) {
      // Update existing post with latest static data
      await prisma.blogPost.update({
        where: { slug: post.slug },
        data: postData,
      });
      updated++;
      console.log(`  ✏️  Updated: ${post.slug}`);
    } else {
      await prisma.blogPost.create({
        data: { slug: post.slug, ...postData },
      });
      created++;
      console.log(`  ✅ Created: ${post.slug}`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total:   ${staticBlogPosts.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
