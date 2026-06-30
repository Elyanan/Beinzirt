import { formatBirr, formatUsd } from '@/lib/pricing'
import type { OrderLineItem } from '@/lib/sanity'

type SendEmailInput = {
  to: string
  subject: string
  html: string
  replyTo?: string
}

type SendEmailResult =
  | { ok: true }
  | { ok: false; skipped?: boolean; error: string }

export type ContactEmailData = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  timestamp: string
}

export type OrderEmailData = {
  orderId: string
  customerName: string
  phone: string
  email: string
  address: string
  notes?: string
  items: OrderLineItem[]
  subtotalBirr: number
  subtotalUsd: number
  deliveryFeeBirr: number
  totalBirr: number
  totalUsd: number
  timestamp: string
}

export type CustomOrderEmailData = {
  requestId: string
  name: string
  phone: string
  email: string
  productType: string
  occasion?: string
  colors?: string
  size?: string
  deadline?: string
  message: string
  timestamp: string
  sampleImageUrls?: string[]
}

const brandStyle = {
  background: '#f6f1e8',
  card: '#fffaf0',
  ink: '#2f281f',
  muted: '#746955',
  accent: '#b8860b',
  border: '#e3d7c2',
  primary: '#3b3024',
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return { ok: false, skipped: true, error: 'Email service is not configured.' }
  }

  const body: Record<string, unknown> = {
    from: process.env.RESEND_FROM_EMAIL || 'Beinzirt <onboarding@resend.dev>',
    to,
    subject,
    html,
  }

  if (replyTo) body.reply_to = replyTo

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    if (!response.ok) {
      const message = await response.text()
      return { ok: false, error: message || 'Email delivery failed.' }
    }

    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Email delivery failed.',
    }
  }
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formattedDate(timestamp: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp))
}

function detailRow(label: string, value: unknown) {
  const safeValue = escapeHtml(value || 'Not provided')
  return `
    <tr>
      <td style="padding:10px 0;color:${brandStyle.muted};font-size:13px;width:170px;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;color:${brandStyle.ink};font-size:14px;font-weight:600;">${safeValue}</td>
    </tr>
  `
}

function emailShell({
  eyebrow,
  title,
  preheader,
  children,
}: {
  eyebrow: string
  title: string
  preheader: string
  children: string
}) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin:0;background:${brandStyle.background};font-family:Inter,Arial,sans-serif;color:${brandStyle.ink};">
        <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">
          ${escapeHtml(preheader)}
        </span>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${brandStyle.background};padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:${brandStyle.card};border:1px solid ${brandStyle.border};border-radius:24px;overflow:hidden;">
                <tr>
                  <td style="height:6px;background:linear-gradient(90deg,#b8860b,#e2c15f,#8a2e24,#b8860b);"></td>
                </tr>
                <tr>
                  <td style="padding:34px 30px 22px;">
                    <p style="margin:0 0 10px;color:${brandStyle.accent};font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">
                      ${escapeHtml(eyebrow)}
                    </p>
                    <h1 style="margin:0;font-family:Georgia,serif;font-size:30px;line-height:1.15;color:${brandStyle.primary};">
                      ${escapeHtml(title)}
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 30px 34px;">
                    ${children}
                  </td>
                </tr>
              </table>
              <p style="margin:18px 0 0;color:${brandStyle.muted};font-size:12px;">
                Beinzirt Design, Addis Ababa
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

function contactButton(label: string, href: string, tone: 'primary' | 'accent' | 'muted' = 'primary') {
  const color = tone === 'accent' ? brandStyle.accent : tone === 'muted' ? brandStyle.muted : brandStyle.primary
  return `
    <a href="${escapeHtml(href)}" style="display:inline-block;margin:6px 8px 6px 0;padding:12px 16px;border-radius:999px;background:${color};color:#fffaf0;text-decoration:none;font-size:13px;font-weight:700;">
      ${escapeHtml(label)}
    </a>
  `
}

function normalizedPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  const display = phone.trim().startsWith('+') ? `+${digits}` : digits
  return { digits, display }
}

function quickContactButtons(order: OrderEmailData) {
  const { digits, display } = normalizedPhone(order.phone)
  const summary = order.items
    .map((item) => `${item.name} x ${item.quantity}`)
    .join(', ')
  const message = [
    `Hello ${order.customerName}!`,
    '',
    'Thank you for ordering from Beinzirt.',
    `Your order (Order ID ${order.orderId}) has been received.`,
    `Order summary: ${summary}`,
    `Total: ${formatBirr(order.totalBirr)}`,
    '',
    'Please reply to confirm your order.',
  ].join('\n')
  const encodedMessage = encodeURIComponent(message)

  return `
    <div style="margin-top:24px;padding:18px;border:1px solid ${brandStyle.border};border-radius:18px;background:#fffdf8;">
      <p style="margin:0 0 10px;color:${brandStyle.primary};font-size:14px;font-weight:700;">Quick customer contact</p>
      ${display ? contactButton('Call Customer', `tel:${display}`, 'primary') : ''}
      ${digits ? contactButton('WhatsApp Customer', `https://wa.me/${digits}?text=${encodedMessage}`, 'accent') : ''}
      ${digits ? contactButton('Telegram Customer', `tg://resolve?phone=${digits}&text=${encodedMessage}`, 'muted') : ''}
      <p style="margin:12px 0 0;color:${brandStyle.muted};font-size:12px;line-height:1.6;">
        Confirmation message:
        <br />${escapeHtml(message).replace(/\n/g, '<br />')}
      </p>
    </div>
  `
}

export function contactEmailHtml(data: ContactEmailData) {
  return emailShell({
    eyebrow: 'Contact form',
    title: data.subject,
    preheader: `New contact message from ${data.name}`,
    children: `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:1px solid ${brandStyle.border};border-bottom:1px solid ${brandStyle.border};">
        ${detailRow('Name', data.name)}
        ${detailRow('Email', data.email)}
        ${detailRow('Phone', data.phone)}
        ${detailRow('Submitted', formattedDate(data.timestamp))}
      </table>
      <div style="margin-top:22px;padding:18px;border-radius:18px;background:#fffdf8;border:1px solid ${brandStyle.border};">
        <p style="margin:0 0 8px;color:${brandStyle.muted};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Message</p>
        <p style="margin:0;color:${brandStyle.ink};font-size:15px;line-height:1.75;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
      </div>
    `,
  })
}

export function orderEmailHtml(data: OrderEmailData) {
  const items = data.items
    .map(
      (item) => `
        <tr>
          <td style="padding:12px 0;border-top:1px solid ${brandStyle.border};font-size:14px;color:${brandStyle.ink};">
            <strong>${escapeHtml(item.name)}</strong>
            <span style="display:block;color:${brandStyle.muted};font-size:12px;">${escapeHtml(item.category)}</span>
          </td>
          <td style="padding:12px 0;border-top:1px solid ${brandStyle.border};text-align:center;font-size:14px;">${item.quantity}</td>
          <td style="padding:12px 0;border-top:1px solid ${brandStyle.border};text-align:right;font-size:14px;">
            ${formatBirr(item.subtotalBirr)}
            <span style="display:block;color:${brandStyle.muted};font-size:12px;">${formatUsd(item.subtotalUsd)}</span>
          </td>
        </tr>
      `,
    )
    .join('')

  return emailShell({
    eyebrow: 'New website order',
    title: `Order ${data.orderId}`,
    preheader: `New Beinzirt order from ${data.customerName}`,
    children: `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:1px solid ${brandStyle.border};border-bottom:1px solid ${brandStyle.border};">
        ${detailRow('Customer', data.customerName)}
        ${detailRow('Phone', data.phone)}
        ${detailRow('Email', data.email)}
        ${detailRow('Delivery address', data.address)}
        ${detailRow('Date', formattedDate(data.timestamp))}
        ${detailRow('Notes', data.notes)}
      </table>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px;border-collapse:collapse;">
        <tr>
          <th align="left" style="padding:0 0 10px;color:${brandStyle.muted};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;">Product</th>
          <th style="padding:0 0 10px;color:${brandStyle.muted};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;">Qty</th>
          <th align="right" style="padding:0 0 10px;color:${brandStyle.muted};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;">Subtotal</th>
        </tr>
        ${items}
      </table>
      <div style="margin-top:18px;padding:18px;border-radius:18px;background:${brandStyle.primary};color:#fffaf0;">
        <p style="margin:0 0 8px;font-size:14px;">Subtotal: ${formatBirr(data.subtotalBirr)} / ${formatUsd(data.subtotalUsd)}</p>
        <p style="margin:0 0 8px;font-size:14px;">Delivery fee: ${data.deliveryFeeBirr ? formatBirr(data.deliveryFeeBirr) : 'Free'}</p>
        <p style="margin:0;font-family:Georgia,serif;font-size:24px;">Final total: ${formatBirr(data.totalBirr)} / ${formatUsd(data.totalUsd)}</p>
      </div>
      ${quickContactButtons(data)}
    `,
  })
}

export function customOrderEmailHtml(data: CustomOrderEmailData) {
  const sampleImages = data.sampleImageUrls?.length
    ? `
      <div style="margin-top:22px;padding:18px;border-radius:18px;background:#fffdf8;border:1px solid ${brandStyle.border};">
        <p style="margin:0 0 12px;color:${brandStyle.muted};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Sample Images</p>
        ${data.sampleImageUrls
          .map(
            (url) => `
              <a href="${escapeHtml(url)}" style="display:inline-block;margin:0 10px 10px 0;color:${brandStyle.accent};font-size:13px;font-weight:700;">
                View uploaded sample
              </a>
            `,
          )
          .join('')}
      </div>
    `
    : ''

  return emailShell({
    eyebrow: 'Custom order request',
    title: data.requestId,
    preheader: `New custom order request from ${data.name}`,
    children: `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:1px solid ${brandStyle.border};border-bottom:1px solid ${brandStyle.border};">
        ${detailRow('Customer', data.name)}
        ${detailRow('Phone', data.phone)}
        ${detailRow('Email', data.email)}
        ${detailRow('Requested item', data.productType)}
        ${detailRow('Occasion', data.occasion)}
        ${detailRow('Colors', data.colors)}
        ${detailRow('Size / measurements', data.size)}
        ${detailRow('Deadline', data.deadline)}
        ${detailRow('Submitted', formattedDate(data.timestamp))}
      </table>
      <div style="margin-top:22px;padding:18px;border-radius:18px;background:#fffdf8;border:1px solid ${brandStyle.border};">
        <p style="margin:0 0 8px;color:${brandStyle.muted};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Description</p>
        <p style="margin:0;color:${brandStyle.ink};font-size:15px;line-height:1.75;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
      </div>
      ${sampleImages}
    `,
  })
}
