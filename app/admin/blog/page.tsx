'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Search,
  X,
} from '@/lib/icons';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function BlogManagementPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'DRAFT' | 'PUBLISHED'>('ALL');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [statusFilter]); // Refetch when filter changes

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query string
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      
      const url = `/api/admin/blog${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url);
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setPosts(result.data.posts || []);
        } else {
          setError(result.error || 'Blog yazıları yüklenirken bir hata oluştu');
        }
      } else if (response.status === 401) {
        router.push('/admin/login');
      } else {
        const result = await response.json();
        setError(result.error || 'Blog yazıları yüklenirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Blog yazıları yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchPosts();
  };

  const handleDelete = async (id: string, title: string) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setPosts(posts.filter(p => p.id !== id));
          setDeleteConfirm(null);
        } else {
          alert(result.error || 'Silme işlemi başarısız');
        }
      } else {
        const result = await response.json();
        alert(result.error || 'Silme işlemi başarısız');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Silme işlemi başarısız');
    }
  };

  if (loading && posts.length === 0) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
            <div className="text-white">Yükleniyor...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Blog Yönetimi</h1>
              <p className="text-white/60 text-sm sm:text-base mt-2">
                Blog yazılarını yönetin, ekleyin ve düzenleyin
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/blog/new')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all text-white font-medium"
            >
              <Plus className="w-4 h-4" />
              Yeni Yazı
            </button>
          </div>

          {/* Filters */}
          <div className="glass-card rounded-2xl p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Başlık veya slug ile ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      fetchPosts();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-4 py-2 rounded-xl transition-colors ${
                    statusFilter === 'ALL'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setStatusFilter('PUBLISHED')}
                  className={`px-4 py-2 rounded-xl transition-colors ${
                    statusFilter === 'PUBLISHED'
                      ? 'bg-green-600 text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  Yayında
                </button>
                <button
                  onClick={() => setStatusFilter('DRAFT')}
                  className={`px-4 py-2 rounded-xl transition-colors ${
                    statusFilter === 'DRAFT'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  Taslak
                </button>
              </div>
              
              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                Ara
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
              {error}
            </div>
          )}

          {/* Blog Posts List */}
          <div className="glass-card rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                Blog Yazıları ({posts.length})
              </h2>
              <button
                onClick={fetchPosts}
                className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl transition-colors text-sm"
              >
                Yenile
              </button>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">
                  {searchQuery || statusFilter !== 'ALL' 
                    ? 'Arama sonucu bulunamadı' 
                    : 'Henüz blog yazısı yok'}
                </p>
                {!searchQuery && statusFilter === 'ALL' && (
                  <button
                    onClick={() => router.push('/admin/blog/new')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    İlk Blog Yazısını Ekle
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 sm:p-6 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg sm:text-xl font-bold text-white">
                            {post.title}
                          </h3>
                          {post.status === 'PUBLISHED' ? (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-medium flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              Yayında
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-xs font-medium flex items-center gap-1">
                              <EyeOff className="w-3 h-3" />
                              Taslak
                            </span>
                          )}
                        </div>
                        {post.excerpt && (
                          <p className="text-white/60 text-sm mb-2 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
                          <span>Slug: {post.slug}</span>
                          <span>
                            Oluşturulma: {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                          {post.publishedAt && (
                            <span>
                              Yayın: {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className={`p-2 rounded-lg transition-colors ${
                            deleteConfirm === post.id
                              ? 'bg-red-600 text-white'
                              : 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                          }`}
                          title={deleteConfirm === post.id ? 'Onayla' : 'Sil'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
