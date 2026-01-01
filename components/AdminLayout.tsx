'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FolderKanban,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  Menu,
  X,
  ImageIcon,
} from '@/lib/icons';
import { useEffect, useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/media', label: 'Media', icon: ImageIcon },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const checkAuth = async () => {
    try {
      setAuthError(null);
      
      const response = await fetch('/api/auth/check', {
        cache: 'no-store',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          const currentPath = pathname;
          router.push(`/admin/login?redirect=${encodeURIComponent(currentPath)}`);
        }
      } else {
        setIsAuthenticated(false);
        const currentPath = pathname;
        router.push(`/admin/login?redirect=${encodeURIComponent(currentPath)}`);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setAuthError('Kimlik doğrulama hatası');
      setIsAuthenticated(false);
      const currentPath = pathname;
      router.push(`/admin/login?redirect=${encodeURIComponent(currentPath)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-white">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !loading) {
    // Show loading while redirecting
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-white">Yönlendiriliyor...</div>
          {authError && (
            <div className="mt-4 text-red-400 text-sm">{authError}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-slate-800/50 border-r border-blue-500/20 p-6 flex-col">
        <div className="flex items-center mb-10">
          <Sparkles className="w-8 h-8 text-blue-400 mr-3" />
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center p-3 rounded-lg text-red-400 bg-red-500/20 hover:bg-red-500/30 transition-colors font-medium"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Çıkış Yap
        </button>
      </aside>

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-800 border-r border-blue-500/20 p-6 flex flex-col z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <Sparkles className="w-8 h-8 text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center p-3 rounded-lg text-red-400 bg-red-500/20 hover:bg-red-500/30 transition-colors font-medium"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Çıkış Yap
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto min-h-screen bg-slate-900">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-slate-800/90 backdrop-blur-md border-b border-blue-500/20 p-4 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center">
            <Sparkles className="w-6 h-6 text-blue-400 mr-2" />
            <span className="text-white font-semibold">Admin</span>
          </div>
          <div className="w-6 h-6" /> {/* Spacer for centering */}
        </div>
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
