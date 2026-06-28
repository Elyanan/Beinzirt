import { Pencil, Plus, Trash2 } from 'lucide-react'
import {
  deleteCategoryAction,
  saveCategoryAction,
  seedCategoriesAction,
} from '@/app/admin/actions'
import { getCategories } from '@/lib/sanity'

export default async function AdminCategoriesPage() {
  const categories = await getCategories({ includeHidden: true })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Catalog</p>
          <h1 className="mt-2 font-serif text-3xl">Categories</h1>
        </div>
        <form action={seedCategoriesAction}>
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Seed Required Categories
          </button>
        </form>
      </div>

      <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
        <h2 className="font-serif text-xl">Add Category</h2>
        <form action={saveCategoryAction} className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_120px_120px]">
          <input
            name="title"
            required
            placeholder="Category title"
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          <input
            name="description"
            placeholder="Description"
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          <input
            name="sortOrder"
            type="number"
            defaultValue={999}
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Add
          </button>
        </form>
      </section>

      <div className="space-y-3">
        {categories.map((category) => (
          <details
            key={category.id}
            className="rounded-xl border border-border/80 bg-card p-4 shadow-luxury"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <p className="font-medium text-foreground">{category.title}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Sort {category.sortOrder} {category.hidden ? '- Hidden' : '- Visible'}
                </p>
              </div>
              <Pencil className="size-4 text-muted-foreground" />
            </summary>
            <form action={saveCategoryAction} className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_120px_140px_auto]">
              <input type="hidden" name="id" value={category.id} />
              <input
                name="title"
                required
                defaultValue={category.title}
                className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
              <input
                name="description"
                defaultValue={category.description}
                className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
              <input
                name="sortOrder"
                type="number"
                defaultValue={category.sortOrder}
                className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
              <label className="flex h-11 items-center gap-2 rounded-lg border border-border bg-background px-4 text-sm">
                <input name="hidden" type="checkbox" defaultChecked={category.hidden} />
                Hidden
              </label>
              <button
                type="submit"
                className="rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Save
              </button>
            </form>
            <form action={deleteCategoryAction} className="mt-3">
              <input type="hidden" name="id" value={category.id} />
              <button
                type="submit"
                className="inline-flex items-center gap-2 text-sm text-destructive hover:underline"
              >
                <Trash2 className="size-4" />
                Delete Category
              </button>
            </form>
          </details>
        ))}
      </div>
    </div>
  )
}
