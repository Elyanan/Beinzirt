'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { CmsCategory } from '@/lib/sanity'

export function AdminProductCategoryFilter({
  categories,
  category,
}: {
  categories: CmsCategory[]
  category: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'All') {
      params.delete('category')
    } else {
      params.set('category', value)
    }
    const query = params.toString()
    router.push(query ? `/admin/products?${query}` : '/admin/products')
  }

  return (
    <select
      value={category}
      onChange={(event) => handleChange(event.target.value)}
      className="h-10 min-w-[160px] rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
      aria-label="Filter by category"
    >
      <option value="All">All categories</option>
      {categories.map((item) => (
        <option key={item.id} value={item.title}>
          {item.title}
        </option>
      ))}
    </select>
  )
}
