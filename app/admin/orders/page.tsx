import { Trash2 } from 'lucide-react'
import { deleteOrderAction, updateOrderStatusAction } from '@/app/admin/actions'
import { getOrders, type OrderStatus } from '@/lib/sanity'

const statuses: OrderStatus[] = ['Pending', 'Confirmed', 'Completed', 'Cancelled']

function money(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; sort?: string }>
}) {
  const params = await searchParams
  const orders = await getOrders()
  const query = (params.q ?? '').toLowerCase()
  const status = params.status ?? 'All'
  const sort = params.sort ?? 'newest'

  const filtered = orders
    .filter((order) => {
      const matchesQuery =
        !query ||
        order.orderId.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query) ||
        order.phone.toLowerCase().includes(query)
      const matchesStatus = status === 'All' || order.status === status
      return matchesQuery && matchesStatus
    })
    .sort((a, b) => {
      if (sort === 'oldest') return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      if (sort === 'total-desc') return b.total - a.total
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Commerce</p>
        <h1 className="mt-2 font-serif text-3xl">Orders</h1>
      </div>

      <form className="grid gap-3 rounded-xl border border-border/80 bg-card p-4 shadow-luxury lg:grid-cols-[1fr_180px_180px_auto]">
        <input
          name="q"
          defaultValue={params.q ?? ''}
          placeholder="Search orders..."
          className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
        <select
          name="status"
          defaultValue={status}
          className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        >
          <option>All</option>
          {statuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select
          name="sort"
          defaultValue={sort}
          className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="total-desc">Highest Total</option>
        </select>
        <button
          type="submit"
          className="rounded-full border border-border px-5 text-sm font-medium hover:bg-muted"
        >
          Filter
        </button>
      </form>

      <div className="space-y-4">
        {filtered.map((order) => (
          <article key={order.id} className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
            <div className="grid gap-4 xl:grid-cols-[1fr_1fr_auto]">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Order ID</p>
                <h2 className="mt-1 font-serif text-xl">{order.orderId}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {new Date(order.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <p><span className="text-muted-foreground">Customer:</span> {order.customerName}</p>
                <p><span className="text-muted-foreground">Phone:</span> {order.phone}</p>
                <p><span className="text-muted-foreground">Email:</span> {order.email}</p>
                <p><span className="text-muted-foreground">Total:</span> {money(order.total)}</p>
              </div>
              <div className="flex flex-wrap items-start gap-2 xl:justify-end">
                <form action={updateOrderStatusAction} className="flex gap-2">
                  <input type="hidden" name="id" value={order.id} />
                  <select
                    name="status"
                    defaultValue={order.status}
                    className="h-10 rounded-full border border-border bg-background px-3 text-sm"
                  >
                    {statuses.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Update
                  </button>
                </form>
                <form action={deleteOrderAction}>
                  <input type="hidden" name="id" value={order.id} />
                  <button
                    type="submit"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border text-destructive hover:bg-destructive/10"
                    aria-label={`Delete ${order.orderId}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-secondary/70 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2">Product</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Qty</th>
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={`${order.id}-${item.productId}-${index}`} className="border-t border-border">
                      <td className="px-3 py-2">{item.name}</td>
                      <td className="px-3 py-2 text-muted-foreground">{item.category}</td>
                      <td className="px-3 py-2">{item.quantity}</td>
                      <td className="px-3 py-2">{money(item.price)}</td>
                      <td className="px-3 py-2 text-right">{money(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {order.address && (
              <p className="mt-4 text-sm text-muted-foreground">
                Delivery Address: <span className="text-foreground">{order.address}</span>
              </p>
            )}
            {order.notes && (
              <p className="mt-2 text-sm text-muted-foreground">
                Notes: <span className="text-foreground">{order.notes}</span>
              </p>
            )}
          </article>
        ))}
        {!filtered.length && (
          <div className="rounded-xl border border-border/80 bg-card p-10 text-center text-muted-foreground shadow-luxury">
            No orders found.
          </div>
        )}
      </div>
    </div>
  )
}
