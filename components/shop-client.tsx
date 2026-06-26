'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { products, categories } from '@/lib/data'
import { cn } from '@/lib/utils'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A–Z' },
] as const

export function ShopClient() {
  const [active, setActive] = useState<string>('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<string>('featured')

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = active === 'All' || p.category === active
      const matchQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchQuery
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [active, query, sort])

  return (
    <section className="px-5 pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Controls */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the collection..."
              className="h-11 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-muted-foreground">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 rounded-full border border-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
                active === cat
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground/70 hover:border-accent hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-muted-foreground">
            No pieces match your search. Try a different category or keyword.
          </p>
        )}
      </div>
    </section>
  )
}
