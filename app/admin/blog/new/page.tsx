'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  X,
} from '@/lib/icons';

export default function BlogNewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug) {
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
    if (!response.ok) throw new Error('Upload failed');
    const data = await response.json();
    return data.url;
  };

  const handleSave = async (status: 'DRAFT' | 'PUBLISHED') => {
    if (!title || !content) {
      setError('Başlık ve içerik zorunludur');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: slug || undefined, // Let API generate if empty
          excerpt: excerpt || null,
          content,
          coverImageUrl: coverImageUrl || null,
          galleryImages,
          seoTitle: seoTitle || null,
          seoDescription: seoDescription || null,
          canonicalUrl: canonicalUrl || null,
          ogImageUrl: ogImageUrl || null,
          status,
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        router.push('/admin/blog');
      } else {
        setError(result.error || 'Kaydetme başarısız');
      }
    } catch (error) {
      setError('Kaydetme başarısız');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 bg-slate-900 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.push('/admin/blog')}
              className="flex items-center gap-2 text-white/70 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              Geri
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => handleSave('DRAFT')}
                disabled={saving}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Taslak Olarak Kaydet'}
              </button>
              <button
                onClick={() => handleSave('PUBLISHED')}
                disabled={saving}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl disabled:opacity-50 flex items-center gap-2"
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
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Temel Bilgiler</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Başlık *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Slug *</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Özet</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">İçerik *</h2>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
              />
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Kapak Görseli</h2>
              {coverImageUrl ? (
                <div className="relative group">
                  <img src={coverImageUrl} alt="Cover" className="w-full h-64 object-cover rounded-xl" />
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
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const url = await handleImageUpload(file);
                          setCoverImageUrl(url);
                        } catch (error) {
                          alert('Resim yüklenemedi');
                        }
                      }
                    }}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                    <span className="text-white/60 text-sm">Resim Yükle</span>
                  </div>
                </label>
              )}
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">SEO Ayarları</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">SEO Başlık</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">SEO Açıklama</label>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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

