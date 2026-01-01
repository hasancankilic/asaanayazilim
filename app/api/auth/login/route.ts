import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Tüm alanları doldurun' 
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Tüm alanları doldurun' 
        },
        { status: 400 }
      );
    }

    // Try Prisma-based auth first, fallback to env-based
    let isAuthenticated = false;

    try {
      const { authenticateAdmin, seedAdminUser } = await import('@/lib/auth-prisma');
      
      // Try to seed (non-blocking)
      try {
        await seedAdminUser();
      } catch (seedError) {
        // Ignore seeding errors - may be expected if DB not set up
      }
      
      // Try Prisma auth
      try {
        isAuthenticated = await authenticateAdmin(normalizedEmail, normalizedPassword);
      } catch (authError) {
        console.warn('Prisma auth failed, using fallback:', authError);
      }
    } catch (importError) {
      // Prisma not available - use fallback
    }

    // Fallback to environment variable-based auth
    if (!isAuthenticated) {
      const adminEmail = (process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'hasancankilic25@gmail.com')
        .toLowerCase()
        .trim();
      const adminPassword = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

      if (normalizedEmail === adminEmail && normalizedPassword === adminPassword) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'E-posta veya şifre hatalı' 
        },
        { status: 401 }
      );
    }

    // Create success response with session cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Giriş başarılı',
    });
    
    // Set session cookie
    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('❌ Login API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.' 
      },
      { status: 500 }
    );
  }
}
