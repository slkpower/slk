import { cn } from '@/lib/cn';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
};

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  as: Heading = 'h2',
}: Props) {
  return (
    <div
      className={cn(
        'mx-auto max-w-2xl',
        align === 'center' ? 'text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
      ) : null}
      <Heading className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</Heading>
      {subtitle ? (
        <p className="mt-3 text-base text-muted-foreground md:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
