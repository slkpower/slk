import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#427f5f',
    lang: 'id',
    icons: [
      {
        src: '/assets/images/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
      {
        src: siteConfig.logoPath,
        type: 'image/png',
        sizes: 'any',
        purpose: 'any',
      },
    ],
  };
}
