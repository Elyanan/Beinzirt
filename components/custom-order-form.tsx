'use client'

import { useState, type FormEvent } from 'react'
import { Upload, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
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

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Full name is required'
  if (!data.phone.trim()) errors.phone = 'Phone number is required'
  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }
  if (!data.productType) errors.productType = 'Please select a product type'
  if (!data.message.trim()) errors.message = 'Please describe your request'
  return errors
}

export function CustomOrderForm() {
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
      const response = await fetch('/api/custom-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, submissionId: crypto.randomUUID() }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Failed to submit custom order.')
      setSubmittedRequestId(payload.requestId)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit custom order.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submittedRequestId) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border/70 bg-card px-6 py-12 text-center shadow-luxury">
        <CheckCircle2 className="size-12 text-accent" />
        <h3 className="mt-4 font-serif text-2xl text-foreground">Request Submitted</h3>
        <p className="mt-5 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground">
          Request ID: {submittedRequestId}
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thank you for your custom order request. Our design team will contact you within 1–2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="order-name">Full Name</Label>
          <Input
            id="order-name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="order-phone">Phone Number</Label>
          <Input
            id="order-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+251 ..."
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="order-email">Email Address</Label>
        <Input
          id="order-email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="order-product">Product Type</Label>
          <Select
            id="order-product"
            value={form.productType}
            onChange={(e) => handleChange('productType', e.target.value)}
            aria-invalid={!!errors.productType}
          >
            <option value="">Select product type</option>
            {customOrderProductTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
          {errors.productType && <p className="text-xs text-destructive">{errors.productType}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="order-occasion">Occasion</Label>
          <Select
            id="order-occasion"
            value={form.occasion}
            onChange={(e) => handleChange('occasion', e.target.value)}
          >
            <option value="">Select occasion</option>
            {customOrderOccasions.map((occ) => (
              <option key={occ} value={occ}>{occ}</option>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="order-colors">Preferred Colors</Label>
          <Input
            id="order-colors"
            value={form.colors}
            onChange={(e) => handleChange('colors', e.target.value)}
            placeholder="e.g. gold, cream, green"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="order-size">Size / Measurements</Label>
          <Input
            id="order-size"
            value={form.size}
            onChange={(e) => handleChange('size', e.target.value)}
            placeholder="Your size or measurements"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="order-deadline">Deadline / Needed By Date</Label>
        <Input
          id="order-deadline"
          type="date"
          value={form.deadline}
          onChange={(e) => handleChange('deadline', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="order-upload">Upload Sample Design</Label>
        <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 transition-colors hover:border-accent/50 hover:bg-muted/50">
          <Upload className="size-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drag & drop or click to upload (UI only)
          </p>
          <input
            id="order-upload"
            type="file"
            accept="image/*,.pdf"
            className="sr-only"
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="order-message">Message / Description</Label>
        <Textarea
          id="order-message"
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Describe your design idea, occasion details, and any special requests..."
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
            Submitting...
          </>
        ) : (
          'Submit Request'
        )}
      </Button>
    </form>
  )
}
