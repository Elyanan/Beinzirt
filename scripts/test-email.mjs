import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { Resend } from 'resend'

const root = process.cwd()
const envPath = path.join(root, '.env.local')

if (existsSync(envPath)) {
  const envText = await readFile(envPath, 'utf8')
  for (const line of envText.split(/\r?\n/)) {
    const match = line.match(/^([^#=\s]+)=(.*)$/)
    if (match) process.env[match[1]] = match[2]
  }
}

const apiKey = process.env.RESEND_API_KEY
const from = process.env.RESEND_FROM_EMAIL || 'Beinzirt <noreply@beinzirt.com>'
const contactEmail = process.env.CONTACT_EMAIL || 'contact@beinzirt.com'
const ordersEmail = process.env.ORDERS_EMAIL || 'orders@beinzirt.com'

if (!apiKey) {
  throw new Error('Missing RESEND_API_KEY in .env.local')
}

const resend = new Resend(apiKey)
const targets = [
  { label: 'Contact', to: contactEmail },
  { label: 'Orders', to: ordersEmail },
]

for (const target of targets) {
  const result = await resend.emails.send({
    from,
    to: [target.to],
    subject: `Beinzirt email test (${target.label})`,
    html: `<p>Test email for <strong>${target.label}</strong> routing via Resend.</p>`,
  })

  if (result.error) {
    console.error(`FAILED ${target.to}:`, result.error)
    process.exitCode = 1
    continue
  }

  console.log(`OK ${target.to} -> id ${result.data?.id}`)
}
