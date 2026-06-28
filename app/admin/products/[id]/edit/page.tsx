import { notFound } from 'next/navigation'
import { AdminProductForm } from '@/components/admin-product-form'
import { getCategories, getProductById } from '@/lib/sanity'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [product, categories] = await Promise.all([
    getProductById(decodeURIComponent(id)),
    getCategories({ includeHidden: true }),
  ])

  if (!product) notFound()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Catalog</p>
        <h1 className="mt-2 font-serif text-3xl">Edit Product</h1>
      </div>
      <AdminProductForm product={product} categories={categories} />
    </div>
  )
}
