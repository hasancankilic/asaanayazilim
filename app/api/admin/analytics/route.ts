import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Check for admin authentication
    const cookieStore = cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
      const authHeader = request.headers.get('authorization');
      const token = authHeader?.replace('Bearer ', '');
      const expectedToken = process.env.ADMIN_API_TOKEN || process.env.NEXT_PUBLIC_ADMIN_API_TOKEN || 'dev-token';
      
      if (token !== expectedToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Get total visitors
    const totalVisitors = await prisma.siteVisitor.count();

    // Get total page views (sum of all visit counts)
    const pageViewsResult = await prisma.siteVisitor.aggregate({
      _sum: { visitCount: true },
    });
    const totalPageViews = pageViewsResult._sum.visitCount || 0;

    // Get unique pages
    const uniquePages = await prisma.siteVisitor.groupBy({
      by: ['page'],
      _count: { page: true },
    });

    // Get page views by page
    const pageViews = await prisma.siteVisitor.groupBy({
      by: ['page'],
      _sum: { visitCount: true },
      orderBy: { _sum: { visitCount: 'desc' } },
    });

    const pageViewsMap: Record<string, number> = {};
    for (const pv of pageViews) {
      pageViewsMap[pv.page] = pv._sum.visitCount || 0;
    }

    // Get active users (visited in last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const activeUsers = await prisma.siteVisitor.count({
      where: { lastVisit: { gte: fiveMinutesAgo } },
    });

    // Get browser stats
    const browserStats = await prisma.siteVisitor.groupBy({
      by: ['browser'],
      _count: { browser: true },
      orderBy: { _count: { browser: 'desc' } },
    });

    const eventsByType: Record<string, number> = {};
    for (const bs of browserStats) {
      eventsByType[bs.browser.toLowerCase()] = bs._count.browser;
    }

    // Get recent visitors
    const recentVisitors = await prisma.siteVisitor.findMany({
      take: 50,
      orderBy: { lastVisit: 'desc' },
      select: {
        page: true,
        browser: true,
        os: true,
        device: true,
        country: true,
        lastVisit: true,
        visitCount: true,
        referrer: true,
      },
    });

    const recentEvents = recentVisitors.map((v: {
      page: string;
      browser: string;
      os: string | null;
      device: string;
      country: string | null;
      lastVisit: Date;
      visitCount: number;
      referrer: string | null;
    }) => ({
      event: 'page_view',
      data: {
        browser: v.browser,
        os: v.os,
        device: v.device,
        country: v.country,
        visitCount: v.visitCount,
        referrer: v.referrer,
      },
      timestamp: v.lastVisit.getTime(),
      page: v.page,
      date: v.lastVisit.toISOString(),
    }));

    // Get project stats
    const totalProjects = await prisma.project.count();
    const publishedProjects = await prisma.project.count({
      where: { status: 'PUBLISHED' },
    });
    const draftProjects = await prisma.project.count({
      where: { status: 'DRAFT' },
    });

    return NextResponse.json({
      pageViews: pageViewsMap,
      eventsByType,
      recentEvents,
      totalPageViews,
      totalEvents: totalVisitors,
      activeUsers,
      projects: {
        total: totalProjects,
        published: publishedProjects,
        draft: draftProjects,
      },
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
