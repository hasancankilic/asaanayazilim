'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import {
  ArrowLeft,
  Save,
  Eye,
  Loader2,
  Upload,
  X,
  ImageIcon,
} from '@/lib/icons';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  galleryImages?: string[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt?: string;
}

export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/blog/${id}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const postData = result.data.post;
          setPost(postData);
          setTitle(postData.title || '');
          setSlug(postData.slug || '');
          setExcerpt(postData.excerpt || '');
          setContent(postData.content || '');
          setCoverImageUrl(postData.coverImageUrl || '');
          setGalleryImages(postData.galleryImages || []);
          setSeoTitle(postData.seoTitle || '');
          setSeoDescription(postData.seoDescription || '');
          setCanonicalUrl(postData.canonicalUrl || '');
          setOgImageUrl(postData.ogImageUrl || '');
          setStatus(postData.status || 'DRAFT');
        } else {
          setError(result.error || 'Blog yazısı yüklenemedi');
        }
      } else if (response.status === 401) {
        router.push('/admin/login');
      } else {
        const result = await response.json();
        setError(result.error || 'Blog yazısı yüklenemedi');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Blog yazısı yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value));
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.url;
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await handleImageUpload(file);
      setCoverImageUrl(url);
    } catch (error) {
      alert('Resim yüklenemedi');
    }
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await handleImageUpload(file);
      setGalleryImages([...galleryImages, url]);
    } catch (error) {
      alert('Resim yüklenemedi');
    }
  };

  const handleSave = async (publishStatus?: 'DRAFT' | 'PUBLISHED') => {
    setSaving(true);
    setError(null);

    try {
      const saveStatus = publishStatus || status;
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt: excerpt || null,
          content,
          coverImageUrl: coverImageUrl || null,
          galleryImages,
          seoTitle: seoTitle || null,
          seoDescription: seoDescription || null,
          canonicalUrl: canonicalUrl || null,
          ogImageUrl: ogImageUrl || null,
          status: saveStatus,
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        router.push('/admin/blog');
      } else {
        setError(result.error || 'Kaydetme başarısız');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setError('Kaydetme başarısız');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-8 flex items-center justify-center min-h-screen">
          <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 bg-slate-900 min-h-screen">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.push('/admin/blog')}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Geri
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => handleSave('DRAFT')}
                disabled={saving}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Taslak Olarak Kaydet'}
              </button>
              <button
                onClick={() => handleSave('PUBLISHED')}
                disabled={saving}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Yayınla
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Temel Bilgiler</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Blog yazısı başlığı"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="blog-yazisi-slug"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Özet
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Kısa açıklama..."
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">İçerik *</h2>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                placeholder="Blog yazısı içeriği (Markdown veya HTML kullanabilirsiniz)"
              />
            </div>

            {/* Images */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Görseller</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Kapak Görseli
                  </label>
                  {coverImageUrl ? (
                    <div className="relative group">
                      <img
                        src={coverImageUrl}
                        alt="Cover"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => setCoverImageUrl('')}
                        className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="block w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageUpload}
                        className="hidden"
                      />
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                        <span className="text-white/60 text-sm">Resim Yükle</span>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">SEO Ayarları</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    SEO Başlık
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SEO için özel başlık (opsiyonel)"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    SEO Açıklama
                  </label>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="SEO için açıklama"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="https://example.com/..."
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    OG Image URL
                  </label>
                  <input
                    type="url"
                    value={ogImageUrl}
                    onChange={(e) => setOgImageUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

