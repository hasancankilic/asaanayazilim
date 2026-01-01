import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth-prisma';

export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await verifyAdminSession();
    
    if (isAuthenticated) {
      return NextResponse.json({ isAuthenticated: true });
    }

    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
