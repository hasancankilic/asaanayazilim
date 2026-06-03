import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const parsedProjects = projects.map((project: any) => ({
      ...project,
      images: project.images ? JSON.parse(project.images) : [],
      tags: project.tags ? JSON.parse(project.tags) : [],
    }));

    return NextResponse.json({
      success: true,
      data: { projects: parsedProjects },
    });
  } catch (error) {
    console.error('Error fetching public projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
