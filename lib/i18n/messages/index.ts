import { am } from '@/lib/i18n/messages/am'
import { en, type Messages } from '@/lib/i18n/messages/en'
import type { Locale } from '@/lib/i18n/config'

export const messages: Record<Locale, Messages> = { en, am }

export type { Messages }

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages.en
}

type NestedKeyOf<T, Prefix extends string = ''> = T extends string
  ? Prefix extends ''
    ? never
    : Prefix
  : {
      [K in keyof T & string]: NestedKeyOf<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>
    }[keyof T & string]

export type TranslationKey = NestedKeyOf<Messages>

export function translate(messages: Messages, key: string): string {
  const parts = key.split('.')
  let current: unknown = messages
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return key
    }
  }
  return typeof current === 'string' ? current : key
}
