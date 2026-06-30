import { NextResponse } from 'next/server'
import { CONTACT_EMAIL } from '@/lib/email-config'
import { contactEmailHtml, sendEmail } from '@/lib/email'

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = cleanString(body.name)
    const email = cleanString(body.email)
    const phone = cleanString(body.phone)
    const subject = cleanString(body.subject)
    const message = cleanString(body.message)
    const timestamp = new Date().toISOString()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }

    if (!isEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const result = await sendEmail({
      to: CONTACT_EMAIL,
      subject: `Beinzirt contact: ${subject}`,
      replyTo: email,
      html: contactEmailHtml({ name, email, phone, subject, message, timestamp }),
    })

    if (!result.ok) {
      return NextResponse.json(
        { error: result.skipped ? 'Email service is not configured.' : 'Failed to send your message.' },
        { status: result.skipped ? 503 : 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send your message.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
