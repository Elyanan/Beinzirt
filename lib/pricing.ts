import type { Product } from '@/lib/data'

export const DELIVERY_FEE_BIRR = 300
export const FREE_DELIVERY_THRESHOLD_BIRR = 7000

type PriceLike = Pick<Product, 'price' | 'priceBirr' | 'priceUsd'>

export function productPriceBirr(product: PriceLike) {
  return Number(product.priceBirr ?? (product.price ? product.price * 140 : 0))
}

export function productPriceUsd(product: PriceLike) {
  return Number(product.priceUsd ?? product.price ?? 0)
}

export function formatBirr(value: number) {
  return `ETB ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)}`
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)
}

export function formatDualPrice(product: PriceLike) {
  return `${formatBirr(productPriceBirr(product))} / ${formatUsd(productPriceUsd(product))}`
}

export function deliveryFeeForBirr(subtotalBirr: number) {
  return subtotalBirr > FREE_DELIVERY_THRESHOLD_BIRR ? 0 : DELIVERY_FEE_BIRR
}
