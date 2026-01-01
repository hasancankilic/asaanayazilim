'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Settings } from '@/lib/icons';

export default function SanityStudioPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if Sanity is configured
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    setIsConfigured(!!projectId && projectId !== '');

    // Check authentication
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      if (response.ok) {
        const data = await response.json();
        if (data.isAuthenticated === true) {
          setIsAuthenticated(true);
        } else {
          router.push('/admin');
        }
      } else {
        router.push('/admin');
      }
    } catch (error) {
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  // Show configuration error if Sanity is not configured
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full glass-card rounded-2xl p-8 border border-yellow-500/30">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Sanity CMS Yapılandırılmamış</h1>
          </div>
          
          <div className="space-y-4 text-white/80">
            <p>
              Sanity Studio'yu kullanmak için environment variable'ları yapılandırmanız gerekiyor.
            </p>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-2 flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Gerekli Environment Variables:
              </h3>
              <code className="block text-sm text-blue-400 mt-2">
                NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id<br />
                NEXT_PUBLIC_SANITY_DATASET=production
              </code>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <h3 className="text-white font-semibold mb-2">Kurulum Adımları:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Proje root dizininde <code className="text-blue-400">.env.local</code> dosyası oluşturun</li>
                <li>Yukarıdaki environment variable'ları ekleyin</li>
                <li>Development server'ı yeniden başlatın (<code className="text-blue-400">npm run dev</code>)</li>
                <li>Sanity projenizi oluşturmak için: <code className="text-blue-400">npx sanity init</code></li>
              </ol>
            </div>

            <div className="pt-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300"
              >
                Dashboard'a Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
