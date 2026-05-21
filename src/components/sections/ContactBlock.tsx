import { siteConfig } from '@/lib/site-config';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ContactBlock() {
  const t = useTranslations('contact');

  const items = [
    {
      icon: MessageCircle,
      label: t('whatsapp.label'),
      value: t('whatsapp.number'),
      cta: t('whatsapp.cta'),
      href: siteConfig.whatsapp.url,
      external: true,
    },
    {
      icon: Mail,
      label: t('email.label'),
      value: t('email.address'),
      cta: t('email.cta'),
      href: `mailto:${siteConfig.email}`,
      external: false,
    },
    {
      icon: Phone,
      label: t('phone.label'),
      value: t('phone.number'),
      cta: '',
      href: `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`,
      external: false,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">{t('subtitle')}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, label, value, cta, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="group rounded-xl border border-border bg-card p-6 shadow-soft transition hover:border-primary hover:shadow-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {label}
              </h3>
              <p className="mt-1 text-base font-medium">{value}</p>
              {cta ? (
                <p className="mt-3 text-sm font-medium text-primary group-hover:underline">
                  {cta} →
                </p>
              ) : null}
            </a>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-border">
          <iframe
            title="Map"
            src={siteConfig.mapEmbedUrl}
            className="h-[400px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
