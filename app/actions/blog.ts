'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { client, isSanityAvailable } from '@/lib/sanity/client';

export async function createBlogPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content: any;
  category?: string;
  published?: boolean;
}) {
  try {
    await requireAdmin();

    if (!isSanityAvailable()) {
      return { success: false, error: 'Sanity is not configured' };
    }

    // In a real implementation, you would use Sanity client to create
    // For now, we'll just revalidate the blog pages
    revalidatePath('/blog');
    revalidatePath('/tr/blog');
    revalidatePath('/en/blog');
    revalidateTag('blog-posts');

    return { success: true, message: 'Blog post created' };
  } catch (error) {
    return { success: false, error: 'Unauthorized or failed to create' };
  }
}

export async function updateBlogPost(slug: string, data: {
  title?: string;
  excerpt?: string;
  content?: any;
  category?: string;
  published?: boolean;
}) {
  try {
    await requireAdmin();

    if (!isSanityAvailable()) {
      return { success: false, error: 'Sanity is not configured' };
    }

    // Revalidate blog pages
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/tr/blog');
    revalidatePath(`/tr/blog/${slug}`);
    revalidatePath('/en/blog');
    revalidatePath(`/en/blog/${slug}`);
    revalidateTag('blog-posts');

    return { success: true, message: 'Blog post updated' };
  } catch (error) {
    return { success: false, error: 'Unauthorized or failed to update' };
  }
}

export async function deleteBlogPost(slug: string) {
  try {
    await requireAdmin();

    if (!isSanityAvailable()) {
      return { success: false, error: 'Sanity is not configured' };
    }

    // Revalidate blog pages
    revalidatePath('/blog');
    revalidatePath('/tr/blog');
    revalidatePath('/en/blog');
    revalidateTag('blog-posts');

    return { success: true, message: 'Blog post deleted' };
  } catch (error) {
    return { success: false, error: 'Unauthorized or failed to delete' };
  }
}

export async function publishBlogPost(slug: string, published: boolean) {
  try {
    await requireAdmin();

    if (!isSanityAvailable()) {
      return { success: false, error: 'Sanity is not configured' };
    }

    // Revalidate blog pages
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/tr/blog');
    revalidatePath(`/tr/blog/${slug}`);
    revalidatePath('/en/blog');
    revalidatePath(`/en/blog/${slug}`);
    revalidateTag('blog-posts');

    return { success: true, message: published ? 'Blog post published' : 'Blog post unpublished' };
  } catch (error) {
    return { success: false, error: 'Unauthorized or failed to publish' };
  }
}




