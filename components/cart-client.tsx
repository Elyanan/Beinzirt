'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import { IMAGE_FALLBACK } from '@/lib/images'

export function CartClient() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart()
  const [placed, setPlaced] = useState(false)

  const shipping = subtotal > 300 || subtotal === 0 ? 0 : 25
  const total = subtotal + shipping

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-5 py-10 text-center lg:px-8">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShoppingBag className="size-7" />
        </div>
        <h2 className="mt-6 font-serif text-2xl text-foreground">Thank you for your order!</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Your handmade pieces are now being prepared. Our team will reach out
          shortly to confirm details and delivery.
        </p>
        <Button asChild className="mt-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-10 text-center lg:px-8">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <ShoppingBag className="size-7" />
        </div>
        <h2 className="mt-6 font-serif text-2xl text-foreground">Your cart is empty</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Discover our handwoven collection and add your favorite pieces.
        </p>
        <Button asChild className="mt-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/shop">
            Explore Collection <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 lg:grid-cols-[1.6fr_1fr] lg:px-8">
      {/* Items */}
      <div>
        <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 p-4 sm:p-5">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.image || IMAGE_FALLBACK}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
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
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex size-8 items-center justify-center text-foreground transition-colors hover:text-primary"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex size-8 items-center justify-center text-foreground transition-colors hover:text-primary"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <span className="font-serif text-lg text-primary">
                    ${item.price * item.quantity}
                  </span>
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

      {/* Summary */}
      <aside className="h-fit rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-xl text-foreground">Order Summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-medium text-foreground">${subtotal}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="font-medium text-foreground">
              {shipping === 0 ? 'Free' : `$${shipping}`}
            </dd>
          </div>
          <div className="flex justify-between border-t border-border pt-3">
            <dt className="font-serif text-base text-foreground">Total</dt>
            <dd className="font-serif text-xl text-primary">${total}</dd>
          </div>
        </dl>
        <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-secondary/70 p-3 text-xs leading-relaxed text-muted-foreground">
          <Truck className="mt-0.5 size-4 shrink-0 text-accent" />
          <span>
            Handwoven to order — please allow 2–3 weeks for crafting. Free
            worldwide shipping on orders over $300.
          </span>
        </div>
        <Button
          onClick={() => setPlaced(true)}
          size="lg"
          className="mt-6 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Proceed to Checkout
        </Button>
      </aside>
    </div>
  )
}
