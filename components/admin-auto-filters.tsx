'use client'

import { useRef } from 'react'

type FilterOption = {
  value: string
  label: string
}

export function AdminAutoFilters({
  query,
  searchPlaceholder,
  status,
  statuses,
  sort,
  sortOptions,
}: {
  query: string
  searchPlaceholder: string
  status: string
  statuses: string[]
  sort: string
  sortOptions: FilterOption[]
}) {
  const formRef = useRef<HTMLFormElement>(null)

  function submitFilters() {
    formRef.current?.requestSubmit()
  }

  return (
    <form
      ref={formRef}
      className="grid gap-3 rounded-xl border border-border/80 bg-card p-4 shadow-luxury lg:grid-cols-[1fr_180px_180px]"
    >
      <input
        name="q"
        defaultValue={query}
        placeholder={searchPlaceholder}
        className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
      <select
        name="status"
        defaultValue={status}
        onChange={submitFilters}
        className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        aria-label="Filter by status"
      >
        <option>All</option>
        {statuses.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select
        name="sort"
        defaultValue={sort}
        onChange={submitFilters}
        className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        aria-label="Sort orders"
      >
        {sortOptions.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <button type="submit" className="sr-only">
        Search
      </button>
    </form>
  )
}
