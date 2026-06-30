import Image from 'next/image'
import Link from 'next/link'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { deleteProductAction } from '@/app/admin/actions'
import { AdminProductFilters } from '@/components/admin-product-filters'
import { ConfirmActionForm } from '@/components/confirm-action-form'
import { IMAGE_FALLBACK } from '@/lib/images'
import { getAdminProducts, getCategories } from '@/lib/sanity'
import { formatDualPrice } from '@/lib/pricing'

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const params = await searchParams
  const [products, categories] = await Promise.all([
    getAdminProducts(),
    getCategories({ includeHidden: true }),
  ])
  const query = (params.q ?? '').toLowerCase()
  const category = params.category ?? 'All'
  const filtered = products.filter((product) => {
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    const matchesCategory = category === 'All' || product.category === category
    return matchesQuery && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Catalog</p>
          <h1 className="mt-2 font-serif text-3xl">Products</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Add Product
        </Link>
      </div>

      <AdminProductFilters
        categories={categories}
        query={params.q ?? ''}
        category={category}
      />

      <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-luxury">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-secondary/70 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Best Seller</th>
                <th className="px-4 py-3">Available</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-t border-border/70">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-14 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={product.image || IMAGE_FALLBACK}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="line-clamp-1 max-w-sm text-xs text-muted-foreground">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                  <td className="px-4 py-3 font-medium">{formatDualPrice(product)}</td>
                  <td className="px-4 py-3">
                    {(product.bestSeller ?? product.featured) ? 'Yes' : 'No'}
                  </td>
                  <td className="px-4 py-3">{product.availability !== false ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${encodeURIComponent(product.id)}/edit`}
                        className="inline-flex size-9 items-center justify-center rounded-full border border-border hover:bg-muted"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <ConfirmActionForm
                        action={deleteProductAction}
                        id={product.id}
                        message={`Delete ${product.name}? This cannot be undone.`}
                      >
                        <button
                          type="submit"
                          aria-label={`Delete ${product.name}`}
                          className="inline-flex size-9 items-center justify-center rounded-full border border-border text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </ConfirmActionForm>
                    </div>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
