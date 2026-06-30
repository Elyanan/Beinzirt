import Image from 'next/image'
import Link from 'next/link'
import { saveProductAction } from '@/app/admin/actions'
import { IMAGE_FALLBACK } from '@/lib/images'
import type { CmsCategory, ProductAdmin } from '@/lib/sanity'

export function AdminProductForm({
  product,
  categories,
}: {
  product?: ProductAdmin | null
  categories: CmsCategory[]
}) {
  return (
    <form action={saveProductAction} className="space-y-6 rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
      {product?.id && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="existingFeaturedImageRef" value={product?.imageRef ?? ''} />

      <div className="grid gap-5 lg:grid-cols-2">
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
          <label className="text-sm font-medium">Slug</label>
          <input
            name="slug"
            defaultValue={product?.slug ?? ''}
            placeholder="auto-generated from name"
            className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Category *</label>
          <select
            name="category"
            required
            defaultValue={product?.category ?? 'Dresses'}
            className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
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

      <div>
        <label className="text-sm font-medium">Description *</label>
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={product?.description ?? ''}
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium">Featured Image</label>
            <input
              name="featuredImage"
              type="file"
              accept="image/*"
              className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:text-primary-foreground"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Image Alt Text</label>
            <input
              name="imageAlt"
              defaultValue={product?.imageAlt ?? product?.name ?? ''}
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">Current Preview</p>
          <div className="relative mt-2 aspect-[4/5] overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              src={product?.image || IMAGE_FALLBACK}
              alt={product?.name ?? 'Product preview'}
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm">
          <input name="availability" type="checkbox" defaultChecked={product?.availability !== false} />
          Available
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm">
          <input name="bestSeller" type="checkbox" defaultChecked={Boolean(product?.bestSeller ?? product?.featured)} />
          Best Seller
        </label>
        <div>
          <label className="text-sm font-medium">Sort Order</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={product?.sortOrder ?? 999}
            className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-5">
        <Link
          href="/admin/products"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Save Product
        </button>
      </div>
    </form>
  )
}
