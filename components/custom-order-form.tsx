'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Upload, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { useTranslation } from '@/components/language-provider'
import { customOrderOccasions, customOrderProductTypes } from '@/lib/data'

type FormData = {
  name: string
  phone: string
  email: string
  productType: string
  occasion: string
  colors: string
  size: string
  deadline: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

function validate(data: FormData, t: (key: string) => string): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = t('customOrder.fullNameRequired')
  if (!data.phone.trim()) errors.phone = t('customOrder.phoneRequired')
  if (!data.email.trim()) {
    errors.email = t('contact.emailRequired')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = t('contact.emailInvalid')
  }
  if (!data.productType) errors.productType = t('customOrder.productTypeRequired')
  if (!data.message.trim()) errors.message = t('customOrder.messageRequired')
  return errors
}

export function CustomOrderForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    productType: '',
    occasion: '',
    colors: '',
    size: '',
    deadline: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submittedRequestId, setSubmittedRequestId] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const successRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [sampleFileName, setSampleFileName] = useState('')

  useEffect(() => {
    if (!submittedRequestId) return
    successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    successRef.current?.focus({ preventScroll: true })
  }, [submittedRequestId])

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return
    const validationErrors = validate(form, t)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitError('')
    setSubmitting(true)
    try {
      const payload = new FormData()
      Object.entries(form).forEach(([key, value]) => payload.append(key, value))
      payload.append('submissionId', crypto.randomUUID())
      const sampleImage = fileInputRef.current?.files?.[0]
      if (sampleImage) payload.append('sampleImage', sampleImage)

      const response = await fetch('/api/custom-orders', {
        method: 'POST',
        body: payload,
      })
      const responsePayload = await response.json()
      if (!response.ok) throw new Error(responsePayload.error || t('customOrder.failed'))
      setSubmittedRequestId(responsePayload.requestId)
      setSampleFileName('')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t('customOrder.failed'))
    } finally {
      setSubmitting(false)
    }
  }

  if (submittedRequestId) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="flex flex-col items-center rounded-2xl border border-border/70 bg-card px-6 py-12 text-center shadow-luxury outline-none"
      >
        <CheckCircle2 className="size-12 text-accent" />
        <h3 className="mt-4 font-serif text-2xl text-foreground">{t('customOrder.successHeading')}</h3>
        <p className="mt-5 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
          {t('customOrder.requestId')}: {submittedRequestId}
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {t('customOrder.responseTime')}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="order-name">{t('customOrder.fullName')}</Label>
          <Input
            id="order-name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder={t('customOrder.fullName')}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="order-phone">{t('customOrder.phone')}</Label>
          <Input
            id="order-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder={t('customOrder.phone')}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="order-email">{t('customOrder.email')}</Label>
        <Input
          id="order-email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder={t('customOrder.email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="order-product">{t('customOrder.productType')}</Label>
          <Select
            id="order-product"
            value={form.productType}
            onChange={(e) => handleChange('productType', e.target.value)}
            aria-invalid={!!errors.productType}
          >
            <option value="">{t('customOrder.selectProduct')}</option>
            {customOrderProductTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
          {errors.productType && <p className="text-xs text-destructive">{errors.productType}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="order-occasion">{t('customOrder.occasion')}</Label>
          <Select
            id="order-occasion"
            value={form.occasion}
            onChange={(e) => handleChange('occasion', e.target.value)}
          >
            <option value="">{t('customOrder.selectOccasion')}</option>
            {customOrderOccasions.map((occ) => (
              <option key={occ} value={occ}>{occ}</option>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="order-colors">{t('customOrder.colors')}</Label>
          <Input
            id="order-colors"
            value={form.colors}
            onChange={(e) => handleChange('colors', e.target.value)}
            placeholder={t('customOrder.colors')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="order-size">{t('customOrder.size')}</Label>
          <Input
            id="order-size"
            value={form.size}
            onChange={(e) => handleChange('size', e.target.value)}
            placeholder={t('customOrder.size')}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="order-deadline">{t('customOrder.deadline')}</Label>
        <Input
          id="order-deadline"
          type="date"
          value={form.deadline}
          onChange={(e) => handleChange('deadline', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="order-upload">{t('customOrder.uploadSample')}</Label>
        <label
          htmlFor="order-upload"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition-colors hover:border-accent/50 hover:bg-muted/50"
        >
          <Upload className="size-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            {t('customOrder.uploadHint')}
          </p>
          {sampleFileName ? (
            <p className="mt-2 max-w-full truncate text-xs font-medium text-foreground">
              {sampleFileName}
            </p>
          ) : null}
          <input
            ref={fileInputRef}
            id="order-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => setSampleFileName(event.target.files?.[0]?.name ?? '')}
          />
        </label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="order-message">{t('customOrder.messageDescription')}</Label>
        <Textarea
          id="order-message"
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder={t('customOrder.description')}
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
            {t('customOrder.submitting')}
          </>
        ) : (
          t('customOrder.submit')
        )}
      </Button>
    </form>
  )
}
