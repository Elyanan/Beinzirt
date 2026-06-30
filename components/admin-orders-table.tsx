'use client'

import { Fragment, useState } from 'react'
import { ChevronDown, Trash2 } from 'lucide-react'
import { ConfirmActionForm } from '@/components/confirm-action-form'
import { PendingSubmitButton } from '@/components/pending-submit-button'
import { formatAdminDate, formatAdminDateTime } from '@/lib/format-date'
import { cn } from '@/lib/utils'
import { formatBirr, formatUsd } from '@/lib/pricing'
import type { CustomerOrder, OrderStatus } from '@/lib/sanity'

type ServerAction = (formData: FormData) => void | Promise<void>

function statusClass(status: string) {
  if (status === 'Completed') return 'border-emerald-200 bg-emerald-50 text-emerald-800'
  if (status === 'Confirmed') return 'border-blue-200 bg-blue-50 text-blue-800'
  if (status === 'Cancelled') return 'border-red-200 bg-red-50 text-red-800'
  return 'border-amber-200 bg-amber-50 text-amber-800'
}

export function AdminOrdersTable({
  orders,
  statuses,
  updateStatusAction,
  deleteOrderAction,
}: {
  orders: CustomerOrder[]
  statuses: OrderStatus[]
  updateStatusAction: ServerAction
  deleteOrderAction: ServerAction
}) {
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(
    () => new Set(orders.map((order) => order.id)),
  )

  if (!orders.length) {
    return (
      <div className="rounded-xl border border-border/80 bg-card p-10 text-center text-muted-foreground shadow-luxury">
        No orders found.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-luxury">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm sm:min-w-[820px]">
          <thead className="bg-secondary/70 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const expanded = !collapsedIds.has(order.id)

              return (
                <Fragment key={order.id}>
                  <tr
                    role="button"
                    tabIndex={0}
                    aria-expanded={expanded}
                    onClick={() =>
                      setCollapsedIds((current) => {
                        const next = new Set(current)
                        if (next.has(order.id)) next.delete(order.id)
                        else next.add(order.id)
                        return next
                      })
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setCollapsedIds((current) => {
                          const next = new Set(current)
                          if (next.has(order.id)) next.delete(order.id)
                          else next.add(order.id)
                          return next
                        })
                      }
                    }}
                    className="cursor-pointer border-t border-border/70 transition-colors hover:bg-muted/45 focus-visible:bg-muted/60 focus-visible:outline-none"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{order.orderId}</td>
                    <td className="px-4 py-3">
                      <span className="block font-medium text-foreground">{order.customerName}</span>
                      <span className="text-xs text-muted-foreground">{order.phone}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatAdminDate(order.timestamp)}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {formatBirr(order.totalBirr)}
                      <span className="block text-xs text-muted-foreground">{formatUsd(order.totalUsd)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('rounded-full border px-2.5 py-1 text-xs font-semibold', statusClass(order.status))}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ChevronDown
                        className={cn('ml-auto size-4 text-muted-foreground transition-transform', expanded && 'rotate-180')}
                      />
                    </td>
                  </tr>

                  {expanded ? (
                    <tr className="border-t border-border/70 bg-background/50">
                      <td colSpan={6} className="px-4 py-5">
                        <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
                          <div className="space-y-4">
                            <div className="grid gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-2">
                              <p><span className="text-muted-foreground">Name:</span> {order.customerName}</p>
                              <p><span className="text-muted-foreground">Phone:</span> {order.phone}</p>
                              <p><span className="text-muted-foreground">Email:</span> {order.email}</p>
                              <p><span className="text-muted-foreground">Date:</span> {formatAdminDateTime(order.timestamp)}</p>
                              <p className="sm:col-span-2"><span className="text-muted-foreground">Delivery:</span> {order.address}</p>
                              {order.notes ? (
                                <p className="sm:col-span-2"><span className="text-muted-foreground">Notes:</span> {order.notes}</p>
                              ) : null}
                            </div>

                            <div className="overflow-x-auto rounded-lg border border-border bg-card">
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
                                      <td className="px-3 py-2">
                                        {formatBirr(item.priceBirr)}
                                        <span className="block text-xs text-muted-foreground">{formatUsd(item.priceUsd)}</span>
                                      </td>
                                      <td className="px-3 py-2 text-right">
                                        {formatBirr(item.subtotalBirr)}
                                        <span className="block text-xs text-muted-foreground">{formatUsd(item.subtotalUsd)}</span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="space-y-4 rounded-lg border border-border bg-card p-4">
                            <dl className="space-y-2 text-sm">
                              <div className="flex justify-between gap-3">
                                <dt className="text-muted-foreground">Subtotal</dt>
                                <dd className="text-right font-medium">{formatBirr(order.subtotalBirr)}</dd>
                              </div>
                              <div className="flex justify-between gap-3">
                                <dt className="text-muted-foreground">Delivery</dt>
                                <dd className="text-right font-medium">
                                  {order.deliveryFeeBirr ? formatBirr(order.deliveryFeeBirr) : 'Free'}
                                </dd>
                              </div>
                              <div className="flex justify-between gap-3 border-t border-border pt-3">
                                <dt className="font-serif text-base">Grand Total</dt>
                                <dd className="text-right font-serif text-lg text-primary">
                                  {formatBirr(order.totalBirr)}
                                  <span className="block text-xs font-sans text-muted-foreground">
                                    {formatUsd(order.totalUsd)}
                                  </span>
                                </dd>
                              </div>
                            </dl>
                            <form action={updateStatusAction} className="flex gap-2">
                              <input type="hidden" name="id" value={order.id} />
                              <select
                                name="status"
                                defaultValue={order.status}
                                className="h-10 min-w-0 flex-1 rounded-full border border-border bg-background px-3 text-sm"
                              >
                                {statuses.map((item) => (
                                  <option key={item}>{item}</option>
                                ))}
                              </select>
                              <PendingSubmitButton
                                pendingLabel="Updating..."
                                className="rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                              >
                                Update
                              </PendingSubmitButton>
                            </form>
                            <ConfirmActionForm
                              action={deleteOrderAction}
                              id={order.id}
                              message={`Delete order ${order.orderId}? This cannot be undone.`}
                            >
                              <button
                                type="submit"
                                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-border text-sm text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="size-4" />
                                Delete Order
                              </button>
                            </ConfirmActionForm>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
