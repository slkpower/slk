'use client';

import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/products', key: 'products' },
  { href: '/clients', key: 'clients' },
  { href: '/contact', key: 'contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-colors',
        scrolled
          ? 'border-border bg-background/90 backdrop-blur'
          : 'border-transparent bg-background',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <Image
            src="/assets/images/slk-big-logo.png"
            alt="SLK"
            width={109}
            height={45}
            priority
            className="h-9 w-auto dark:brightness-110"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-foreground hover:bg-muted',
                )}
              >
                {t(l.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-background">
          <div className="container-page flex flex-col py-2">
            {links.map((l) => {
              const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    'rounded-md px-3 py-2.5 text-sm font-medium',
                    active ? 'text-primary' : 'text-foreground hover:bg-muted',
                  )}
                >
                  {t(l.key)}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
