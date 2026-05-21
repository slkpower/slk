'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const PdfViewer = dynamic(() => import('./PdfViewer').then((m) => m.PdfViewer), {
  ssr: false,
  loading: () => (
    <div className="grid h-[60vh] place-items-center text-sm text-muted-foreground">
      Loading PDF…
    </div>
  ),
});

type Props = {
  url: string;
  title?: string;
  onClose: () => void;
};

export function PdfModal({ url, title, onClose }: Props) {
  const t = useTranslations('common');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    // biome-ignore lint/a11y/useSemanticElements: native <dialog> can't be styled as overlay here; aria-modal preserves semantics
    // biome-ignore lint/a11y/useKeyWithClickEvents: Escape handled at document level
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-background px-4 py-3">
        <h2 className="truncate text-sm font-semibold">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('close')}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto bg-muted">
        <PdfViewer url={url} />
      </div>
    </div>
  );
}
