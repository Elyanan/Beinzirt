import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import {
  deleteGalleryCategoryAction,
  deleteGalleryItemAction,
  saveGalleryCategoryAction,
  saveGalleryItemAction,
} from '@/app/admin/actions'
import { ConfirmActionForm } from '@/components/confirm-action-form'
import { PendingSubmitButton } from '@/components/pending-submit-button'
import { IMAGE_FALLBACK } from '@/lib/images'
import { getGalleryCategories, getGalleryItems } from '@/lib/sanity'

export default async function AdminGalleryPage() {
  const [items, categories] = await Promise.all([
    getGalleryItems(),
    getGalleryCategories({ includeHidden: true }),
  ])
  const galleryFilters = ['All', ...categories.filter((item) => !item.hidden).map((item) => item.title)]

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Media</p>
        <h1 className="mt-2 font-serif text-3xl">Gallery</h1>
      </div>

      <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
        <h2 className="font-serif text-xl">Gallery Categories</h2>
        <form action={saveGalleryCategoryAction} className="mt-5 grid gap-3 lg:grid-cols-[1fr_140px_auto]">
          <input
            name="title"
            required
            placeholder="New category"
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          <input
            name="sortOrder"
            type="number"
            defaultValue={999}
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          <PendingSubmitButton
            pendingLabel="Adding..."
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Add Category
          </PendingSubmitButton>
        </form>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.id} className="grid gap-3 rounded-lg border border-border bg-background p-3 sm:grid-cols-[1fr_auto]">
              <form action={saveGalleryCategoryAction} className="grid gap-3 sm:grid-cols-[1fr_90px_auto]">
                <input type="hidden" name="id" value={category.id} />
                <input name="title" defaultValue={category.title} className="h-10 rounded-lg border border-border bg-card px-3 text-sm" />
                <input name="sortOrder" type="number" defaultValue={category.sortOrder} className="h-10 rounded-lg border border-border bg-card px-3 text-sm" />
                <label className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm">
                  <input type="checkbox" name="hidden" defaultChecked={category.hidden} />
                  Hidden
                </label>
                <PendingSubmitButton pendingLabel="Saving..." className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground sm:col-span-2">
                  Save
                </PendingSubmitButton>
              </form>
              <ConfirmActionForm
                action={deleteGalleryCategoryAction}
                id={category.id}
                message={`Delete gallery category ${category.title}?`}
              >
                <button type="submit" className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border px-4 text-sm text-destructive hover:bg-destructive/10">
                  <Trash2 className="size-4" />
                  Delete
                </button>
              </ConfirmActionForm>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
        <h2 className="font-serif text-xl">Upload Gallery Image</h2>
        <form action={saveGalleryItemAction} className="mt-5 grid gap-4 lg:grid-cols-2">
          <input
            name="title"
            required
            placeholder="Title"
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          <input
            name="caption"
            placeholder="Caption"
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          <input
            name="alt"
            required
            placeholder="Alt text"
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          <input
            name="category"
            placeholder="Display category"
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          <select
            name="filter"
            defaultValue="All"
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          >
            {galleryFilters.map((filter) => (
              <option key={filter}>{filter}</option>
            ))}
          </select>
          <input
            name="sortOrder"
            type="number"
            defaultValue={999}
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          <label className="flex h-11 items-center gap-2 rounded-lg border border-border bg-background px-4 text-sm">
            <input type="checkbox" name="tall" />
            Tall image
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            required
            className="block w-full rounded-lg border border-border bg-background px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:text-primary-foreground"
          />
          <PendingSubmitButton
            pendingLabel="Saving..."
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 lg:col-span-2"
          >
            Save Gallery Image
          </PendingSubmitButton>
        </form>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-luxury">
            <div className="relative aspect-[4/3] bg-muted">
              <Image
                src={item.image || IMAGE_FALLBACK}
                alt={item.alt ?? item.title}
                fill
                sizes="(max-width: 1280px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-4 p-4">
              <form action={saveGalleryItemAction} className="grid gap-3">
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="existingImageRef" value={item.imageRef ?? ''} />
                <input
                  name="title"
                  defaultValue={item.title}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                />
                <input
                  name="caption"
                  defaultValue={item.caption}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                />
                <input
                  name="alt"
                  defaultValue={item.alt ?? item.title}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="category"
                    defaultValue={item.category}
                    className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                  />
                  <select
                    name="filter"
                    defaultValue={item.filter}
                    className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                  >
                    {galleryFilters.map((filter) => (
                      <option key={filter}>{filter}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={item.sortOrder ?? 999}
                    className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                  />
                  <label className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm">
                    <input type="checkbox" name="tall" defaultChecked={item.tall} />
                    Tall
                  </label>
                </div>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-xs file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:text-primary-foreground"
                />
                <PendingSubmitButton
                  pendingLabel="Saving..."
                  className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Save Changes
                </PendingSubmitButton>
              </form>
              <ConfirmActionForm
                action={deleteGalleryItemAction}
                id={item.id}
                message={`Delete gallery image ${item.title}?`}
              >
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-sm text-destructive hover:underline"
                >
                  <Trash2 className="size-4" />
                  Delete Image
                </button>
              </ConfirmActionForm>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
