'use client';

// Debounce utility
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Generate or get session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// Debounced fetch function - preserves request data
const debouncedFetch = debounce((url: string, options: RequestInit) => {
  fetch(url, options).catch(() => {
    // Silently fail - analytics should not break the app
  });
}, 300);

// Client-side analytics tracking
export const trackPageView = (page: string) => {
  if (typeof window === 'undefined') return;

  const sessionId = getSessionId();

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: page,
    });
  }

  // Custom analytics (debounced)
  debouncedFetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      type: 'pageview', 
      page,
      sessionId,
    }),
  });
};

export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  const page = window.location.pathname;
  const sessionId = getSessionId();

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...eventData,
      page_path: page,
    });
  }

  // Custom analytics (debounced)
  debouncedFetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'event',
      event: eventName,
      data: eventData || {},
      page,
      sessionId,
    }),
  });
};

export const trackCTA = (ctaName: string) => {
  trackEvent('cta_click', { cta_name: ctaName });
};

export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', { form_name: formName });
};
