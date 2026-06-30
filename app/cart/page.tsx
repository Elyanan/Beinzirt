import type { Metadata } from 'next'
import { CartClient } from '@/components/cart-client'

export const metadata: Metadata = {
  title: 'Cart | Beinzirt Design',
  description: 'Review your selected handmade Ethiopian pieces and check out.',
}

export default function CartPage() {
  return <CartClient />
}
