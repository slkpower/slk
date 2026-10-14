import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/SectionTitle';

type FaqItem = { q: string; a: string };

export function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as FaqItem[];

  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="container-page">
        <SectionTitle eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-xl border border-border">
          {items.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl leading-none text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-base text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
