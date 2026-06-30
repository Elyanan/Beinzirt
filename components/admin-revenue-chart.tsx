'use client'

import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatBirr, formatUsd } from '@/lib/pricing'

type RevenuePoint = {
  label: string
  totalBirr: number
  totalUsd: number
  orderCount: number
}

function ChartTooltip({
  active,
  payload,
  mode,
}: {
  active?: boolean
  payload?: { payload: RevenuePoint }[]
  mode: 'monthly' | 'yearly'
}) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload

  return (
    <div className="rounded-xl border border-border/80 bg-card/95 px-4 py-3 shadow-luxury backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        {mode === 'monthly' ? point.label : point.label}
      </p>
      <p className="mt-2 font-serif text-lg text-primary">{formatBirr(point.totalBirr)}</p>
      <p className="text-xs text-muted-foreground">{formatUsd(point.totalUsd)}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {point.orderCount} {point.orderCount === 1 ? 'order' : 'orders'}
      </p>
    </div>
  )
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
  const maxRevenue = useMemo(() => Math.max(1, ...points.map((point) => point.totalBirr)), [points])
  const totalOrders = useMemo(() => points.reduce((sum, point) => sum + point.orderCount, 0), [points])
  const totalRevenue = useMemo(() => points.reduce((sum, point) => sum + point.totalBirr, 0), [points])

  return (
    <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl">Revenue Overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Completed orders only — hover for details.
          </p>
        </div>
        <div className="inline-flex rounded-full border border-border bg-background p-1">
          {(['monthly', 'yearly'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-all duration-300',
                mode === item
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="rounded-lg bg-secondary/60 px-4 py-2">
          <span className="text-muted-foreground">Period total: </span>
          <span className="font-medium text-foreground">{formatBirr(totalRevenue)}</span>
        </div>
        <div className="rounded-lg bg-secondary/60 px-4 py-2">
          <span className="text-muted-foreground">Orders: </span>
          <span className="font-medium text-foreground">{totalOrders}</span>
        </div>
      </div>

      <div className="mt-6 h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          {mode === 'monthly' ? (
            <AreaChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.12 75)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="oklch(0.55 0.12 75)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.02 90)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: 'oklch(0.55 0.02 55)', fontSize: 11 }}
                axisLine={{ stroke: 'oklch(0.88 0.02 90)' }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: 'oklch(0.55 0.02 55)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                domain={[0, maxRevenue * 1.1]}
              />
              <Tooltip content={<ChartTooltip mode={mode} />} cursor={{ stroke: 'oklch(0.55 0.12 75)', strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="totalBirr"
                stroke="oklch(0.45 0.1 55)"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
                animationDuration={800}
                animationEasing="ease-out"
                activeDot={{ r: 6, fill: 'oklch(0.55 0.12 75)', stroke: 'oklch(0.97 0.014 92)', strokeWidth: 2 }}
              />
            </AreaChart>
          ) : (
            <BarChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.02 90)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: 'oklch(0.55 0.02 55)', fontSize: 12 }}
                axisLine={{ stroke: 'oklch(0.88 0.02 90)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'oklch(0.55 0.02 55)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                domain={[0, maxRevenue * 1.1]}
              />
              <Tooltip content={<ChartTooltip mode={mode} />} cursor={{ fill: 'oklch(0.55 0.12 75 / 0.08)' }} />
              <Bar
                dataKey="totalBirr"
                fill="oklch(0.45 0.1 55)"
                radius={[8, 8, 0, 0]}
                animationDuration={800}
                animationEasing="ease-out"
                maxBarSize={56}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary" />
          Revenue (ETB)
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-accent" />
          Completed orders
        </span>
      </div>
    </section>
  )
}
