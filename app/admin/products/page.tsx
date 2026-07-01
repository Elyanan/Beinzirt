import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteProductAction } from '@/app/admin/actions'
import { AdminProductCategoryFilter } from '@/components/admin-product-category-filter'
import { AdminProductForm } from '@/components/admin-product-form'
import { ConfirmActionForm } from '@/components/confirm-action-form'
import { IMAGE_FALLBACK } from '@/lib/images'
import { formatBirr } from '@/lib/pricing'
import { getAdminProducts, getCategories } from '@/lib/sanity'

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; edit?: string }>
}) {
  const params = await searchParams
  const [products, categories] = await Promise.all([
    getAdminProducts(),
    getCategories({ includeHidden: true }),
  ])
  const category = params.category ?? 'All'
  const editingProduct = params.edit
    ? products.find((product) => product.id === params.edit) ?? null
    : null
  const filtered = products.filter((product) => {
    return category === 'All' || product.category === category
  })
  const nextSortOrder = Math.max(0, ...products.map((product) => product.sortOrder ?? 0)) + 1
  const productsHref = (next?: { edit?: string }) => {
    const query = new URLSearchParams()
    if (category !== 'All') query.set('category', category)
    if (next?.edit) query.set('edit', next.edit)
    const value = query.toString()
    return value ? `/admin/products?${value}#product-form` : '/admin/products#product-form'
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Catalog</p>
        <h1 className="mt-2 font-serif text-3xl">Products</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-2 xl:items-start">
        <section id="product-form" className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-serif text-xl text-foreground">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              {editingProduct && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Editing {editingProduct.name}. Save to update this product.
                </p>
              )}
            </div>
            {editingProduct && (
              <Link
                href={productsHref()}
                className="text-sm font-medium text-accent transition-colors hover:text-foreground"
              >
                Add a new product
              </Link>
            )}
          </div>
          <div className="mt-5">
            <AdminProductForm
              key={editingProduct?.id ?? 'new-product'}
              product={editingProduct}
              categories={categories}
              defaultSortOrder={nextSortOrder}
              embedded
              cancelHref={productsHref()}
            />
          </div>
        </section>

        <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-serif text-xl text-foreground">
              All Products ({products.length})
            </h2>
            <Suspense fallback={null}>
              <AdminProductCategoryFilter categories={categories} category={category} />
            </Suspense>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-border/70 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 pr-3 font-medium">Image</th>
                  <th className="pb-3 pr-3 font-medium">Title</th>
                  <th className="pb-3 pr-3 font-medium">Category</th>
                  <th className="pb-3 pr-3 font-medium">Price</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-3">
                      <div className="relative size-11 overflow-hidden rounded-full bg-muted">
                        <Image
                          src={product.image || IMAGE_FALLBACK}
                          alt={product.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 pr-3 font-medium text-foreground">{product.name}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{product.category}</td>
                    <td className="py-3 pr-3 font-medium">{formatBirr(product.priceBirr)} ETB</td>
                    <td className="py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={productsHref({ edit: product.id })}
                          className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
                            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-destructive transition-colors hover:bg-destructive/10"
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
                    <td colSpan={5} className="py-12 text-center text-muted-foreground">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
