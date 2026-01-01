'use client';

import { useEffect } from 'react';
import { AlertCircle } from '@/lib/icons';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error('Locale layout error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">
          {t('title') || 'Bir Hata Oluştu'}
        </h1>
        <p className="text-white/70 mb-8">
          {error.message || t('message') || 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.'}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300"
          >
            {t('retry') || 'Tekrar Dene'}
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300"
          >
            {t('home') || 'Ana Sayfaya Dön'}
          </Link>
        </div>
      </div>
    </div>
  );
}

