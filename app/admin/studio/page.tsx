'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudioRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          // Redirect to Sanity Studio
          router.push('/admin/[[...index]]');
        } else {
          router.push('/admin');
        }
      } else {
        router.push('/admin');
      }
    } catch (error) {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <div className="text-white">Yönlendiriliyor...</div>
      </div>
    </div>
  );
}
