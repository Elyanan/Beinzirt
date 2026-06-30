'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { useTranslation } from '@/components/language-provider'
import type { ProductAdmin, CmsCategory } from '@/lib/sanity'
import { cn } from '@/lib/utils'

const sortOptions = [
  { value: 'best-seller', key: 'shop.sortBestSeller' },
  { value: 'newest', key: 'shop.sortNewest' },
  { value: 'az', key: 'shop.sortAz' },
  { value: 'za', key: 'shop.sortZa' },
] as const

export function ShopClient({
  products,
  categories,
}: {
  products: ProductAdmin[]
  categories: CmsCategory[]
}) {
  const { t } = useTranslation()
  const [active, setActive] = useState<string>('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<string>('best-seller')

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      const matchCat = active === 'All' || product.category === active
      const matchQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchQuery
    })

    if (sort === 'best-seller') {
      list = [...list].sort(
        (a, b) => Number(b.bestSeller ?? b.featured) - Number(a.bestSeller ?? a.featured),
      )
    }
    if (sort === 'newest') {
      list = [...list].sort(
        (a, b) =>
          new Date(b.createdAt ?? b.updatedAt ?? 0).getTime() -
          new Date(a.createdAt ?? a.updatedAt ?? 0).getTime(),
      )
    }
    if (sort === 'az') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'za') list = [...list].sort((a, b) => b.name.localeCompare(a.name))
    return list
  }, [active, products, query, sort])

  const categoryFilters = useMemo(
    () => [
      { value: 'All', label: t('shop.all') },
      ...categories.map((category) => ({ value: category.title, label: category.title })),
    ],
    [categories, t],
  )

  return (
    <section className="px-5 pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('shop.searchPlaceholder')}
              aria-label={t('shop.searchPlaceholder')}
              className="h-11 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-muted-foreground">
              {t('shop.sortBy')}
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-11 rounded-full border border-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.key)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categoryFilters.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => setActive(category.value)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
                active === category.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground/70 hover:border-accent hover:text-foreground',
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-16 max-w-lg rounded-2xl border border-border bg-card px-6 py-10 text-center shadow-luxury">
            <h2 className="font-serif text-2xl text-foreground">{t('shop.emptyTitle')}</h2>
            <p className="mt-3 text-muted-foreground">{t('shop.emptyText')}</p>
          </div>
        )}
      </div>
    </section>
  )
}
