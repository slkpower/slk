import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { WhatsAppFab } from '@/components/layout/WhatsAppFab';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { routing } from '@/i18n/routing';
import { languageAlternates, localizedUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { organizationLd, websiteLd } from '@/lib/structured-data';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#427f5f',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const canonical = localizedUrl(locale, '/');

  const googleCode = siteConfig.verification.google as string;
  const bingCode = siteConfig.verification.bing as string;
  const verification: Metadata['verification'] = {};
  if (googleCode) verification.google = googleCode;
  if (bingCode) verification.other = { 'msvalidate.01': bingCode };

  return {
    title: { default: t('title'), template: `%s — ${siteConfig.shortName}` },
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical,
      languages: languageAlternates('/'),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonical,
      siteName: siteConfig.name,
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    icons: {
      icon: '/assets/images/favicon.svg',
      apple: siteConfig.logoPath,
    },
    verification: Object.keys(verification).length ? verification : undefined,
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
        <JsonLd data={[organizationLd(), websiteLd()]} />
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
