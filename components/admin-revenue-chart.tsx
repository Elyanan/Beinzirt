'use client'

import { useMemo, useState } from 'react'
import { formatBirr, formatUsd } from '@/lib/pricing'

type RevenuePoint = {
  label: string
  totalBirr: number
  totalUsd: number
}

export function AdminRevenueChart({
  monthly,
  yearly,
}: {
  monthly: RevenuePoint[]
  yearly: RevenuePoint[]
}) {
  const [mode, setMode] = useState<'monthly' | 'yearly'>('monthly')
  const points = mode === 'monthly' ? monthly : yearly
  const max = useMemo(() => Math.max(1, ...points.map((point) => point.totalBirr)), [points])

  return (
    <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl">Revenue Overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">Monthly and yearly order revenue.</p>
        </div>
        <div className="inline-flex rounded-full border border-border bg-background p-1">
          {(['monthly', 'yearly'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors',
                mode === item ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex h-64 items-end gap-2 overflow-x-auto pb-2">
        {points.map((point) => (
          <div key={point.label} className="flex min-w-12 flex-1 flex-col items-center gap-2">
            <div className="flex h-48 w-full items-end rounded-t-lg bg-secondary/70 px-1">
              <div
                className="w-full rounded-t-lg bg-primary transition-all duration-500"
                style={{ height: `${Math.max(4, (point.totalBirr / max) * 100)}%` }}
                title={`${point.label}: ${formatBirr(point.totalBirr)} / ${formatUsd(point.totalUsd)}`}
              />
            </div>
            <span className="text-xs text-muted-foreground">{point.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
