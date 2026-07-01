import { Pencil, Plus, Trash2 } from 'lucide-react'
import {
  deleteCategoryAction,
  saveCategoryAction,
} from '@/app/admin/actions'
import { AdminToggle } from '@/components/admin-toggle'
import { PendingSubmitButton } from '@/components/pending-submit-button'
import { getCategories } from '@/lib/sanity'

export default async function AdminCategoriesPage() {
  const categories = await getCategories({ includeHidden: true })
  const nextSortOrder = Math.max(0, ...categories.map((category) => category.sortOrder ?? 0)) + 1

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Catalog</p>
        <h1 className="mt-2 font-serif text-3xl">Categories</h1>
      </div>

      <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
        <h2 className="font-serif text-xl">Add Category</h2>
        <form action={saveCategoryAction} className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_120px_120px]">
          <input type="hidden" name="nextSortOrder" value={nextSortOrder} />
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
            defaultValue={nextSortOrder}
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
          <PendingSubmitButton
            pendingLabel="Adding..."
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Add
          </PendingSubmitButton>
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
            <form action={saveCategoryAction} className="mt-5 grid gap-4 lg:grid-cols-2">
              <input type="hidden" name="id" value={category.id} />
              <input
                name="title"
                required
                defaultValue={category.title}
                placeholder="Title"
                className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
              <input
                name="description"
                defaultValue={category.description}
                placeholder="Description"
                className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
              <input
                name="sortOrder"
                type="number"
                defaultValue={category.sortOrder}
                className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
              <AdminToggle
                name="hidden"
                label="Hidden"
                defaultChecked={category.hidden}
                className="min-h-11 py-2"
              />
              <PendingSubmitButton
                pendingLabel="Saving..."
                className="rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Save
              </PendingSubmitButton>
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
