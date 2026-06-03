import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  // Auth check
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session');
  if (!session) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    const expectedToken = process.env.ADMIN_SECRET || process.env.ADMIN_API_TOKEN || 'dev-token';
    if (token !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const search = url.searchParams.get('search') || '';
    const days = parseInt(url.searchParams.get('days') || '7');

    const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const where = {
      createdAt: { gte: sinceDate },
      ...(search ? {
        OR: [
          { ipAddress: { contains: search } },
          { browser: { contains: search } },
          { os: { contains: search } },
          { page: { contains: search } },
          { country: { contains: search } },
        ],
      } : {}),
    };

    const [visitors, total, stats] = await Promise.all([
      prisma.siteVisitor.findMany({
        where,
        orderBy: { lastVisit: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.siteVisitor.count({ where }),
      // Aggregate stats
      prisma.siteVisitor.groupBy({
        by: ['ipAddress'],
        where,
        _count: { ipAddress: true },
      }),
    ]);

    // Device breakdown
    const deviceStats = await prisma.siteVisitor.groupBy({
      by: ['device'],
      where,
      _count: true,
    });

    // Browser breakdown
    const browserStats = await prisma.siteVisitor.groupBy({
      by: ['browser'],
      where,
      _count: true,
    });

    // Top pages
    const topPages = await prisma.siteVisitor.groupBy({
      by: ['page'],
      where,
      _count: true,
      orderBy: { _count: { page: 'desc' } },
      take: 20,
    });

    return NextResponse.json({
      success: true,
      data: {
        visitors,
        total,
        uniqueIPs: stats.length,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        deviceStats: deviceStats.map((d: any) => ({ device: d.device, count: d._count })),
        browserStats: browserStats.map((b: any) => ({ browser: b.browser, count: b._count })),
        topPages: topPages.map((p: any) => ({ page: p.page, count: p._count })),
      },
    });
  } catch (error) {
    console.error('Admin visitors error:', error);
    return NextResponse.json({ error: 'Failed to fetch visitors' }, { status: 500 });
  }
}
