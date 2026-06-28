import Link from 'next/link'
import { Box, GalleryHorizontalEnd, ImageIcon, Package, ReceiptText } from 'lucide-react'
import { getDashboardStats } from '@/lib/sanity'

function money(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()
  const cards = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, href: '/admin/products' },
    { label: 'Total Categories', value: stats.totalCategories, icon: Box, href: '/admin/categories' },
    { label: 'Gallery Images', value: stats.galleryImages, icon: GalleryHorizontalEnd, href: '/admin/gallery' },
    { label: 'Website Images', value: stats.websiteImages, icon: ImageIcon, href: '/admin/content' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ReceiptText, href: '/admin/orders' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Overview</p>
        <h1 className="mt-2 font-serif text-3xl text-foreground">Dashboard</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
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

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-xl">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-medium text-accent hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="border-b border-border py-3">Order</th>
                  <th className="border-b border-border py-3">Customer</th>
                  <th className="border-b border-border py-3">Status</th>
                  <th className="border-b border-border py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.length ? (
                  stats.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/60 last:border-0">
                      <td className="py-3 font-medium">{order.orderId}</td>
                      <td className="py-3 text-muted-foreground">{order.customerName}</td>
                      <td className="py-3">
                        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-medium">{money(order.total)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-xl">Recently Added Products</h2>
            <Link href="/admin/products/new" className="text-sm font-medium text-accent hover:underline">
              Add product
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {stats.recentProducts.length ? (
              stats.recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border/70 bg-background/60 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {product.category || 'Uncategorized'}
                    </p>
                  </div>
                  <p className="font-serif text-lg text-primary">{money(product.price)}</p>
                </div>
              ))
            ) : (
              <p className="rounded-lg border border-border/70 bg-background/60 px-4 py-8 text-center text-sm text-muted-foreground">
                No products yet.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
