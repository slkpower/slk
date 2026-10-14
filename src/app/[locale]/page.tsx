import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AboutSection } from '@/components/sections/AboutSection';
import { ClientCarousel } from '@/components/sections/ClientCarousel';
import { ContactBlock } from '@/components/sections/ContactBlock';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { ProductCatalog } from '@/components/sections/ProductCatalog';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqLd } from '@/lib/structured-data';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tFaq = await getTranslations({ locale, namespace: 'faq' });
  const faqItems = tFaq.raw('items') as { q: string; a: string }[];

  return (
    <>
      <JsonLd data={faqLd(faqItems)} />
      <Hero />
      <AboutSection />
      <ProductCatalog />
      <ClientCarousel />
      <Faq />
      <ContactBlock />
    </>
  );
}
