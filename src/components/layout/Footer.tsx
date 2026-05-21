import { Link } from '@/i18n/routing';
import { siteConfig } from '@/lib/site-config';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-16 bg-primary-dark text-white">
      <div className="container-page py-12 grid gap-8 md:grid-cols-3">
        <div>
          <Image
            src="/assets/images/slk-logo.png"
            alt="SLK"
            width={120}
            height={50}
            className="h-12 w-auto brightness-0 invert"
          />
          <h4 className="mt-3 text-lg font-bold">{siteConfig.name}</h4>
          <p className="mt-1 text-sm opacity-90">{t('footer.tagline')}</p>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase tracking-wide opacity-80">
            {t('footer.quickLinks')}
          </h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:underline">
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:underline">
                {t('nav.products')}
              </Link>
            </li>
            <li>
              <Link href="/clients" className="hover:underline">
                {t('nav.clients')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                {t('nav.contact')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase tracking-wide opacity-80">
            {t('footer.contactUs')}
          </h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li>WA: {siteConfig.whatsapp.number}</li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-4 text-center text-xs opacity-80">
          © {new Date().getFullYear()} {siteConfig.name}. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
