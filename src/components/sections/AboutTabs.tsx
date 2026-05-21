'use client';

import { cn } from '@/lib/cn';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Tab = 'values' | 'vision';

export function AboutTabs() {
  const t = useTranslations('about');
  const [tab, setTab] = useState<Tab>('values');

  return (
    <div>
      <div role="tablist" className="inline-flex rounded-lg border border-border bg-card p-1">
        {(['values', 'vision'] as const).map((k) => (
          <button
            key={k}
            role="tab"
            type="button"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-medium transition-colors',
              tab === k ? 'bg-primary text-white' : 'text-foreground/80 hover:bg-muted',
            )}
          >
            {t(`tabs.${k}`)}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-6 space-y-3 text-base leading-relaxed">
        {tab === 'values' ? (
          <>
            <p>
              <strong className="text-primary">{t('values.solutif.label')}:</strong>{' '}
              {t('values.solutif.text')}
            </p>
            <p>
              <strong className="text-primary">{t('values.loyal.label')}:</strong>{' '}
              {t('values.loyal.text')}
            </p>
            <p>
              <strong className="text-primary">{t('values.kompeten.label')}:</strong>{' '}
              {t('values.kompeten.text')}
            </p>
          </>
        ) : (
          <>
            <p>
              <strong className="text-primary">{t('vision.label')}:</strong> {t('vision.text')}
            </p>
            <p>
              <strong className="text-primary">{t('mission.label')}:</strong> {t('mission.text')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
