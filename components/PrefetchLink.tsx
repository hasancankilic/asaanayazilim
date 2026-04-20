'use client';

import { Link, usePathname } from '@/i18n/routing';
import { ReactNode, useEffect, useRef } from 'react';

interface PrefetchLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  prefetch?: boolean;
}

/**
 * Intelligent link component that prefetches routes on hover
 * Improves perceived performance by preloading pages
 */
const PrefetchLink = ({ href, children, className, onClick, prefetch = true }: PrefetchLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  
  // Don't prefetch current page
  const shouldPrefetch = prefetch && href !== pathname;

  useEffect(() => {
    if (!shouldPrefetch || !linkRef.current) return;

    const handleMouseEnter = () => {
      // Next.js automatically prefetches links in viewport
      // This adds additional prefetch on hover for faster navigation
      const link = linkRef.current;
      if (link) {
        // Trigger prefetch by creating a temporary link
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        prefetchLink.as = 'document';
        document.head.appendChild(prefetchLink);
        
        return () => {
          document.head.removeChild(prefetchLink);
        };
      }
    };

    const link = linkRef.current;
    if (link) {
      link.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      if (link) {
        link.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, [href, shouldPrefetch]);

  return (
    <Link
      ref={linkRef}
      href={href}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default PrefetchLink;
