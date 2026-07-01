import { redirect } from 'next/navigation'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  redirect(`/admin/products?edit=${encodeURIComponent(id)}#product-form`)
}
