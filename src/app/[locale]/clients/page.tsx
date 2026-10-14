import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ClientCarousel } from '@/components/sections/ClientCarousel';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.clients' });
  return buildPageMetadata({
    locale,
    path: '/clients',
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  });
}

export default async function ClientsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ClientCarousel headingLevel="h1" />;
}
