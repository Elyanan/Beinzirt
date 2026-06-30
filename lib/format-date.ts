const ADMIN_DATE_LOCALE = 'en-US'

const dateFormatter = new Intl.DateTimeFormat(ADMIN_DATE_LOCALE, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
})

const dateTimeFormatter = new Intl.DateTimeFormat(ADMIN_DATE_LOCALE, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

export function formatAdminDate(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return dateFormatter.format(date)
}

export function formatAdminDateTime(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return dateTimeFormatter.format(date)
}
