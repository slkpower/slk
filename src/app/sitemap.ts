import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { productCategories } from '@/lib/products';
import { languageAlternates, localizedUrl } from '@/lib/seo';

const routes = ['/', '/about', '/products', '/clients', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [...routes, ...productCategories.map((c) => `/products/${c}`)];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of paths) {
      entries.push({
        url: localizedUrl(locale, path),
        lastModified,
        changeFrequency: 'monthly',
        priority: path === '/' ? 1 : path.startsWith('/products/') ? 0.7 : 0.8,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  return entries;
}
