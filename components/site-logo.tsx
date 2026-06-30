import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LOGO, LOGO_WHITE } from '@/lib/images'

type SiteLogoProps = {
  variant?: 'default' | 'inverse'
  className?: string
  showWordmark?: boolean
  size?: 'nav' | 'footer'
}

export function SiteLogo({
  variant = 'default',
  className,
  showWordmark = false,
  size = 'nav',
}: SiteLogoProps) {
  const inverse = variant === 'inverse'
  const src = inverse ? LOGO_WHITE : LOGO

  return (
    <Link href="/" className={cn('group flex items-center gap-3', className)}>
      <Image
        src={src}
        alt="Beinzirt Design logo"
        width={180}
        height={100}
        className={cn(
          'shrink-0 object-contain transition-opacity group-hover:opacity-90',
          size === 'footer' ? 'h-28 w-auto sm:h-32' : 'h-16 w-auto sm:h-20',
        )}
        priority
      />
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              'font-serif text-lg tracking-tight sm:text-xl',
              inverse ? 'text-primary-foreground' : 'text-foreground',
            )}
          >
            Beinzirt
          </span>
          <span
            className={cn(
              'text-[0.6rem] font-medium uppercase tracking-[0.28em] transition-colors sm:text-[0.65rem]',
              inverse
                ? 'text-primary-foreground/70 group-hover:text-accent'
                : 'text-muted-foreground group-hover:text-accent',
            )}
          >
            Design
          </span>
        </div>
      )}
    </Link>
  )
}
