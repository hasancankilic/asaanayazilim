'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe } from '@/lib/icons';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved locale from localStorage on mount
    const savedLocale = localStorage.getItem('preferred-locale');
    if (savedLocale && savedLocale !== locale && (savedLocale === 'tr' || savedLocale === 'en')) {
      router.replace(pathname, { locale: savedLocale });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    
    // Save to localStorage
    localStorage.setItem('preferred-locale', newLocale);
    // Also set cookie for server-side access
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    // Navigate to new locale
    router.replace(pathname, { locale: newLocale });
  };

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2 text-white/90">
        <Globe className="w-5 h-5" />
        <span className="uppercase text-sm">{locale}</span>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button
        className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
        aria-label="Change language"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Globe className="w-5 h-5" />
        <span className="uppercase text-sm sm:text-base">{locale}</span>
      </button>
      <div className="absolute top-full right-0 mt-2 bg-slate-900 border border-blue-500/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[120px]">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            switchLocale('tr');
          }}
          className={`block w-full px-4 py-2 text-left hover:bg-blue-600/20 transition-colors text-sm ${
            locale === 'tr' ? 'bg-blue-600/30 text-blue-400' : 'text-white'
          }`}
        >
          Türkçe
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            switchLocale('en');
          }}
          className={`block w-full px-4 py-2 text-left hover:bg-blue-600/20 transition-colors text-sm ${
            locale === 'en' ? 'bg-blue-600/30 text-blue-400' : 'text-white'
          }`}
        >
          English
        </button>
      </div>
    </div>
  );
}
