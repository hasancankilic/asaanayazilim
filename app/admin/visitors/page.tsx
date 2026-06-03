'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/AdminLayout';
import {
  Users,
  RefreshCw,
  Search,
  Monitor,
  Smartphone,
  Globe,
  Eye,
  ChevronLeft,
  ChevronRight,
} from '@/lib/icons';

interface Visitor {
  id: string;
  ipAddress: string;
  browser: string | null;
  os: string | null;
  device: string | null;
  page: string;
  referrer: string | null;
  language: string | null;
  screenRes: string | null;
  country: string | null;
  city: string | null;
  visitCount: number;
  firstVisit: string;
  lastVisit: string;
}

interface VisitorStats {
  visitors: Visitor[];
  total: number;
  uniqueIPs: number;
  totalPages: number;
  currentPage: number;
  deviceStats: { device: string | null; count: number }[];
  browserStats: { browser: string | null; count: number }[];
  topPages: { page: string; count: number }[];
}

export default function VisitorsPage() {
  const [data, setData] = useState<VisitorStats>({
    visitors: [],
    total: 0,
    uniqueIPs: 0,
    totalPages: 0,
    currentPage: 1,
    deviceStats: [],
    browserStats: [],
    topPages: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [days, setDays] = useState(7);
  const [page, setPage] = useState(1);

  const fetchVisitors = useCallback(async (silent = false) => {
    if (!silent) setRefreshing(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '50',
        days: String(days),
        ...(search ? { search } : {}),
      });
      const res = await fetch(`/api/admin/visitors?${params}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success) setData(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch visitors:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, days, search]);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  // Auto-refresh every 30s
  useEffect(() => {
    const interval = setInterval(() => fetchVisitors(true), 30000);
    return () => clearInterval(interval);
  }, [fetchVisitors]);

  const deviceIcon = (device: string | null) => {
    if (device === 'Mobile') return <Smartphone className="w-4 h-4 text-cyan-400" />;
    if (device === 'Tablet') return <Monitor className="w-4 h-4 text-purple-400" />;
    return <Monitor className="w-4 h-4 text-blue-400" />;
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'az önce';
    if (mins < 60) return `${mins} dk önce`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} saat önce`;
    const days = Math.floor(hours / 24);
    return `${days} gün önce`;
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-400" />
                Ziyaretçiler
              </h1>
              <p className="text-white/60 text-sm mt-2">
                Siteye giren ziyaretçilerin IP adresleri, tarayıcıları ve cihaz bilgileri
              </p>
            </div>
            <button
              onClick={() => fetchVisitors()}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Yenile
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="glass-card rounded-2xl p-5">
              <Eye className="w-6 h-6 text-blue-400 mb-3" />
              <div className="text-2xl font-bold text-white">{data.total.toLocaleString()}</div>
              <div className="text-white/60 text-sm">Toplam Ziyaret</div>
            </div>
            <div className="glass-card rounded-2xl p-5">
              <Users className="w-6 h-6 text-green-400 mb-3" />
              <div className="text-2xl font-bold text-white">{data.uniqueIPs.toLocaleString()}</div>
              <div className="text-white/60 text-sm">Benzersiz IP</div>
            </div>
            <div className="glass-card rounded-2xl p-5">
              <Smartphone className="w-6 h-6 text-cyan-400 mb-3" />
              <div className="text-2xl font-bold text-white">
                {data.deviceStats.find((d) => d.device === 'Mobile')?.count || 0}
              </div>
              <div className="text-white/60 text-sm">Mobil</div>
            </div>
            <div className="glass-card rounded-2xl p-5">
              <Monitor className="w-6 h-6 text-purple-400 mb-3" />
              <div className="text-2xl font-bold text-white">
                {data.deviceStats.find((d) => d.device === 'Desktop')?.count || 0}
              </div>
              <div className="text-white/60 text-sm">Masaüstü</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="IP, tarayıcı, sayfa ara..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <select
              value={days}
              onChange={(e) => { setDays(Number(e.target.value)); setPage(1); }}
              className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value={1}>Son 24 saat</option>
              <option value={7}>Son 7 gün</option>
              <option value={30}>Son 30 gün</option>
              <option value={90}>Son 90 gün</option>
            </select>
          </div>

          {/* Visitor Table */}
          <div className="glass-card rounded-2xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white/60 font-medium">IP Adresi</th>
                    <th className="text-left p-4 text-white/60 font-medium hidden md:table-cell">Tarayıcı / OS</th>
                    <th className="text-left p-4 text-white/60 font-medium hidden lg:table-cell">Cihaz</th>
                    <th className="text-left p-4 text-white/60 font-medium">Sayfa</th>
                    <th className="text-left p-4 text-white/60 font-medium hidden lg:table-cell">Konum</th>
                    <th className="text-left p-4 text-white/60 font-medium hidden sm:table-cell">Ekran</th>
                    <th className="text-left p-4 text-white/60 font-medium">Ziyaret</th>
                    <th className="text-left p-4 text-white/60 font-medium">Son Aktivite</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-white/40">Yükleniyor...</td>
                    </tr>
                  ) : data.visitors.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-white/40">Henüz ziyaretçi verisi yok</td>
                    </tr>
                  ) : (
                    data.visitors.map((v) => (
                      <tr key={v.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {deviceIcon(v.device)}
                            <span className="text-white font-mono text-xs">{v.ipAddress}</span>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <div className="text-white/80">{v.browser || '-'}</div>
                          <div className="text-white/40 text-xs">{v.os || '-'}</div>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            v.device === 'Mobile' ? 'bg-cyan-500/20 text-cyan-300' :
                            v.device === 'Tablet' ? 'bg-purple-500/20 text-purple-300' :
                            'bg-blue-500/20 text-blue-300'
                          }`}>
                            {v.device || '-'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-white/70 text-xs truncate max-w-[200px] block">{v.page}</span>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-white/60 text-xs">
                            <Globe className="w-3 h-3" />
                            {v.city ? `${v.city}, ${v.country}` : v.country || '-'}
                          </div>
                        </td>
                        <td className="p-4 hidden sm:table-cell">
                          <span className="text-white/50 text-xs">{v.screenRes || '-'}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-white/70 text-xs">{v.visitCount}x</span>
                        </td>
                        <td className="p-4">
                          <span className="text-white/50 text-xs">{timeAgo(v.lastVisit)}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-white/10">
                <span className="text-white/50 text-sm">
                  Sayfa {data.currentPage} / {data.totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                    disabled={page >= data.totalPages}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Stats Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Browser Breakdown */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Tarayıcı Dağılımı</h2>
              <div className="space-y-3">
                {data.browserStats.sort((a, b) => b.count - a.count).map((b) => {
                  const pct = data.total > 0 ? (b.count / data.total * 100).toFixed(1) : '0';
                  return (
                    <div key={b.browser || 'unknown'} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-white/80 text-sm">{b.browser || 'Unknown'}</span>
                      </div>
                      <span className="text-white/60 text-sm">{b.count} ({pct}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Pages */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">En Çok Ziyaret Edilen Sayfalar</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {data.topPages.map((p, idx) => (
                  <div key={p.page} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-white/80 text-sm truncate max-w-[250px]">{p.page}</span>
                    </div>
                    <span className="text-white font-medium text-sm">{p.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
