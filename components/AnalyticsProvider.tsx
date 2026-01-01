'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/routing';
import { trackPageView } from '@/lib/analytics-client';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on route change
    trackPageView(pathname);
  }, [pathname]);

  return <>{children}</>;
}




