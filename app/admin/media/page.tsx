'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import {
  ImageIcon,
  Upload,
  Loader2,
  X,
  Trash2,
} from '@/lib/icons';

interface MediaFile {
  url: string;
  filename: string;
  uploadedAt?: string;
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setError(null);

    try {
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
      setFiles([{ url: data.url, filename: data.filename }, ...files]);
    } catch (error) {
      setError('Resim yüklenemedi');
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Media Library</h1>
              <p className="text-white/60 text-sm sm:text-base mt-2">
                Yüklenen görselleri yönetin
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
              {error}
            </div>
          )}

          {/* Upload Area */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Yeni Resim Yükle</h2>
            <label className="block w-full h-48 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
                className="hidden"
                disabled={uploading}
              />
              <div className="text-center">
                {uploading ? (
                  <>
                    <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-2" />
                    <span className="text-white/60 text-sm">Yükleniyor...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-white/40 mx-auto mb-2" />
                    <span className="text-white/60 text-sm">Resim Seç veya Sürükle</span>
                    <p className="text-white/40 text-xs mt-1">JPEG, PNG, WebP (Max 5MB)</p>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Media Grid */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Yüklenen Resimler</h2>
            
            {files.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">Henüz resim yüklenmedi</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-white/5 rounded-lg overflow-hidden">
                      <img
                        src={file.url}
                        alt={file.filename}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(file.url);
                          alert('URL kopyalandı!');
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white"
                      >
                        Kopyala
                      </button>
                    </div>
                    <div className="mt-2 text-xs text-white/60 truncate" title={file.filename}>
                      {file.filename}
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

