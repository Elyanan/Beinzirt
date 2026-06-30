'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useTranslation } from '@/components/language-provider'

type FormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

export function ContactForm() {
  const { t } = useTranslation()

  function validate(data: FormData): FormErrors {
    const errors: FormErrors = {}
    if (!data.name.trim()) errors.name = t('contact.nameRequired')
    if (!data.email.trim()) {
      errors.email = t('contact.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = t('contact.emailInvalid')
    }
    if (!data.subject.trim()) errors.subject = t('contact.subjectRequired')
    if (!data.message.trim()) errors.message = t('contact.messageRequired')
    return errors
  }
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!submitted) return
    successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    successRef.current?.focus({ preventScroll: true })
  }, [submitted])

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitError('')
    setSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || t('contact.failed'))
      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t('contact.failed'))
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="flex flex-col items-center rounded-2xl border border-border/70 bg-card px-6 py-12 text-center shadow-luxury outline-none"
      >
        <CheckCircle2 className="size-12 text-accent" />
        <h3 className="mt-4 font-serif text-2xl text-foreground">{t('contact.successTitle')}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{t('contact.successText')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">{t('contact.fullName')}</Label>
          <Input
            id="contact-name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">{t('contact.email')}</Label>
          <Input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-phone">{t('contact.phone')}</Label>
          <Input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+251 ..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-subject">{t('contact.subject')}</Label>
          <Input
            id="contact-subject"
            value={form.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            placeholder="How can we help?"
            aria-invalid={!!errors.subject}
          />
          {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">{t('contact.message')}</Label>
        <Textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Tell us about your inquiry..."
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
      </div>
      {submitError && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {submitError}
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t('contact.sending')}
          </>
        ) : (
          <>
            <Send className="size-4" />
            {t('contact.send')}
          </>
        )}
      </Button>
    </form>
  )
}
