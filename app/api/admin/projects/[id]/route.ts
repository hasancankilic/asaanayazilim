import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth-prisma';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { generateSlug, generateUniqueSlug } from '@/lib/slug';

const updateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  shortDescription: z.string().optional(),
  content: z.string().optional(),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  client: z.string().optional(),
  location: z.string().optional(),
  year: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  ogImageUrl: z.string().url().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
}).partial();

// GET - Get single project
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
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const projectWithParsedFields = {
      ...project,
      images: project.images ? JSON.parse(project.images) : [],
      tags: project.tags ? JSON.parse(project.tags) : [],
    };

    return NextResponse.json({ 
      success: true, 
      data: { project: projectWithParsedFields } 
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}

// PUT - Update project
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
    const validatedData = updateProjectSchema.parse(body);

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Handle slug generation if title changed and slug not provided
    let slug = validatedData.slug;
    if (validatedData.title && !slug && validatedData.title !== existingProject.title) {
      slug = generateSlug(validatedData.title);
    } else if (!slug) {
      slug = existingProject.slug;
    }

    // If slug is being updated, check if it's unique (excluding current project)
    if (slug && slug !== existingProject.slug) {
      const slugExists = await prisma.project.findUnique({
        where: { slug },
      });

      if (slugExists) {
        // Generate unique slug
        const allSlugs = await prisma.project.findMany({
          select: { slug: true },
          where: { id: { not: id } },
        });
        const existingSlugs = allSlugs.map(p => p.slug);
        slug = generateUniqueSlug(slug, existingSlugs);
      }
    }

    // Prepare update data
    const updateData: any = {};
    if (validatedData.title !== undefined) updateData.title = validatedData.title;
    if (slug !== undefined) updateData.slug = slug;
    if (validatedData.shortDescription !== undefined) updateData.shortDescription = validatedData.shortDescription || null;
    if (validatedData.content !== undefined) updateData.content = validatedData.content || null;
    if (validatedData.thumbnailUrl !== undefined) updateData.thumbnailUrl = validatedData.thumbnailUrl || null;
    if (validatedData.images !== undefined) {
      updateData.images = validatedData.images && validatedData.images.length > 0
        ? JSON.stringify(validatedData.images)
        : null;
    }
    if (validatedData.tags !== undefined) {
      updateData.tags = validatedData.tags && validatedData.tags.length > 0
        ? JSON.stringify(validatedData.tags)
        : null;
    }
    if (validatedData.client !== undefined) updateData.client = validatedData.client || null;
    if (validatedData.location !== undefined) updateData.location = validatedData.location || null;
    if (validatedData.year !== undefined) updateData.year = validatedData.year || null;
    if (validatedData.seoTitle !== undefined) updateData.seoTitle = validatedData.seoTitle || null;
    if (validatedData.seoDescription !== undefined) updateData.seoDescription = validatedData.seoDescription || null;
    if (validatedData.canonicalUrl !== undefined) updateData.canonicalUrl = validatedData.canonicalUrl || null;
    if (validatedData.ogImageUrl !== undefined) updateData.ogImageUrl = validatedData.ogImageUrl || null;
    
    if (validatedData.status !== undefined) {
      updateData.status = validatedData.status;
      // If publishing and no publishedAt, set it
      if (validatedData.status === 'PUBLISHED' && !existingProject.publishedAt) {
        updateData.publishedAt = new Date();
      }
      // If unpublishing, clear publishedAt
      if (validatedData.status === 'DRAFT') {
        updateData.publishedAt = null;
      }
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    // Parse JSON fields
    const projectWithParsedFields = {
      ...project,
      images: project.images ? JSON.parse(project.images) : [],
      tags: project.tags ? JSON.parse(project.tags) : [],
    };

    return NextResponse.json({ 
      success: true, 
      data: { project: projectWithParsedFields } 
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

    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
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
    
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }
    
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}
