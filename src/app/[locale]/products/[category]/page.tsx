import { ProductCatalog } from '@/components/sections/ProductCatalog';
import { routing } from '@/i18n/routing';
import { type ProductCategory, productCategories } from '@/lib/products';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

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
  const t = await getTranslations({ locale, namespace: 'products.categories' });
  return { title: t(category) };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isCategory(category)) notFound();
  setRequestLocale(locale);
  return <ProductCatalog initialCategory={category} />;
}
