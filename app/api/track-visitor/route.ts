import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

function parseUserAgent(ua: string): { browser: string; os: string; device: string } {
  const lower = ua.toLowerCase();

  // Browser detection
  let browser = 'Unknown';
  if (lower.includes('edg/')) browser = 'Edge';
  else if (lower.includes('opr/') || lower.includes('opera')) browser = 'Opera';
  else if (lower.includes('chrome') || lower.includes('crios')) browser = 'Chrome';
  else if (lower.includes('firefox') || lower.includes('fxios')) browser = 'Firefox';
  else if (lower.includes('safari') && !lower.includes('chrome')) browser = 'Safari';
  else if (lower.includes('msie') || lower.includes('trident')) browser = 'IE';

  // OS detection
  let os = 'Unknown';
  if (lower.includes('windows')) os = 'Windows';
  else if (lower.includes('mac os') || lower.includes('macintosh')) os = 'macOS';
  else if (lower.includes('iphone') || lower.includes('ipad')) os = 'iOS';
  else if (lower.includes('android')) os = 'Android';
  else if (lower.includes('linux')) os = 'Linux';

  // Device detection
  let device = 'Desktop';
  if (lower.includes('mobile') || lower.includes('iphone') || lower.includes('android') && !lower.includes('tablet')) {
    device = 'Mobile';
  } else if (lower.includes('tablet') || lower.includes('ipad')) {
    device = 'Tablet';
  }

  // Bot detection
  if (lower.includes('bot') || lower.includes('crawl') || lower.includes('spider') || lower.includes('slurp')) {
    browser = 'Bot';
    device = 'Bot';
  }

  return { browser, os, device };
}

function getClientIP(request: NextRequest): string {
  // Try various headers in order of reliability
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;

  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP) return cfIP;

  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  if (vercelIP) return vercelIP.split(',')[0].trim();

  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { page, screenRes } = body;

    const ip = getClientIP(request);
    const ua = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || request.headers.get('referrer') || null;
    const language = request.headers.get('accept-language')?.split(',')[0] || null;
    const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || null;
    const city = request.headers.get('x-vercel-ip-city') || null;

    const { browser, os, device } = parseUserAgent(ua);

    // Skip bots
    if (device === 'Bot') {
      return NextResponse.json({ success: true, skipped: 'bot' });
    }

    const pagePath = page || request.nextUrl.pathname || '/';

    // Check if this IP visited recently (within 30 min) — update visit count
    const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);
    const existingVisitor = await prisma.siteVisitor.findFirst({
      where: {
        ipAddress: ip,
        lastVisit: { gte: thirtyMinAgo },
      },
      orderBy: { lastVisit: 'desc' },
    });

    if (existingVisitor) {
      // Update existing visit record
      await prisma.siteVisitor.update({
        where: { id: existingVisitor.id },
        data: {
          page: pagePath,
          visitCount: { increment: 1 },
          lastVisit: new Date(),
          userAgent: ua,
          browser,
          os,
          device,
          referrer: referrer || existingVisitor.referrer,
          screenRes: screenRes || existingVisitor.screenRes,
          language: language || existingVisitor.language,
          country: country || existingVisitor.country,
          city: city || existingVisitor.city,
        },
      });
    } else {
      // Create new visit record
      await prisma.siteVisitor.create({
        data: {
          ipAddress: ip,
          userAgent: ua,
          browser,
          os,
          device,
          page: pagePath,
          referrer,
          language,
          screenRes: screenRes || null,
          country,
          city,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    // Don't fail the page load if tracking fails
    return NextResponse.json({ success: false });
  }
}
