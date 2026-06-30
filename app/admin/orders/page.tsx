import { deleteOrderAction, updateOrderStatusAction } from '@/app/admin/actions'
import { AdminAutoFilters } from '@/components/admin-auto-filters'
import { AdminOrdersTable } from '@/components/admin-orders-table'
import { getOrders, type OrderStatus } from '@/lib/sanity'

const statuses: OrderStatus[] = ['Pending', 'Confirmed', 'Completed', 'Cancelled']

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
      if (sort === 'total-desc') return b.totalBirr - a.totalBirr
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Commerce</p>
        <h1 className="mt-2 font-serif text-3xl">Orders</h1>
      </div>

      <AdminAutoFilters
        query={params.q ?? ''}
        searchPlaceholder="Search orders..."
        status={status}
        statuses={statuses}
        sort={sort}
        sortOptions={[
          { value: 'newest', label: 'Newest' },
          { value: 'oldest', label: 'Oldest' },
          { value: 'total-desc', label: 'Highest Total' },
        ]}
      />

      <AdminOrdersTable
        orders={filtered}
        statuses={statuses}
        updateStatusAction={updateOrderStatusAction}
        deleteOrderAction={deleteOrderAction}
      />
    </div>
  )
}
