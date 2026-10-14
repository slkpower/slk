import { siteConfig } from './site-config';

const BASE = siteConfig.url.replace(/\/$/, '');
const ORG_ID = `${BASE}/#organization`;

/** LocalBusiness (also an Organization) describing the company. */
export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': ORG_ID,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: BASE,
    logo: `${BASE}${siteConfig.logoPath}`,
    image: `${BASE}${siteConfig.logoPath}`,
    description: siteConfig.tagline,
    slogan: siteConfig.tagline,
    email: siteConfig.email,
    telephone: siteConfig.phoneInternational,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    areaServed: { '@type': 'Country', name: siteConfig.areaServed },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phoneInternational,
      email: siteConfig.email,
      contactType: 'sales',
      availableLanguage: ['Indonesian', 'English'],
    },
    sameAs: [siteConfig.whatsapp.url],
  };
}

/** WebSite schema. */
export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    url: BASE,
    name: siteConfig.name,
    publisher: { '@id': ORG_ID },
    inLanguage: ['id-ID', 'en-US'],
  };
}

/** Service offered, linked to the organization as provider. */
export function serviceLd(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: input.url,
    serviceType: input.name,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: siteConfig.areaServed },
  };
}

/** BreadcrumbList from an ordered list of {name, url}. */
export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** FAQPage from question/answer pairs. */
export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
