import { cookies } from 'next/headers'
import { DEFAULT_LOCALE, LOCALE_COOKIE, type Locale } from '@/lib/i18n/config'

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get(LOCALE_COOKIE)?.value
  return value === 'am' ? 'am' : DEFAULT_LOCALE
}
