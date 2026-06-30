export type Locale = 'en' | 'am'

export const LOCALES: Locale[] = ['en', 'am']
export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_COOKIE = 'beinzirt-lang'
export const LOCALE_STORAGE_KEY = 'beinzirt-lang'

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  am: 'አማርኛ',
}
