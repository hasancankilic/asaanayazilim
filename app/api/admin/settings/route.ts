import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, verifyPassword, hashPassword } from '@/lib/auth-prisma';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Oturum bulunamadı', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const decoded = await verifySession(session.value);
    if (!decoded || !decoded.email) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz oturum verisi', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Mevcut şifre ve yeni şifre gereklidir' },
        { status: 400 }
      );
    }

    // Get admin from DB
    const admin = await prisma.adminUser.findUnique({
      where: { email: decoded.email }
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Admin kullanıcısı bulunamadı' },
        { status: 404 }
      );
    }

    // Verify current password
    const isCurrentValid = await verifyPassword(currentPassword, admin.password);
    if (!isCurrentValid) {
      return NextResponse.json(
        { success: false, error: 'Mevcut şifre hatalı' },
        { status: 400 }
      );
    }

    // Hash and update new password
    const hashed = await hashPassword(newPassword);
    await prisma.adminUser.update({
      where: { email: decoded.email },
      data: { password: hashed }
    });

    return NextResponse.json({ success: true, message: 'Şifreniz başarıyla güncellendi' });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { success: false, error: 'Şifre güncellenirken sunucu hatası oluştu' },
      { status: 500 }
    );
  }
}
