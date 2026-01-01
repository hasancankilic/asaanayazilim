'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/AdminLayout';
import {
  Eye,
  MousePointerClick,
  FileText,
  Users,
  TrendingUp,
  RefreshCw,
} from '@/lib/icons';

interface AnalyticsData {
  pageViews: Record<string, number>;
  eventsByType: Record<string, number>;
  recentEvents: Array<{
    event: string;
    data: Record<string, any>;
    timestamp: number;
    page: string;
    date: string;
  }>;
  totalPageViews: number;
  totalEvents: number;
  activeUsers?: number;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    pageViews: {},
    eventsByType: {},
    recentEvents: [],
    totalPageViews: 0,
    totalEvents: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAnalytics = useCallback(async (silent = false) => {
    if (!silent) {
      setIsRefreshing(true);
    }

    try {
      const response = await fetch('/api/analytics', {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_TOKEN || 'dev-token'}`,
        },
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Analytics fetch error:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Real-time polling for analytics
  useEffect(() => {
    if (!loading) {
      fetchAnalytics();
      const interval = setInterval(() => {
        fetchAnalytics(true); // Silent refresh
      }, 5000); // Every 5 seconds

      return () => clearInterval(interval);
    }
  }, [loading, fetchAnalytics]);

  const handleManualRefresh = () => {
    fetchAnalytics(false);
  };

  const topPages = Object.entries(analytics.pageViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold">Dashboard</h1>
                {isRefreshing && (
                  <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
                )}
              </div>
              <p className="text-white/60 text-sm sm:text-base">
                Site istatistikleri ve yönetim
              </p>
              <p className="text-white/40 text-xs mt-1">
                Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}
              </p>
            </div>
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Yenile
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="glass-card rounded-2xl p-4 sm:p-6 hover:border-blue-400/60 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {analytics.totalPageViews.toLocaleString()}
              </div>
              <div className="text-white/60 text-xs sm:text-sm">Toplam Sayfa Görüntüleme</div>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-6 hover:border-purple-400/60 transition-all">
              <div className="flex items-center justify-between mb-4">
                <MousePointerClick className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {analytics.totalEvents.toLocaleString()}
              </div>
              <div className="text-white/60 text-xs sm:text-sm">Toplam Etkileşim</div>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-6 hover:border-green-400/60 transition-all">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {Object.keys(analytics.pageViews).length}
              </div>
              <div className="text-white/60 text-xs sm:text-sm">Benzersiz Sayfa</div>
            </div>

            <div className="glass-card rounded-2xl p-4 sm:p-6 hover:border-orange-400/60 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {analytics.activeUsers || 0}
              </div>
              <div className="text-white/60 text-xs sm:text-sm">Aktif Kullanıcı</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Top Pages */}
            <div className="glass-card rounded-2xl p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                En Çok Ziyaret Edilen Sayfalar
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {topPages.length > 0 ? (
                  topPages.map(([page, views], idx) => (
                    <div key={page} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold text-xs sm:text-sm">
                          {idx + 1}
                        </div>
                        <span className="text-white/80 text-sm sm:text-base truncate">{page || '/'}</span>
                      </div>
                      <span className="text-white font-semibold text-sm sm:text-base">{views}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-white/60 text-sm">Henüz veri yok</p>
                )}
              </div>
            </div>

            {/* Event Types */}
            <div className="glass-card rounded-2xl p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                Etkinlik Türleri
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {Object.entries(analytics.eventsByType)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([event, count]) => (
                    <div key={event} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <span className="text-white/80 text-sm sm:text-base capitalize">{event.replace(/_/g, ' ')}</span>
                      <span className="text-white font-semibold text-sm sm:text-base">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Recent Events */}
          {analytics.recentEvents.length > 0 && (
            <div className="glass-card rounded-2xl p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Son Etkinlikler</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {analytics.recentEvents.slice(0, 20).map((event, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white/5 rounded-lg gap-2 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <span className="text-white/60 text-xs sm:text-sm">
                        {new Date(event.date).toLocaleString('tr-TR')}
                      </span>
                      <span className="text-white font-medium text-sm sm:text-base">{event.event}</span>
                      <span className="text-white/60 text-xs sm:text-sm truncate">{event.page}</span>
                    </div>
                    {event.data.cta_name && (
                      <span className="text-blue-400 text-xs sm:text-sm">{event.data.cta_name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
