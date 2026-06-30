import {
  deleteCustomOrderAction,
  updateCustomOrderStatusAction,
} from '@/app/admin/actions'
import { AdminAutoFilters } from '@/components/admin-auto-filters'
import { AdminCustomOrdersTable } from '@/components/admin-custom-orders-table'
import { getCustomOrders, type CustomOrderStatus } from '@/lib/sanity'

const statuses: CustomOrderStatus[] = ['Pending', 'Confirmed', 'Completed', 'Cancelled']

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

      <AdminAutoFilters
        query={params.q ?? ''}
        searchPlaceholder="Search custom orders..."
        status={status}
        statuses={statuses}
        sort={sort}
        sortOptions={[
          { value: 'newest', label: 'Newest' },
          { value: 'oldest', label: 'Oldest' },
        ]}
      />

      <AdminCustomOrdersTable
        orders={filtered}
        statuses={statuses}
        updateStatusAction={updateCustomOrderStatusAction}
        deleteCustomOrderAction={deleteCustomOrderAction}
      />
    </div>
  )
}
