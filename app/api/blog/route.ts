import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Only fetch published posts for public
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' },
      ],
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImageUrl: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Parse gallery images if needed
    const parsedPosts = posts.map((post: any) => ({
      ...post,
      galleryImages: [],
    }));

    return Response.json({ 
      success: true, 
      data: { posts: parsedPosts } 
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
