import { cn } from '@/lib/utils'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: Props) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
          <span className="h-px w-6 bg-accent" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}
