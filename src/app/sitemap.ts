import { routing } from '@/i18n/routing';
import { productCategories } from '@/lib/products';
import { siteConfig } from '@/lib/site-config';
import type { MetadataRoute } from 'next';

const routes = ['', '/about', '/products', '/clients', '/contact'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    for (const r of routes) {
      entries.push({
        url: `${base}${prefix}${r || '/'}`,
        changeFrequency: 'monthly',
        priority: r === '' ? 1 : 0.8,
      });
    }
    for (const c of productCategories) {
      entries.push({
        url: `${base}${prefix}/products/${c}`,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }
  return entries;
}
