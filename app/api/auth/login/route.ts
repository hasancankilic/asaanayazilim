import { NextRequest, NextResponse } from 'next/server';
import { signSession } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Tüm alanları doldurun' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      return NextResponse.json(
        { success: false, error: 'Tüm alanları doldurun' },
        { status: 400 }
      );
    }

    let isAuthenticated = false;

    // Try Prisma-based auth
    try {
      const { authenticateAdmin } = await import('@/lib/auth-prisma');
      isAuthenticated = await authenticateAdmin(normalizedEmail, normalizedPassword);
    } catch (error) {
      console.warn('Prisma auth failed, trying fallback:', error);
    }

    // Fallback: env-based auth
    if (!isAuthenticated) {
      const adminEmail = (process.env.ADMIN_EMAIL || 'hasancankilic25@gmail.com')
        .toLowerCase()
        .trim();
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

      if (normalizedEmail === adminEmail && normalizedPassword === adminPassword) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'E-posta veya şifre hatalı' },
        { status: 401 }
      );
    }

    const token = await signSession({ email: normalizedEmail });

    const response = NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
    });

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, error: 'Giriş yapılırken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
