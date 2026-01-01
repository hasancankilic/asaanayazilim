import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Check if Sanity is configured
const isSanityConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== '' &&
    process.env.NEXT_PUBLIC_SANITY_DATASET
  );
};

// Create a safe client that won't crash if projectId is missing
let client: ReturnType<typeof createClient> | null = null;

if (isSanityConfigured()) {
  try {
    client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    });
  } catch (error) {
    console.error('Failed to create Sanity client:', error);
    client = null;
  }
}

// Safe fetch function that handles missing client
export const fetchSanityData = async <T,>(query: string, params?: Record<string, any>): Promise<T | null> => {
  if (!client) {
    console.warn('Sanity client is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local');
    return null;
  }

  try {
    return await client.fetch<T>(query, params || {});
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
};

// Export client (can be null if not configured)
export { client };

// Image URL builder (only if client exists)
let builder: ReturnType<typeof imageUrlBuilder> | null = null;

if (client) {
  try {
    builder = imageUrlBuilder(client);
  } catch (error) {
    console.error('Failed to create image URL builder:', error);
  }
}

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    console.warn('Image URL builder is not available. Sanity client is not configured.');
    return {
      width: () => ({ url: () => '' }),
      height: () => ({ url: () => '' }),
      url: () => '',
    } as any;
  }
  return builder.image(source);
}

// Helper to check if Sanity is available
export const isSanityAvailable = () => client !== null;
