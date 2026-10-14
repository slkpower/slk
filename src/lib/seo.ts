import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from './site-config';

const BASE = siteConfig.url.replace(/\/$/, '');

/** Absolute URL for a route in a given locale, honoring localePrefix: 'as-needed'. */
export function localizedUrl(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  const normalized = path === '/' ? '' : path.replace(/\/$/, '');
  return `${BASE}${prefix}${normalized}` || `${BASE}/`;
}

/** hreflang alternates map for a route (id, en, x-default). */
export function languageAlternates(path: string): Record<string, string> {
  return {
    'id-ID': localizedUrl('id', path),
    'en-US': localizedUrl('en', path),
    'x-default': localizedUrl('id', path),
  };
}

type PageMetaInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string;
};

/** Builds full per-page Metadata: canonical, hreflang, Open Graph, Twitter, robots. */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
}: PageMetaInput): Metadata {
  const canonical = localizedUrl(locale, path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}
