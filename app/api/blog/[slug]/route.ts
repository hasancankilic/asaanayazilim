import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Fetch single published post by slug
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
        status: 'PUBLISHED',
      },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Parse gallery images
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
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
