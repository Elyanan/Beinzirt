'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  type Locale,
} from '@/lib/i18n/config'
import { getMessages, translate, type Messages } from '@/lib/i18n/messages'
import { applyGoogleTranslate } from '@/lib/google-translate'

type LanguageContextValue = {
  locale: Locale
  messages: Messages
  /** UI labels always render in English; Google Translate handles Amharic. */
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = readStoredLocale()
    setLocaleState(stored)
    persistLocale(stored)
    setReady(true)

    if (stored === 'am') {
      void applyGoogleTranslate('am')
    }
  }, [])

  useEffect(() => {
    if (!ready || locale !== 'am') return
    void applyGoogleTranslate('am')
  }, [pathname, locale, ready])

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return
      setLocaleState(next)
      persistLocale(next)
      void applyGoogleTranslate(next)
    },
    [locale],
  )

  const messages = useMemo(() => getMessages(), [])
  const t = useCallback((key: string) => translate(messages, key), [messages])

  const value = useMemo(
    () => ({ locale, messages, t, setLocale }),
    [locale, messages, t, setLocale],
  )

  if (!ready) {
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
