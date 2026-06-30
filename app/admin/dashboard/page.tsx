import Link from 'next/link'
import { Box, ClipboardList, GalleryHorizontalEnd, ImageIcon, Package, ReceiptText, Wallet } from 'lucide-react'
import { AdminRevenueChart } from '@/components/admin-revenue-chart'
import { getDashboardStats } from '@/lib/sanity'
import { formatBirr, formatUsd } from '@/lib/pricing'

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()
  const cards = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, href: '/admin/products' },
    { label: 'Total Categories', value: stats.totalCategories, icon: Box, href: '/admin/categories' },
    { label: 'Gallery Images', value: stats.galleryImages, icon: GalleryHorizontalEnd, href: '/admin/gallery' },
    { label: 'Website Images', value: stats.websiteImages, icon: ImageIcon, href: '/admin/content' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ReceiptText, href: '/admin/orders' },
    { label: 'Custom Orders', value: stats.totalCustomOrders, icon: ClipboardList, href: '/admin/custom-orders' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Overview</p>
        <h1 className="mt-2 font-serif text-3xl text-foreground">Dashboard</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury transition-all hover:-translate-y-0.5 hover:shadow-luxury-hover"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="mt-2 font-serif text-3xl text-foreground">{card.value}</p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-full bg-accent/15 text-accent">
                <card.icon className="size-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <AdminRevenueChart monthly={stats.monthlyRevenue} yearly={stats.yearlyRevenue} />

        <section className="space-y-4">
          <div className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Wallet className="size-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="font-serif text-2xl text-primary">{formatBirr(stats.orderRevenueBirr)}</p>
                <p className="text-xs text-muted-foreground">{formatUsd(stats.orderRevenueUsd)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
            <h2 className="font-serif text-xl">Order Status</h2>
            <div className="mt-4 space-y-3">
              {stats.statusCounts.map((item) => (
                <div key={item.status} className="flex items-center justify-between rounded-lg bg-background/60 px-4 py-3">
                  <span className="text-sm text-muted-foreground">{item.status}</span>
                  <span className="font-serif text-xl text-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
