'use client'

import { cn } from '@/lib/utils'
import { localeLabels, type Locale } from '@/lib/i18n/config'
import { useTranslation } from '@/components/language-provider'

export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale } = useTranslation()

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-border/80 bg-background/80 p-0.5 text-xs font-medium backdrop-blur',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {(['en', 'am'] as Locale[]).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={cn(
            'rounded-full px-3 py-1.5 transition-all duration-300',
            locale === item
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
          aria-pressed={locale === item}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  )
}
