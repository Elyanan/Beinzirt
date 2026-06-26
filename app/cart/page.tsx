import type { Metadata } from 'next'
import { PageBanner } from '@/components/page-banner'
import { CartClient } from '@/components/cart-client'

export const metadata: Metadata = {
  title: 'Cart | Beinzirt Design',
  description: 'Review your selected handmade Ethiopian pieces and check out.',
}

export default function CartPage() {
  return (
    <>
      <PageBanner title="Your Cart" subtitle="Review your handpicked treasures before checkout." />
      <CartClient />
    </>
  )
}
