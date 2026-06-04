import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default async function AppleIcon() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 120,
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'system-ui',
            borderRadius: 36,
          }}
        >
          A
        </div>
      ),
      { ...size }
    );
  } catch (error) {
    console.error('Apple icon generation error:', error);
    return new Response(null, { status: 404 });
  }
}
