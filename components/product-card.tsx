'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Eye, Plus, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import type { Product } from '@/lib/data'
import { IMAGE_FALLBACK } from '@/lib/images'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [open, setOpen] = useState(false)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
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
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-4 items-center gap-1.5 rounded-full bg-background px-4 py-2 text-xs font-medium text-foreground opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Eye className="size-3.5" /> Quick View
          </button>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-serif text-lg leading-tight text-foreground">{product.name}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-serif text-xl text-primary">${product.price}</span>
            <Button
              size="sm"
              onClick={handleAdd}
              className="rounded-full bg-primary px-3.5 text-primary-foreground hover:bg-primary/90"
            >
              {added ? (
                <>
                  <Check className="size-3.5" /> Added
                </>
              ) : (
                <>
                  <Plus className="size-3.5" /> Add
                </>
              )}
            </Button>
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
              aria-label="Close"
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
              <h2 className="font-serif text-2xl text-foreground">{product.name}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <p className="font-serif text-3xl text-primary">${product.price}</p>
              <p className="text-xs text-muted-foreground">
                Handwoven to order · Free worldwide shipping over $300
              </p>
              <Button
                onClick={handleAdd}
                size="lg"
                className="mt-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {added ? 'Added to Cart' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
