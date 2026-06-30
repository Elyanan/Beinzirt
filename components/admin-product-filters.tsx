'use client'

import { useRef } from 'react'
import type { CmsCategory } from '@/lib/sanity'

export function AdminProductFilters({
  categories,
  query,
  category,
}: {
  categories: CmsCategory[]
  query: string
  category: string
}) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      className="grid gap-3 rounded-xl border border-border/80 bg-card p-4 shadow-luxury sm:grid-cols-[1fr_220px_auto]"
    >
      <input
        name="q"
        defaultValue={query}
        placeholder="Search products..."
        className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
      <select
        name="category"
        defaultValue={category}
        onChange={() => formRef.current?.requestSubmit()}
        className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
      >
        <option>All</option>
        {categories.map((item) => (
          <option key={item.id}>{item.title}</option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-full border border-border px-5 text-sm font-medium hover:bg-muted"
      >
        Search
      </button>
    </form>
  )
}
