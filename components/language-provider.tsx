'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  type Locale,
} from '@/lib/i18n/config'
import { getMessages, translate, type Messages } from '@/lib/i18n/messages'

type LanguageContextValue = {
  locale: Locale
  messages: Messages
  t: (key: string) => string
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  return stored === 'am' ? 'am' : DEFAULT_LOCALE
}

function persistLocale(locale: Locale) {
  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`
  document.documentElement.lang = locale === 'am' ? 'am' : 'en'
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = readStoredLocale()
    setLocaleState(stored)
    persistLocale(stored)
    setReady(true)
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    persistLocale(next)
  }, [])

  const messages = useMemo(() => getMessages(locale), [locale])
  const t = useCallback((key: string) => translate(messages, key), [messages])

  const value = useMemo(
    () => ({ locale, messages, t, setLocale }),
    [locale, messages, t, setLocale],
  )

  if (!ready && initialLocale === DEFAULT_LOCALE) {
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

export function useTranslation() {
  const { t, locale, messages, setLocale } = useLanguage()
  return { t, locale, messages, setLocale }
}
