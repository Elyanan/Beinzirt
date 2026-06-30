'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Eye, Minus, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/components/language-provider'
import { useCart } from '@/components/cart-context'
import type { Product } from '@/lib/data'
import { IMAGE_FALLBACK } from '@/lib/images'
import { formatDualPrice } from '@/lib/pricing'
import { cn } from '@/lib/utils'

export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation()
  const { addItem, updateQuantity, getItemQuantity } = useCart()
  const [open, setOpen] = useState(false)
  const quantity = getItemQuantity(product.id)
  const unavailable = product.availability === false

  function handleAdd() {
    if (unavailable) return
    addItem(product)
  }

  function QuantityControl({ compact = false }: { compact?: boolean }) {
    if (quantity <= 0) {
      return (
        <Button
          size={compact ? 'sm' : 'lg'}
          onClick={handleAdd}
          disabled={unavailable}
          className="rounded-full bg-primary px-3.5 text-primary-foreground hover:bg-primary/90 disabled:bg-foreground/25"
        >
          {unavailable ? t('product.outOfStock') : (
            <>
              <Plus className="size-3.5" /> {t('product.addToCart')}
            </>
          )}
        </Button>
      )
    }

    return (
      <div className="animate-fade-up flex flex-wrap items-center gap-2">
        <div className="flex items-center rounded-full border border-border bg-background shadow-sm">
          <button
            type="button"
            aria-label={t('product.decreaseQty')}
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="flex size-9 items-center justify-center text-foreground transition-colors hover:text-primary"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="min-w-9 text-center text-sm font-semibold">{quantity}</span>
          <button
            type="button"
            aria-label={t('product.increaseQty')}
            onClick={() => updateQuantity(product.id, quantity + 1)}
            disabled={unavailable}
            className="flex size-9 items-center justify-center text-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:text-muted-foreground/50"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
        <Button
          asChild
          size={compact ? 'sm' : 'lg'}
          variant="outline"
          className="rounded-full border-foreground/20 px-3.5"
        >
          <Link href="/cart">{t('product.viewCart')}</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury-hover">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image || IMAGE_FALLBACK}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-foreground backdrop-blur">
            {product.category}
          </span>
          {(product.bestSeller ?? product.featured) && (
            <span className="absolute right-3 top-3 rounded-full border border-[#f4d58a]/45 bg-[#2f281f]/95 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-[#f4d58a] shadow-lg backdrop-blur">
              {t('product.bestSeller')}
            </span>
          )}
          {unavailable && (
            <span
              className={cn(
                'absolute right-3 rounded-full border border-background/25 bg-foreground/85 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-background shadow-lg backdrop-blur',
                (product.bestSeller ?? product.featured) ? 'top-12' : 'top-3',
              )}
            >
              {t('product.outOfStock')}
            </span>
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-4 items-center gap-1.5 rounded-full bg-background px-4 py-2 text-xs font-medium text-foreground opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Eye className="size-3.5" /> {t('product.quickView')}
          </button>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-serif text-lg leading-tight text-foreground">{product.name}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="font-serif text-base text-primary">{formatDualPrice(product)}</span>
            <QuantityControl compact />
          </div>
        </div>
      </article>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
        >
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="animate-fade-up relative grid max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-card shadow-2xl md:grid-cols-2">
            <button
              type="button"
              aria-label={t('common.close')}
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur transition-colors hover:bg-muted"
            >
              <X className="size-4" />
            </button>
            <div className="relative aspect-square md:aspect-auto">
              <Image
                src={product.image || IMAGE_FALLBACK}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {product.category}
              </span>
              {unavailable ? (
                <span className="w-fit rounded-full border border-foreground/15 bg-foreground/85 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-background">
                  {t('product.currentlyUnavailable')}
                </span>
              ) : null}
              <h2 className="font-serif text-2xl text-foreground">{product.name}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <p className="font-serif text-2xl text-primary">{formatDualPrice(product)}</p>
              <p className="text-xs text-muted-foreground">{t('product.handwovenNote')}</p>
              <QuantityControl />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
