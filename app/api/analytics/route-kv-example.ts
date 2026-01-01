/**
 * Analytics API Route - Vercel KV (Redis) Example
 * 
 * Bu dosya, analytics verilerini Vercel KV (Redis) ile saklamak için örnek bir implementasyondur.
 * 
 * Kullanım:
 * 1. `npm install @vercel/kv` komutunu çalıştırın
 * 2. Vercel Dashboard'da KV database oluşturun
 * 3. Bu dosyayı `app/api/analytics/route.ts` olarak kopyalayın
 * 4. Environment variables'ları ayarlayın (KV_REST_API_URL, KV_REST_API_TOKEN)
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { kv } from '@vercel/kv';

// Helper functions for KV storage
async function getPageViews(): Promise<Record<string, number>> {
  try {
    const data = await kv.get('analytics:pageViews');
    return (data as Record<string, number>) || {};
  } catch (error) {
    console.error('Error getting page views:', error);
    return {};
  }
}

async function incrementPageView(page: string) {
  try {
    const pageViews = await getPageViews();
    pageViews[page] = (pageViews[page] || 0) + 1;
    await kv.set('analytics:pageViews', pageViews);
  } catch (error) {
    console.error('Error incrementing page view:', error);
  }
}

async function addEvent(event: {
  event: string;
  data: Record<string, any>;
  timestamp: number;
  page: string;
}) {
  try {
    // Get current events list
    const events = await kv.lrange('analytics:events', 0, 999); // Last 1000 events
    
    // Add new event to the beginning
    await kv.lpush('analytics:events', JSON.stringify(event));
    
    // Keep only last 1000 events
    if (events.length >= 1000) {
      await kv.rpop('analytics:events');
    }
  } catch (error) {
    console.error('Error adding event:', error);
  }
}

async function updateSession(sessionId: string, page: string) {
  try {
    const sessionKey = `analytics:session:${sessionId}`;
    const session = (await kv.get(sessionKey)) as {
      start: number;
      pages: string[];
      lastActivity: number;
    } || {
      start: Date.now(),
      pages: [],
      lastActivity: Date.now(),
    };
    
    session.pages.push(page);
    session.lastActivity = Date.now();
    
    // Set with 30 minutes TTL
    await kv.set(sessionKey, session, { ex: 1800 });
  } catch (error) {
    console.error('Error updating session:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, event, data, page, sessionId } = body;

    if (type === 'pageview') {
      const pagePath = page || '/';
      await incrementPageView(pagePath);

      // Track session
      if (sessionId) {
        await updateSession(sessionId, pagePath);
      }
    } else if (type === 'event') {
      await addEvent({
        event: event || 'unknown',
        data: data || {},
        timestamp: Date.now(),
        page: page || '/',
      });

      // Update session activity
      if (sessionId) {
        const sessionKey = `analytics:session:${sessionId}`;
        const session = (await kv.get(sessionKey)) as {
          start: number;
          pages: string[];
          lastActivity: number;
        };
        if (session) {
          session.lastActivity = Date.now();
          await kv.set(sessionKey, session, { ex: 1800 });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics POST error:', error);
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

  try {
    // Get page views
    const pageViews = await getPageViews();
    
    // Get events (last 50)
    const events = await kv.lrange('analytics:events', 0, 49);
    
    // Aggregate events by type
    const eventsByType = events.reduce((acc, evtStr) => {
      try {
        const evt = JSON.parse(evtStr as string);
        acc[evt.event] = (acc[evt.event] || 0) + 1;
      } catch {
        // Skip invalid events
      }
      return acc;
    }, {} as Record<string, number>);

    // Format recent events
    const recentEvents = events
      .reverse()
      .map((evtStr) => {
        try {
          const evt = JSON.parse(evtStr as string);
          return {
            ...evt,
            date: new Date(evt.timestamp).toISOString(),
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean) as Array<{
        event: string;
        data: Record<string, any>;
        timestamp: number;
        page: string;
        date: string;
      }>;

    // Calculate active users (sessions active in last 5 minutes)
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    try {
      const sessionKeys = await kv.keys('analytics:session:*');
      const sessions = await Promise.all(
        sessionKeys.map(async (key) => {
          try {
            return await kv.get(key);
          } catch {
            return null;
          }
        })
      );
      
      const activeUsers = sessions.filter((session) => {
        if (!session) return false;
        const s = session as { start: number; pages: string[]; lastActivity: number };
        return now - s.lastActivity < fiveMinutes;
      }).length;

      // Calculate totals
      const totalPageViews = Object.values(pageViews).reduce((a, b) => a + b, 0);
      const totalEvents = await kv.llen('analytics:events');

      return NextResponse.json({
        pageViews,
        eventsByType,
        recentEvents,
        totalPageViews,
        totalEvents,
        activeUsers,
      });
    } catch (error) {
      console.error('Error calculating active users:', error);
      return NextResponse.json({
        pageViews,
        eventsByType,
        recentEvents,
        totalPageViews: Object.values(pageViews).reduce((a, b) => a + b, 0),
        totalEvents: events.length,
        activeUsers: 0,
      });
    }
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

