'use client';

import { clientLogos } from '@/lib/products';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function ClientCarousel() {
  const t = useTranslations('clients');
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true }, [
    Autoplay({ delay: 2500, stopOnInteraction: false }),
  ]);

  return (
    <section className="border-y border-border bg-muted/30 py-16 md:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">{t('subtitle')}</p>
        </div>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex items-center gap-8">
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div
                key={`${logo.src}-${i}`}
                className="relative h-20 w-40 shrink-0 grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
