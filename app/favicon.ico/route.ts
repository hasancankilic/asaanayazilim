import { NextResponse } from 'next/server';

// Simple favicon handler that returns 204 (No Content) to prevent 500 errors
export async function GET() {
  // Return a simple 204 No Content response
  // Browsers will handle the missing favicon gracefully
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Content-Type': 'image/x-icon',
    },
  });
}

