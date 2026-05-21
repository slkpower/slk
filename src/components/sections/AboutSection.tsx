import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { AboutTabs } from './AboutTabs';

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <Image
            src="/assets/images/slk-logo.png"
            alt="SLK Logo"
            fill
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="object-contain dark:invert"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
          <div className="mt-8">
            <AboutTabs />
          </div>
        </div>
      </div>
    </section>
  );
}
