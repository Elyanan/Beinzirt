import { AdminProductForm } from '@/components/admin-product-form'
import { getCategories } from '@/lib/sanity'

export default async function NewProductPage() {
  const categories = await getCategories({ includeHidden: true })

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Catalog</p>
        <h1 className="mt-2 font-serif text-3xl">Create Product</h1>
      </div>
      <AdminProductForm categories={categories} />
    </div>
  )
}
