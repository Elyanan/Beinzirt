import Link from 'next/link'
import { saveProductAction } from '@/app/admin/actions'
import { AdminImageUploadPreview } from '@/components/admin-image-upload-preview'
import { AdminToggle } from '@/components/admin-toggle'
import { PendingSubmitButton } from '@/components/pending-submit-button'
import type { CmsCategory, ProductAdmin } from '@/lib/sanity'

export function AdminProductForm({
  product,
  categories,
  defaultSortOrder = 1,
  embedded = false,
  cancelHref,
}: {
  product?: ProductAdmin | null
  categories: CmsCategory[]
  defaultSortOrder?: number
  embedded?: boolean
  cancelHref?: string
}) {
  const isEditing = Boolean(product?.id)

  return (
    <form
      action={saveProductAction}
      className={
        embedded
          ? 'space-y-5'
          : 'space-y-6 rounded-xl border border-border/80 bg-card p-5 shadow-luxury'
      }
    >
      {product?.id && <input type="hidden" name="id" value={product.id} />}
      {embedded && product?.slug && <input type="hidden" name="slug" value={product.slug} />}
      <input type="hidden" name="existingFeaturedImageRef" value={product?.imageRef ?? ''} />
      <input type="hidden" name="nextSortOrder" value={defaultSortOrder} />

      <div>
        <label className="text-sm font-medium">Product Name *</label>
        <input
          name="name"
          required
          defaultValue={product?.name ?? ''}
          className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Description *</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={product?.description ?? ''}
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Price in ETB *</label>
          <input
            name="priceBirr"
            type="number"
            min="0"
            step="1"
            required
            defaultValue={product?.priceBirr ?? ''}
            className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Sort Order</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={product?.sortOrder ?? defaultSortOrder}
            className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Category *</label>
          <select
            name="category"
            required
            defaultValue={product?.category ?? categories[0]?.title ?? 'Dresses'}
            className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        {!embedded && (
          <div>
            <label className="text-sm font-medium">Slug</label>
            <input
              name="slug"
              defaultValue={product?.slug ?? ''}
              placeholder="auto-generated from name"
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
        )}
        {embedded && (
          <div>
            <label className="text-sm font-medium">Price in USD *</label>
            <input
              name="priceUsd"
              type="number"
              min="0"
              step="0.01"
              required
              defaultValue={product?.priceUsd ?? product?.price ?? ''}
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
        )}
      </div>

      {!embedded && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Price in USD *</label>
            <input
              name="priceUsd"
              type="number"
              min="0"
              step="0.01"
              required
              defaultValue={product?.priceUsd ?? product?.price ?? ''}
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>
      )}

      <AdminImageUploadPreview
        inputName="featuredImage"
        currentImage={isEditing ? product?.image : undefined}
        alt={product?.name ?? 'Product preview'}
      />

      <div>
        <label className="text-sm font-medium">Image Alt Text</label>
        <input
          name="imageAlt"
          defaultValue={product?.imageAlt ?? product?.name ?? ''}
          className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <AdminToggle
          name="availability"
          label="Available"
          description="Customers can purchase this product."
          defaultChecked={product?.availability !== false}
        />
        <AdminToggle
          name="bestSeller"
          label="Best Seller"
          description="Show the premium badge in the shop."
          defaultChecked={Boolean(product?.bestSeller ?? product?.featured)}
        />
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-5">
        {(isEditing && cancelHref) || !embedded ? (
          <Link
            href={cancelHref ?? '/admin/products'}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            {isEditing ? 'Cancel Editing' : 'Cancel'}
          </Link>
        ) : null}
        <PendingSubmitButton
          pendingLabel={isEditing ? 'Saving...' : 'Adding...'}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {isEditing ? 'Save Product' : 'Add Product'}
        </PendingSubmitButton>
      </div>
    </form>
  )
}
