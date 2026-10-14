import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductCatalog } from '@/components/sections/ProductCatalog';
import { JsonLd } from '@/components/seo/JsonLd';
import { routing } from '@/i18n/routing';
import { type ProductCategory, productCategories } from '@/lib/products';
import { buildPageMetadata, localizedUrl } from '@/lib/seo';
import { breadcrumbLd, serviceLd } from '@/lib/structured-data';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    productCategories.map((category) => ({ locale, category })),
  );
}

function isCategory(v: string): v is ProductCategory {
  return (productCategories as readonly string[]).includes(v);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isCategory(category)) return {};
  const t = await getTranslations({ locale, namespace: `meta.categories.${category}` });
  return buildPageMetadata({
    locale,
    path: `/products/${category}`,
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isCategory(category)) notFound();
  setRequestLocale(locale);

  const tCat = await getTranslations({ locale, namespace: 'products.categories' });
  const tMeta = await getTranslations({ locale, namespace: 'meta.categories' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const service = serviceLd({
    name: tCat(category),
    description: tMeta(`${category}.description`),
    url: localizedUrl(locale, `/products/${category}`),
  });
  const breadcrumb = breadcrumbLd([
    { name: tNav('home'), url: localizedUrl(locale, '/') },
    { name: tNav('products'), url: localizedUrl(locale, '/products') },
    { name: tCat(category), url: localizedUrl(locale, `/products/${category}`) },
  ]);

  return (
    <>
      <JsonLd data={[service, breadcrumb]} />
      <ProductCatalog initialCategory={category} headingLevel="h1" />
    </>
  );
}
