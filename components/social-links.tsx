import { cn } from '@/lib/utils'

type SocialLink = {
  label: string
  href: string
}

function SocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase()

  if (key.includes('instagram')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm4.75-2.85a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
      </svg>
    )
  }

  if (key.includes('facebook')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M14 8.1V6.6c0-.75.3-1.1 1.2-1.1H17V2.2A22 22 0 0 0 14.3 2C11.6 2 9.8 3.65 9.8 6.7v1.4H7v3.65h2.8V22H14V11.75h2.85l.45-3.65H14Z" />
      </svg>
    )
  }

  if (key.includes('tiktok')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M15.6 2c.25 2.15 1.45 3.7 3.75 3.85v3.35a6.95 6.95 0 0 1-3.8-1.15v6.8c0 4.15-2.5 6.9-6.35 6.9A6.15 6.15 0 0 1 3 15.55c0-3.65 2.85-6.45 6.55-6.15v3.5c-1.75-.25-3.05.8-3.05 2.6 0 1.65 1.15 2.8 2.7 2.8 1.7 0 2.75-1.05 2.75-3.25V2h3.65Z" />
      </svg>
    )
  }

  if (key.includes('pinterest')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M12.15 2C6.65 2 3 5.65 3 10.45c0 3.05 1.7 4.85 2.7 4.85.45 0 .7-1.25.7-1.6 0-.4-1.05-1.3-1.05-3.05 0-3.65 2.75-6.25 6.35-6.25 3.1 0 5.4 1.75 5.4 5 0 2.4-1 6.9-4.1 6.9-1.1 0-2.05-.8-1.75-1.95.35-1.35 1-2.8 1-4.25 0-2.45-3.45-2-3.45 1.15 0 .65.2 1.35.5 1.95l-2 8.5c-.1.45-.05.5.2.15 1.05-1.45 1.45-2.75 2.05-4.65.55 1.05 2 1.6 3.15 1.6 4.15 0 6.35-4.05 6.35-7.95C19.05 5.65 16.05 2 12.15 2Z" />
      </svg>
    )
  }

  if (key.includes('telegram')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M21.7 3.3 18.5 20c-.25 1.2-.9 1.5-1.85.95l-5.1-3.75-2.45 2.35c-.28.28-.5.5-1.05.5l.35-5.2 9.45-8.55c.4-.35-.1-.55-.62-.2L5.6 13.45.55 11.85c-1.1-.35-1.12-1.1.25-1.65L20.55 2.6c.9-.35 1.7.2 1.15.7Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M19.05 4.95A9.9 9.9 0 0 0 3.2 16.45L2 22l5.7-1.15A9.9 9.9 0 0 0 22 12a9.85 9.85 0 0 0-2.95-7.05ZM12.1 20.1a8.05 8.05 0 0 1-4.1-1.12l-.3-.18-3.35.68.7-3.25-.2-.34A8.05 8.05 0 1 1 12.1 20.1Zm4.45-6.05c-.25-.12-1.45-.72-1.68-.8-.22-.08-.38-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-3.3-2.9c-.25-.43.25-.4.7-1.32.08-.17.04-.32-.02-.44-.06-.12-.55-1.32-.76-1.8-.2-.47-.4-.4-.55-.4h-.46c-.16 0-.42.06-.64.3-.22.25-.84.83-.84 2.02s.86 2.34.98 2.5c.12.17 1.7 2.6 4.12 3.65 1.54.67 2.15.72 2.92.6.45-.08 1.45-.6 1.65-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}

export function SocialLinks({
  links,
  variant = 'light',
  className,
}: {
  links: SocialLink[]
  variant?: 'light' | 'dark'
  className?: string
}) {
  if (!links.length) return null

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {links.map((link) => (
        <a
          key={`${link.label}-${link.href}`}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit Beinzirt on ${link.label}`}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all',
            variant === 'dark'
              ? 'border-primary-foreground/15 text-primary-foreground/75 hover:border-accent hover:text-accent'
              : 'border-border bg-card text-foreground/75 hover:border-accent hover:text-foreground',
          )}
        >
          <SocialIcon label={link.label} />
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  )
}
