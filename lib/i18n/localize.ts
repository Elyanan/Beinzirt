import type { Locale } from '@/lib/i18n/config'

export function localize(en: string | undefined, am: string | undefined, locale: Locale) {
  if (locale === 'am' && am?.trim()) return am.trim()
  return en?.trim() ?? ''
}

export function localizeArray(en: string[] | undefined, am: string[] | undefined, locale: Locale) {
  if (locale === 'am' && am?.length) return am.filter(Boolean)
  return en ?? []
}

export function localizeOptional(en?: string, am?: string, locale: Locale = 'en') {
  const value = localize(en, am, locale)
  return value || undefined
}
