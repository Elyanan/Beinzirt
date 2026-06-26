import type { Metadata } from 'next'
import { PageBanner } from '@/components/page-banner'
import { ShopClient } from '@/components/shop-client'

export const metadata: Metadata = {
  title: 'Shop | Beinzirt Design',
  description:
    'Browse handmade Ethiopian dresses, gabi, scarves, shirts and home textiles, each crafted with heritage and care.',
}

export default function ShopPage() {
  return (
    <>
      <PageBanner
        title="The Collection"
        subtitle="Handwoven clothing and textiles, made to order by master artisans in Addis Ababa."
      />
      <ShopClient />
    </>
  )
}
