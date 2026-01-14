import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Safe dynamic import with fallback
  let messages;
  try {
    if (locale === 'tr') {
      messages = (await import('../messages/tr.json')).default;
    } else if (locale === 'en') {
      messages = (await import('../messages/en.json')).default;
    } else {
      messages = (await import('../messages/tr.json')).default;
    }
  } catch (error) {
    // Fallback to default locale
    messages = (await import('../messages/tr.json')).default;
  }

  return {
    locale,
    messages,
  };
});


