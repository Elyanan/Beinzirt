'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import { IMAGE_FALLBACK } from '@/lib/images'
import {
  deliveryFeeForBirr,
  formatBirr,
  formatDualPrice,
  formatUsd,
  productPriceBirr,
  productPriceUsd,
} from '@/lib/pricing'

type CheckoutForm = {
  customerName: string
  phone: string
  email: string
  address: string
  notes: string
}

const initialForm: CheckoutForm = {
  customerName: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
}

export function CartClient() {
  const { items, subtotalBirr, subtotalUsd, updateQuantity, removeItem, clear } = useCart()
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successOrderId, setSuccessOrderId] = useState('')

  const deliveryFeeBirr = deliveryFeeForBirr(subtotalBirr)
  const totalBirr = subtotalBirr + deliveryFeeBirr
  const totalUsd = subtotalUsd
  const orderItems = useMemo(
    () =>
      items.map((item) => ({
        productId: item.id,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        priceBirr: productPriceBirr(item),
        priceUsd: productPriceUsd(item),
        image: item.image,
      })),
    [items],
  )

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    setError('')

    if (!form.customerName || !form.phone || !form.email || !form.address) {
      setError('Please complete all required checkout fields.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: orderItems,
          deliveryFeeBirr,
          submissionId: crypto.randomUUID(),
        }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Failed to place order.')
      clear()
      setSuccessOrderId(payload.orderId)
      setForm(initialForm)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order.')
    } finally {
      setSubmitting(false)
    }
  }

  if (successOrderId) {
    return (
      <div className="mx-auto max-w-2xl px-5 pb-10 pt-32 text-center lg:px-8">
        <div className="rounded-3xl border border-emerald-300 bg-emerald-50 px-6 py-12 shadow-luxury">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-600 text-white">
            <CheckCircle2 className="size-8" />
          </div>
          <h2 className="mt-6 font-serif text-3xl text-emerald-950">
            Thank you for placing your order!
          </h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-emerald-900/80">
            We have received your order successfully. Our team will contact you shortly to confirm your order.
          </p>
          <div className="mx-auto mt-6 max-w-xs rounded-2xl border border-emerald-200 bg-white/70 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Order ID</p>
            <p className="mt-1 font-serif text-2xl text-emerald-950">{successOrderId}</p>
          </div>
          <Button asChild className="mt-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 pb-10 pt-32 text-center lg:px-8">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <ShoppingBag className="size-7" />
        </div>
        <h2 className="mt-6 font-serif text-2xl text-foreground">Your cart is empty.</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Browse our handcrafted Ethiopian collections.
        </p>
        <Button asChild className="mt-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/shop">
            Continue Shopping <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-32 lg:grid-cols-[1.45fr_1fr] lg:px-8">
      <div>
        <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
          {items.map((item) => (
            <li key={item.id} className="grid gap-4 p-4 sm:grid-cols-[96px_1fr] sm:p-5">
              <div className="relative size-24 overflow-hidden rounded-lg">
                <Image
                  src={item.image || IMAGE_FALLBACK}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-lg leading-tight text-foreground">{item.name}</h3>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Unit Price:{' '}
                    <span className="font-medium text-foreground">{formatDualPrice(item)}</span>
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex size-9 items-center justify-center text-foreground transition-colors hover:text-primary"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex size-9 items-center justify-center text-foreground transition-colors hover:text-primary"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <p className="text-right font-serif text-base text-primary">
                    {formatBirr(productPriceBirr(item) * item.quantity)}
                    <span className="block text-xs text-muted-foreground">
                      {formatUsd(productPriceUsd(item) * item.quantity)}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between">
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/shop">
              <ArrowRight className="size-4 rotate-180" /> Continue Shopping
            </Link>
          </Button>
          <button
            type="button"
            onClick={clear}
            className="text-sm text-muted-foreground transition-colors hover:text-destructive"
          >
            Clear cart
          </button>
        </div>
      </div>

      <aside className="h-fit space-y-6">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-luxury">
          <h2 className="font-serif text-xl text-foreground">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="text-right font-medium text-foreground">
                {formatBirr(subtotalBirr)}
                <span className="block text-xs text-muted-foreground">{formatUsd(subtotalUsd)}</span>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery Fee</dt>
              <dd className="font-medium text-foreground">
                {deliveryFeeBirr ? formatBirr(deliveryFeeBirr) : 'Free'}
              </dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <dt className="font-serif text-base text-foreground">Grand Total</dt>
              <dd className="text-right font-serif text-xl text-primary">
                {formatBirr(totalBirr)}
                <span className="block text-xs font-sans text-muted-foreground">
                  {formatUsd(totalUsd)} before local delivery conversion
                </span>
              </dd>
            </div>
          </dl>
          <p className="mt-4 rounded-lg bg-secondary/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
            Delivery is {formatBirr(300)} and becomes free when your cart is over {formatBirr(7000)}.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-luxury">
          <h2 className="font-serif text-xl text-foreground">Checkout</h2>
          <form onSubmit={submitOrder} className="mt-5 space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name *</label>
              <input
                required
                value={form.customerName}
                onChange={(event) => setForm({ ...form, customerName: event.target.value })}
                className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone Number *</label>
              <input
                required
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Delivery Address *</label>
              <textarea
                required
                rows={3}
                value={form.address}
                onChange={(event) => setForm({ ...form, address: event.target.value })}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Optional Notes</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(event) => setForm({ ...form, notes: event.target.value })}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
            </div>
            {error && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        </section>
      </aside>
    </div>
  )
}
