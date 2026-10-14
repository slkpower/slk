import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductCatalog } from '@/components/sections/ProductCatalog';
import { JsonLd } from '@/components/seo/JsonLd';
import { productCategories } from '@/lib/products';
import { buildPageMetadata, localizedUrl } from '@/lib/seo';
import { serviceLd } from '@/lib/structured-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.products' });
  return buildPageMetadata({
    locale,
    path: '/products',
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tCat = await getTranslations({ locale, namespace: 'products.categories' });
  const tMeta = await getTranslations({ locale, namespace: 'meta.categories' });
  const services = productCategories.map((c) =>
    serviceLd({
      name: tCat(c),
      description: tMeta(`${c}.description`),
      url: localizedUrl(locale, `/products/${c}`),
    }),
  );

  return (
    <>
      <JsonLd data={services} />
      <ProductCatalog headingLevel="h1" />
    </>
  );
}
