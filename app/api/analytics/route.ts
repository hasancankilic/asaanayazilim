import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// In-memory store for analytics (in production, use a database)
const analyticsStore = {
  pageViews: new Map<string, number>(),
  events: [] as Array<{
    event: string;
    data: Record<string, any>;
    timestamp: number;
    page: string;
  }>,
  sessions: new Map<string, { start: number; pages: string[]; lastActivity: number }>(),
  activeUsers: new Set<string>(), // Track active users by session
};

// Clean up old sessions (older than 30 minutes)
setInterval(() => {
  const now = Date.now();
  const thirtyMinutes = 30 * 60 * 1000;
  
  analyticsStore.sessions.forEach((session, sessionId) => {
    if (now - session.lastActivity > thirtyMinutes) {
      analyticsStore.sessions.delete(sessionId);
      analyticsStore.activeUsers.delete(sessionId);
    }
  });
}, 60000); // Check every minute

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, event, data, page, sessionId } = body;

    if (type === 'pageview') {
      const count = analyticsStore.pageViews.get(page || '/') || 0;
      analyticsStore.pageViews.set(page || '/', count + 1);

      // Track session
      if (sessionId) {
        const session = analyticsStore.sessions.get(sessionId) || {
          start: Date.now(),
          pages: [],
          lastActivity: Date.now(),
        };
        session.pages.push(page || '/');
        session.lastActivity = Date.now();
        analyticsStore.sessions.set(sessionId, session);
        analyticsStore.activeUsers.add(sessionId);
      }
    } else if (type === 'event') {
      analyticsStore.events.push({
        event: event || 'unknown',
        data: data || {},
        timestamp: Date.now(),
        page: page || '/',
      });
      // Keep only last 1000 events
      if (analyticsStore.events.length > 1000) {
        analyticsStore.events.shift();
      }

      // Update session activity
      if (sessionId) {
        const session = analyticsStore.sessions.get(sessionId);
        if (session) {
          session.lastActivity = Date.now();
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Check for admin authentication
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session');

  if (!session) {
    // Also check token for API access
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    const expectedToken = process.env.ADMIN_API_TOKEN || process.env.NEXT_PUBLIC_ADMIN_API_TOKEN || 'dev-token';
    
    if (token !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // Aggregate data
  const pageViews = Object.fromEntries(analyticsStore.pageViews);
  const eventsByType = analyticsStore.events.reduce((acc, evt) => {
    acc[evt.event] = (acc[evt.event] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentEvents = analyticsStore.events
    .slice(-50)
    .reverse()
    .map((evt) => ({
      ...evt,
      date: new Date(evt.timestamp).toISOString(),
    }));

  // Calculate active users (sessions active in last 5 minutes)
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;
  const activeUsers = Array.from(analyticsStore.sessions.values()).filter(
    (session) => now - session.lastActivity < fiveMinutes
  ).length;

  return NextResponse.json({
    pageViews,
    eventsByType,
    recentEvents,
    totalPageViews: Array.from(analyticsStore.pageViews.values()).reduce((a, b) => a + b, 0),
    totalEvents: analyticsStore.events.length,
    activeUsers,
  });
}
