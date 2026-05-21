'use client';

import { PdfModal } from '@/components/pdf/PdfModal';
import { cn } from '@/lib/cn';
import { type Product, type ProductCategory, productCategories, products } from '@/lib/products';
import { FileText, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

type Props = { initialCategory?: ProductCategory };

export function ProductCatalog({ initialCategory = 'rent' }: Props) {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const [category, setCategory] = useState<ProductCategory>(initialCategory);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 200);
  const [openPdf, setOpenPdf] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return products.filter((p) => {
      if (p.category !== category) return false;
      if (!q) return true;
      return p.title.toLowerCase().includes(q);
    });
  }, [category, debouncedQuery]);

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">{t('subtitle')}</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {productCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                category === c
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-background text-foreground hover:bg-muted',
              )}
            >
              {t(`categories.${c}`)}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-full border border-border bg-background px-4 py-2">
          <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label={tCommon('search')}
          />
        </div>

        <p className="mt-8 text-center text-base text-muted-foreground">
          {t(`descriptions.${category}`)}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.length === 0 ? (
            <p className="col-span-full py-12 text-center text-muted-foreground">
              {tCommon('noResults')}
            </p>
          ) : (
            filtered.map((p) => (
              <article
                key={p.slug}
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold">{p.title}</h3>
                  {p.brochure ? (
                    <button
                      type="button"
                      onClick={() => setOpenPdf(p)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <FileText className="h-3.5 w-3.5" /> {tCommon('openBrochure')}
                    </button>
                  ) : null}
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {openPdf?.brochure ? (
        <PdfModal url={openPdf.brochure} title={openPdf.title} onClose={() => setOpenPdf(null)} />
      ) : null}
    </section>
  );
}
