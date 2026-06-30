import type { Metadata } from 'next'
import { PageBanner } from '@/components/page-banner'
import { ShopClient } from '@/components/shop-client'
import { getMessages, translate } from '@/lib/i18n/messages'
import { getServerLocale } from '@/lib/i18n/server'
import { getCategories, getStorefrontProducts } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Shop | Beinzirt Design',
  description:
    'Browse handmade Ethiopian dresses, gabi, scarves, shirts and home textiles, each crafted with heritage and care.',
}

export default async function ShopPage() {
  const locale = await getServerLocale()
  const t = (key: string) => translate(getMessages(locale), key)
  const [products, categories] = await Promise.all([
    getStorefrontProducts(),
    getCategories(),
  ])

  return (
    <>
      <PageBanner title={t('shop.title')} subtitle={t('shop.subtitle')} />
      <ShopClient products={products} categories={categories} />
    </>
  )
}
