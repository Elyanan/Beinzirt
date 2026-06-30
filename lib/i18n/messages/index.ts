import { en, type Messages } from '@/lib/i18n/messages/en'

export type { Messages }

/** English UI strings only — Amharic is handled by Google Translate in the browser. */
export function getMessages(): Messages {
  return en
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
