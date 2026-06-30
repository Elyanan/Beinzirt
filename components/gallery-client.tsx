'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { GalleryItem } from '@/lib/data'
import { Reveal } from '@/components/reveal'

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  return (
    <Reveal delay={(index % 6) * 80}>
      <article
        className={cn(
          'group relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury-hover',
          item.tall ? 'row-span-2' : '',
        )}
      >
        <div className={cn('relative overflow-hidden', item.tall ? 'aspect-[3/4]' : 'aspect-[4/5]')}>
          <Image
            src={item.image}
            alt={item.alt ?? item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 translate-y-full p-5 transition-transform duration-500 group-hover:translate-y-0">
            <span className="text-[0.65rem] font-medium uppercase tracking-wider text-accent">
              {item.category}
            </span>
            <h3 className="mt-1 font-serif text-lg text-primary-foreground">{item.title}</h3>
            <p className="mt-1 text-sm text-primary-foreground/80">{item.caption}</p>
          </div>
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-foreground backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
            {item.category}
          </span>
        </div>
      </article>
    </Reveal>
  )
}

export function GalleryClient({ items, filters }: { items: GalleryItem[]; filters: string[] }) {
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All'
      ? items
      : items.filter((item) => item.filter === active)

  return (
    <>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-5 lg:px-8">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
              active === filter
                ? 'border-accent bg-accent text-accent-foreground shadow-sm'
                : 'border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground',
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {filtered.length ? (
        <div className="mx-auto mt-10 grid max-w-7xl auto-rows-min grid-cols-1 gap-4 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {filtered.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-border bg-card px-6 py-10 text-center shadow-luxury">
          <h2 className="font-serif text-2xl text-foreground">No gallery images yet</h2>
          <p className="mt-3 text-muted-foreground">
            This gallery filter is ready for new images from the admin dashboard.
          </p>
        </div>
      )}
    </>
  )
}
