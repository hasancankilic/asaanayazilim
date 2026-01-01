import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth-prisma';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { generateSlug, generateUniqueSlug } from '@/lib/slug';

// Validation schemas
const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  galleryImages: z.array(z.string().url()).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  ogImageUrl: z.string().url().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
});

// GET - List all blog posts with search and filter
export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const statusFilter = searchParams.get('status') || 'ALL';

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (statusFilter !== 'ALL') {
      where.status = statusFilter;
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    // Parse JSON fields
    const postsWithParsedFields = posts.map(post => ({
      ...post,
      galleryImages: post.galleryImages ? JSON.parse(post.galleryImages) : [],
    }));

    return NextResponse.json({ 
      success: true, 
      data: { posts: postsWithParsedFields } 
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = createBlogPostSchema.parse(body);

    // Generate slug if not provided
    let slug = validatedData.slug || generateSlug(validatedData.title);
    
    // Check if slug already exists and generate unique one
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      // Get all existing slugs to generate unique one
      const allSlugs = await prisma.blogPost.findMany({
        select: { slug: true },
      });
      const existingSlugs = allSlugs.map(p => p.slug);
      slug = generateUniqueSlug(slug, existingSlugs);
    }

    const post = await prisma.blogPost.create({
      data: {
        title: validatedData.title,
        slug,
        excerpt: validatedData.excerpt || null,
        content: validatedData.content,
        coverImageUrl: validatedData.coverImageUrl || null,
        galleryImages: validatedData.galleryImages ? JSON.stringify(validatedData.galleryImages) : null,
        seoTitle: validatedData.seoTitle || null,
        seoDescription: validatedData.seoDescription || null,
        canonicalUrl: validatedData.canonicalUrl || null,
        ogImageUrl: validatedData.ogImageUrl || null,
        status: validatedData.status,
        publishedAt: validatedData.status === 'PUBLISHED' ? new Date() : null,
      },
    });

    // Parse JSON fields
    const postWithParsedFields = {
      ...post,
      galleryImages: post.galleryImages ? JSON.parse(post.galleryImages) : [],
    };

    return NextResponse.json({ 
      success: true, 
      data: { post: postWithParsedFields } 
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation error', 
          code: 'VALIDATION_ERROR',
          details: error.errors 
        },
        { status: 400 }
      );
    }

    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}
