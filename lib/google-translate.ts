export const GOOGTRANS_COOKIE = 'googtrans'

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string
            includedLanguages: string
            autoDisplay: boolean
          },
          elementId: string,
        ) => void
      }
    }
  }
}

let scriptPromise: Promise<void> | null = null

function readGoogTransCookie() {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/)
  return match?.[1] ? decodeURIComponent(match[1]) : ''
}

function setCookie(name: string, value: string) {
  const hostname = window.location.hostname
  document.cookie = `${name}=${value};path=/`
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    document.cookie = `${name}=${value};path=/;domain=${hostname}`
    const parts = hostname.split('.')
    if (parts.length >= 2) {
      document.cookie = `${name}=${value};path=/;domain=.${parts.slice(-2).join('.')}`
    }
  }
}

function clearCookie(name: string) {
  const expired = 'expires=Thu, 01 Jan 1970 00:00:00 UTC'
  const hostname = window.location.hostname
  document.cookie = `${name}=;${expired};path=/`
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    document.cookie = `${name}=;${expired};path=/;domain=${hostname}`
    const parts = hostname.split('.')
    if (parts.length >= 2) {
      document.cookie = `${name}=;${expired};path=/;domain=.${parts.slice(-2).join('.')}`
    }
  }
}

export function setGoogleTranslateCookie(language: 'en' | 'am') {
  if (language === 'am') {
    setCookie(GOOGTRANS_COOKIE, '/en/am')
    return
  }
  clearCookie(GOOGTRANS_COOKIE)
}

export function loadGoogleTranslateScript() {
  if (typeof window === 'undefined') return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve) => {
    if (document.getElementById('google-translate-script')) {
      resolve()
      return
    }

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,am',
            autoDisplay: false,
          },
          'google_translate_element',
        )
      }
      resolve()
    }

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    script.onerror = () => resolve()
    document.body.appendChild(script)
  })

  return scriptPromise
}

function triggerComboLanguage(language: 'en' | 'am') {
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo')
  if (!select) return false
  select.value = language
  select.dispatchEvent(new Event('change'))
  return true
}

async function refreshTranslation(language: 'en' | 'am') {
  await loadGoogleTranslateScript()
  if (triggerComboLanguage(language)) return

  let attempts = 0
  await new Promise<void>((resolve) => {
    const interval = window.setInterval(() => {
      if (triggerComboLanguage(language) || ++attempts >= 25) {
        window.clearInterval(interval)
        resolve()
      }
    }, 200)
  })
}

export async function applyGoogleTranslate(language: 'en' | 'am', options?: { reload?: boolean }) {
  if (typeof window === 'undefined') return

  const current = readGoogTransCookie()
  const wantsAm = language === 'am'
  const isAmActive = current === '/en/am'

  if (wantsAm && isAmActive && !options?.reload) {
    await refreshTranslation('am')
    return
  }

  if (!wantsAm && !isAmActive && !options?.reload) {
    return
  }

  setGoogleTranslateCookie(language)
  window.location.reload()
}
