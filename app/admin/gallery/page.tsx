import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { deleteGalleryItemAction, saveGalleryItemAction } from '@/app/admin/actions'
import { galleryFilters } from '@/lib/data'
import { IMAGE_FALLBACK } from '@/lib/images'
import { getGalleryItems } from '@/lib/sanity'

export default async function AdminGalleryPage() {
  const items = await getGalleryItems()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Media</p>
        <h1 className="mt-2 font-serif text-3xl">Gallery</h1>
      </div>

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
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 lg:col-span-2"
          >
            Save Gallery Image
          </button>
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
                <button
                  type="submit"
                  className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Save Changes
                </button>
              </form>
              <form action={deleteGalleryItemAction}>
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-sm text-destructive hover:underline"
                >
                  <Trash2 className="size-4" />
                  Delete Image
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
