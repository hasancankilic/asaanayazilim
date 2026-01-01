import { NextRequest, NextResponse } from 'next/server';
import { clearAdminSession } from '@/lib/auth-prisma';

export async function POST(request: NextRequest) {
  try {
    await clearAdminSession();
    return NextResponse.json({ success: true, message: 'Logged out' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}
