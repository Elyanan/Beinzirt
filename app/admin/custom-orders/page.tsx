import { Trash2 } from 'lucide-react'
import {
  deleteCustomOrderAction,
  updateCustomOrderStatusAction,
} from '@/app/admin/actions'
import { ConfirmActionForm } from '@/components/confirm-action-form'
import { getCustomOrders, type CustomOrderStatus } from '@/lib/sanity'

const statuses: CustomOrderStatus[] = ['Pending', 'Confirmed', 'Delivered']

export default async function AdminCustomOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; sort?: string }>
}) {
  const params = await searchParams
  const customOrders = await getCustomOrders()
  const query = (params.q ?? '').toLowerCase()
  const status = params.status ?? 'All'
  const sort = params.sort ?? 'newest'

  const filtered = customOrders
    .filter((order) => {
      const matchesQuery =
        !query ||
        order.requestId.toLowerCase().includes(query) ||
        order.name.toLowerCase().includes(query) ||
        order.phone.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query) ||
        order.productType.toLowerCase().includes(query)
      const matchesStatus = status === 'All' || order.status === status
      return matchesQuery && matchesStatus
    })
    .sort((a, b) => {
      if (sort === 'oldest') return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Bespoke</p>
        <h1 className="mt-2 font-serif text-3xl">Custom Orders</h1>
      </div>

      <form className="grid gap-3 rounded-xl border border-border/80 bg-card p-4 shadow-luxury lg:grid-cols-[1fr_180px_180px_auto]">
        <input
          name="q"
          defaultValue={params.q ?? ''}
          placeholder="Search custom orders..."
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
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Request ID</p>
                <h2 className="mt-1 font-serif text-xl">{order.requestId}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {new Date(order.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <p><span className="text-muted-foreground">Customer:</span> {order.name}</p>
                <p><span className="text-muted-foreground">Phone:</span> {order.phone}</p>
                <p><span className="text-muted-foreground">Email:</span> {order.email}</p>
                <p><span className="text-muted-foreground">Product:</span> {order.productType}</p>
                {order.occasion ? <p><span className="text-muted-foreground">Occasion:</span> {order.occasion}</p> : null}
                {order.deadline ? <p><span className="text-muted-foreground">Deadline:</span> {order.deadline}</p> : null}
              </div>
              <div className="flex flex-wrap items-start gap-2 xl:justify-end">
                <form action={updateCustomOrderStatusAction} className="flex gap-2">
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
                <ConfirmActionForm
                  action={deleteCustomOrderAction}
                  id={order.id}
                  message={`Delete custom order ${order.requestId}? This cannot be undone.`}
                >
                  <button
                    type="submit"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border text-destructive hover:bg-destructive/10"
                    aria-label={`Delete ${order.requestId}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </ConfirmActionForm>
              </div>
            </div>
            <div className="mt-5 rounded-lg border border-border bg-background/60 p-4 text-sm">
              <div className="grid gap-2 sm:grid-cols-2">
                {order.colors ? <p><span className="text-muted-foreground">Colors:</span> {order.colors}</p> : null}
                {order.size ? <p><span className="text-muted-foreground">Size:</span> {order.size}</p> : null}
              </div>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                <span className="text-foreground">Message:</span> {order.message}
              </p>
            </div>
          </article>
        ))}
        {!filtered.length && (
          <div className="rounded-xl border border-border/80 bg-card p-10 text-center text-muted-foreground shadow-luxury">
            No custom orders found.
          </div>
        )}
      </div>
    </div>
  )
}
