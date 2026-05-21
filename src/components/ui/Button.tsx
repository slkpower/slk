import { cn } from '@/lib/cn';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  outline: 'border border-border bg-background text-foreground hover:bg-muted',
  ghost: 'text-foreground hover:bg-muted',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

type Common = { variant?: Variant; size?: Size; className?: string };

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...rest} />;
}

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn(base, variants[variant], sizes[size], className)} {...rest} />;
}
