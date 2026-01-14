'use client';

import { Share2 } from '@/lib/icons';
import IconWrapper from './IconWrapper';

interface ShareButtonProps {
  title: string;
  slug: string;
  locale: string;
}

export default function ShareButton({ 
  title, 
  slug, 
  locale 
}: ShareButtonProps) {
  const handleShare = async () => {
    const url = `${window.location.origin}/${locale}/blog/${slug}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert(locale === 'en' ? 'Link copied!' : 'Link kopyalandı!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl text-white transition-all duration-300 hover:scale-105"
    >
      <IconWrapper Icon={Share2} className="w-5 h-5" />
      {locale === 'en' ? 'Share' : 'Paylaş'}
    </button>
  );
}

