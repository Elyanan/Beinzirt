'use client'

import { useEffect } from 'react'
import { loadGoogleTranslateScript } from '@/lib/google-translate'

export function GoogleTranslate() {
  useEffect(() => {
    loadGoogleTranslateScript()
  }, [])

  return (
    <div
      id="google_translate_element"
      className="pointer-events-none fixed -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      aria-hidden="true"
    />
  )
}
