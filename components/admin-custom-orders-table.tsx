'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Trash2 } from 'lucide-react'
import { ConfirmActionForm } from '@/components/confirm-action-form'
import { PendingSubmitButton } from '@/components/pending-submit-button'
import { formatAdminDate, formatAdminDateTime } from '@/lib/format-date'
import { cn } from '@/lib/utils'
import type { CustomOrder, CustomOrderStatus } from '@/lib/sanity'

type ServerAction = (formData: FormData) => void | Promise<void>

function statusClass(status: string) {
  if (status === 'Completed') return 'border-emerald-200 bg-emerald-50 text-emerald-800'
  if (status === 'Confirmed') return 'border-blue-200 bg-blue-50 text-blue-800'
  if (status === 'Cancelled') return 'border-red-200 bg-red-50 text-red-800'
  return 'border-amber-200 bg-amber-50 text-amber-800'
}

export function AdminCustomOrdersTable({
  orders,
  statuses,
  updateStatusAction,
  deleteCustomOrderAction,
}: {
  orders: CustomOrder[]
  statuses: CustomOrderStatus[]
  updateStatusAction: ServerAction
  deleteCustomOrderAction: ServerAction
}) {
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(
    () => new Set(orders.map((order) => order.id)),
  )

  if (!orders.length) {
    return (
      <div className="rounded-xl border border-border/80 bg-card p-10 text-center text-muted-foreground shadow-luxury">
        No custom orders found.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-luxury">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm sm:min-w-[820px]">
          <thead className="bg-secondary/70 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Request ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Requested Item</th>
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
                    <td className="px-4 py-3 font-medium text-foreground">{order.requestId}</td>
                    <td className="px-4 py-3">
                      <span className="block font-medium text-foreground">{order.name}</span>
                      <span className="text-xs text-muted-foreground">{order.phone}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatAdminDate(order.timestamp)}
                    </td>
                    <td className="px-4 py-3">{order.productType}</td>
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
                              <p><span className="text-muted-foreground">Name:</span> {order.name}</p>
                              <p><span className="text-muted-foreground">Phone:</span> {order.phone}</p>
                              <p><span className="text-muted-foreground">Email:</span> {order.email}</p>
                              <p><span className="text-muted-foreground">Date:</span> {formatAdminDateTime(order.timestamp)}</p>
                              <p><span className="text-muted-foreground">Requested item:</span> {order.productType}</p>
                              {order.occasion ? <p><span className="text-muted-foreground">Occasion:</span> {order.occasion}</p> : null}
                              {order.colors ? <p><span className="text-muted-foreground">Colors:</span> {order.colors}</p> : null}
                              {order.size ? <p><span className="text-muted-foreground">Size:</span> {order.size}</p> : null}
                              {order.deadline ? <p><span className="text-muted-foreground">Deadline:</span> {order.deadline}</p> : null}
                            </div>
                            <div className="rounded-lg border border-border bg-card p-4">
                              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                Description
                              </p>
                              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                                {order.message}
                              </p>
                            </div>
                            {order.sampleImages.length ? (
                              <div className="rounded-lg border border-border bg-card p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                  Sample Images
                                </p>
                                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                  {order.sampleImages.map((image, index) => (
                                    <a
                                      key={`${order.id}-sample-${index}`}
                                      href={image.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
                                    >
                                      <Image
                                        src={image.url}
                                        alt={image.alt || `${order.name} sample design`}
                                        fill
                                        sizes="160px"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                      />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </div>

                          <div className="space-y-4 rounded-lg border border-border bg-card p-4">
                            <p className="text-sm text-muted-foreground">
                              Update status or remove this request from the CMS.
                            </p>
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
                              action={deleteCustomOrderAction}
                              id={order.id}
                              message={`Delete custom order ${order.requestId}? This cannot be undone.`}
                            >
                              <button
                                type="submit"
                                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-border text-sm text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="size-4" />
                                Delete Request
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
