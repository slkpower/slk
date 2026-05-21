import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/40 to-background">
      <div className="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t('tagline')}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {t('company')}
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            {t('description')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button size="lg">{t('ctaContact')}</Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline">
                {t('ctaProducts')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <Image
            src="/assets/images/header/header-1-image.jpeg"
            alt={t('company')}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
