import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { client } from '@/lib/sanity/client';

// Check admin authentication
async function checkAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('admin_session');
    return !!session && session.value === 'authenticated';
  } catch {
    return false;
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthenticated = await checkAdminAuth();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { published } = await request.json();

    if (!client) {
      return NextResponse.json(
        { error: 'Sanity client not configured' },
        { status: 500 }
      );
    }

    const currentPost = await client.fetch(`*[_id == $id][0]`, { id });
    const updateData: any = { published };
    
    // If publishing and no publishedAt date, set it
    if (published && !currentPost?.publishedAt) {
      updateData.publishedAt = new Date().toISOString();
    }

    await client.patch(id).set(updateData).commit();

    // Revalidate blog pages for real-time updates
    const { revalidatePath } = await import('next/cache');
    revalidatePath('/tr/blog');
    revalidatePath('/en/blog');
    revalidatePath('/blog');

    return NextResponse.json({ success: true, published });
  } catch (error) {
    console.error('Error toggling publish status:', error);
    return NextResponse.json(
      { error: 'Failed to toggle publish status' },
      { status: 500 }
    );
  }
}

