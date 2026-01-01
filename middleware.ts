import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Admin route protection
function checkAdminAuth(request: NextRequest): boolean {
  const session = request.cookies.get('admin_session');
  return !!session && session.value === 'authenticated';
}

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect locale-prefixed admin routes to /admin
  // e.g., /tr/admin -> /admin, /en/admin -> /admin
  const localePrefixMatch = pathname.match(/^\/(tr|en)\/admin(\/.*)?$/);
  if (localePrefixMatch) {
    const adminPath = localePrefixMatch[2] || '';
    return NextResponse.redirect(new URL(`/admin${adminPath}`, request.url));
  }

  // Protect admin routes (skip i18n middleware)
  if (pathname.startsWith('/admin')) {
    // Allow login page - NO AUTH REQUIRED
    if (pathname === '/admin/login' || pathname === '/admin/login/') {
      return NextResponse.next();
    }

    // Redirect /admin to /admin/login
    if (pathname === '/admin' || pathname === '/admin/') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Check authentication for ALL other admin routes
    const isAuthenticated = checkAdminAuth(request);
    
    if (!isAuthenticated) {
      // Store the intended destination in a query param
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Allow authenticated admin routes (don't apply i18n)
    return NextResponse.next();
  }

  // Use next-intl middleware for other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - api routes
    // - _next (Next.js internals)
    // - _vercel (Vercel internals)
    // - files with extensions (e.g., .ico, .png, .jpg)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
