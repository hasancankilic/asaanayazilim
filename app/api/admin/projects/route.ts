import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth-prisma';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { generateSlug, generateUniqueSlug } from '@/lib/slug';

const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
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
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
});

// GET - List all projects with search and filter
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
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (statusFilter !== 'ALL') {
      where.status = statusFilter;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    // Parse JSON fields
    const projectsWithParsedFields = projects.map(project => ({
      ...project,
      images: project.images ? JSON.parse(project.images) : [],
      tags: project.tags ? JSON.parse(project.tags) : [],
    }));

    return NextResponse.json({ 
      success: true, 
      data: { projects: projectsWithParsedFields } 
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}

// POST - Create new project
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
    const validatedData = createProjectSchema.parse(body);

    // Generate slug if not provided
    let slug = validatedData.slug || generateSlug(validatedData.title);
    
    // Check if slug already exists and generate unique one
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (existingProject) {
      // Get all existing slugs to generate unique one
      const allSlugs = await prisma.project.findMany({
        select: { slug: true },
      });
      const existingSlugs = allSlugs.map(p => p.slug);
      slug = generateUniqueSlug(slug, existingSlugs);
    }

    const project = await prisma.project.create({
      data: {
        title: validatedData.title,
        slug,
        shortDescription: validatedData.shortDescription || null,
        content: validatedData.content || null,
        thumbnailUrl: validatedData.thumbnailUrl || null,
        images: validatedData.images && validatedData.images.length > 0
          ? JSON.stringify(validatedData.images)
          : null,
        tags: validatedData.tags && validatedData.tags.length > 0
          ? JSON.stringify(validatedData.tags)
          : null,
        client: validatedData.client || null,
        location: validatedData.location || null,
        year: validatedData.year || null,
        seoTitle: validatedData.seoTitle || null,
        seoDescription: validatedData.seoDescription || null,
        canonicalUrl: validatedData.canonicalUrl || null,
        ogImageUrl: validatedData.ogImageUrl || null,
        status: validatedData.status,
        publishedAt: validatedData.status === 'PUBLISHED' ? new Date() : null,
      },
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

    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}
