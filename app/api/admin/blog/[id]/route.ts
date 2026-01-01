import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth-prisma';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { generateSlug, generateUniqueSlug } from '@/lib/slug';

const updateBlogPostSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1).optional(),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  galleryImages: z.array(z.string().url()).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  ogImageUrl: z.string().url().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
}).partial();

// GET - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const postWithParsedFields = {
      ...post,
      galleryImages: post.galleryImages ? JSON.parse(post.galleryImages) : [],
    };

    return NextResponse.json({ 
      success: true, 
      data: { post: postWithParsedFields } 
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = updateBlogPostSchema.parse(body);

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Handle slug generation if title changed and slug not provided
    let slug = validatedData.slug;
    if (validatedData.title && !slug && validatedData.title !== existingPost.title) {
      slug = generateSlug(validatedData.title);
    } else if (!slug) {
      slug = existingPost.slug;
    }

    // If slug is being updated, check if it's unique (excluding current post)
    if (slug && slug !== existingPost.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug },
      });

      if (slugExists) {
        // Generate unique slug
        const allSlugs = await prisma.blogPost.findMany({
          select: { slug: true },
          where: { id: { not: id } },
        });
        const existingSlugs = allSlugs.map((p: { slug: string }) => p.slug);
        slug = generateUniqueSlug(slug, existingSlugs);
      }
    }

    // Prepare update data
    const updateData: any = {};
    if (validatedData.title !== undefined) updateData.title = validatedData.title;
    if (slug !== undefined) updateData.slug = slug;
    if (validatedData.excerpt !== undefined) updateData.excerpt = validatedData.excerpt || null;
    if (validatedData.content !== undefined) updateData.content = validatedData.content;
    if (validatedData.coverImageUrl !== undefined) updateData.coverImageUrl = validatedData.coverImageUrl || null;
    if (validatedData.galleryImages !== undefined) {
      updateData.galleryImages = validatedData.galleryImages.length > 0
        ? JSON.stringify(validatedData.galleryImages)
        : null;
    }
    if (validatedData.seoTitle !== undefined) updateData.seoTitle = validatedData.seoTitle || null;
    if (validatedData.seoDescription !== undefined) updateData.seoDescription = validatedData.seoDescription || null;
    if (validatedData.canonicalUrl !== undefined) updateData.canonicalUrl = validatedData.canonicalUrl || null;
    if (validatedData.ogImageUrl !== undefined) updateData.ogImageUrl = validatedData.ogImageUrl || null;
    
    if (validatedData.status !== undefined) {
      updateData.status = validatedData.status;
      // If publishing and no publishedAt, set it
      if (validatedData.status === 'PUBLISHED' && !existingPost.publishedAt) {
        updateData.publishedAt = new Date();
      }
      // If unpublishing, clear publishedAt
      if (validatedData.status === 'DRAFT') {
        updateData.publishedAt = null;
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    // Parse JSON fields
    const postWithParsedFields = {
      ...post,
      galleryImages: post.galleryImages ? JSON.parse(post.galleryImages) : [],
    };

    return NextResponse.json({ 
      success: true, 
      data: { post: postWithParsedFields } 
    });
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

    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }
    
    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}
