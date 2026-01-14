import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// Root path redirect to default locale
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}

