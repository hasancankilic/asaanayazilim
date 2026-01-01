import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// Image generation - Professional favicon with "A" logo
export default async function Icon() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'system-ui',
          }}
        >
          A
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    // Fallback: return a simple response
    console.error('Icon generation error:', error);
    return new Response(null, { status: 404 });
  }
}
