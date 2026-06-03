import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Fetch single published project by slug
    const project = await prisma.project.findUnique({
      where: {
        slug,
        status: 'PUBLISHED',
      },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
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
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}
