import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminSession } from '@/lib/auth-prisma';
import { verifySession } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await verifyAdminSession();
    
    if (isAuthenticated) {
      const cookieStore = await cookies();
      const session = cookieStore.get('admin_session');
      let email = '';
      if (session) {
        const decoded = await verifySession(session.value);
        email = decoded?.email || '';
      }
      return NextResponse.json({ isAuthenticated: true, email });
    }

    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
