import { AboutSection } from '@/components/sections/AboutSection';
import { ClientCarousel } from '@/components/sections/ClientCarousel';
import { ContactBlock } from '@/components/sections/ContactBlock';
import { Hero } from '@/components/sections/Hero';
import { ProductCatalog } from '@/components/sections/ProductCatalog';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AboutSection />
      <ProductCatalog />
      <ClientCarousel />
      <ContactBlock />
    </>
  );
}
