'use client';

import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = { url: string };

export function PdfViewer({ url }: Props) {
  const t = useTranslations('common');
  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-start justify-center overflow-auto p-4">
        <Document
          file={url}
          onLoadSuccess={({ numPages: n }) => setNumPages(n)}
          loading={
            <div className="grid place-items-center p-12 text-sm text-muted-foreground">
              Loading…
            </div>
          }
        >
          <Page
            pageNumber={page}
            scale={scale}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className="shadow-lg"
          />
        </Document>
      </div>
      <div className="flex items-center justify-center gap-2 border-t border-border bg-background px-4 py-3">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          aria-label={t('prev')}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm tabular-nums">
          {t('page')} {page} {t('of')} {numPages || '—'}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(numPages || p, p + 1))}
          disabled={page >= numPages}
          aria-label={t('next')}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="mx-2 h-6 w-px bg-border" />
        <button
          type="button"
          onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
          aria-label={t('zoomOut')}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="text-sm tabular-nums">{Math.round(scale * 100)}%</span>
        <button
          type="button"
          onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
          aria-label={t('zoomIn')}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
