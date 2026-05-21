'use client';

import { type Locale, routing, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations('common');
  const [isPending, startTransition] = useTransition();

  const change = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- params shape varies per route, runtime safe
        { pathname, params },
        { locale: next },
      );
    });
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: <fieldset> adds default styling we don't want; aria-label + role=group is equivalent
    <div
      role="group"
      aria-label={t('switchLanguage')}
      className="inline-flex items-center rounded-md border border-border bg-background p-0.5 text-xs"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => change(l)}
          disabled={isPending}
          aria-pressed={l === locale}
          className={
            l === locale
              ? 'rounded px-2 py-1 font-semibold bg-primary text-white'
              : 'rounded px-2 py-1 text-foreground hover:bg-muted'
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
