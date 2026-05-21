import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { WhatsAppFab } from '@/components/layout/WhatsAppFab';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site-config';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: { default: t('title'), template: `%s — ${siteConfig.shortName}` },
    description: t('description'),
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
    },
    icons: { icon: '/assets/images/favicon.svg' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-1 focus:text-white"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <WhatsAppFab />
          </ThemeProvider>
        </NextIntlClientProvider>
        {siteConfig.ga.measurementId ? (
          <GoogleTagManager gtmId={siteConfig.ga.measurementId} />
        ) : null}
      </body>
    </html>
  );
}
