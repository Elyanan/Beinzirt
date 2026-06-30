'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import type { Product } from '@/lib/data'
import { productPriceBirr, productPriceUsd } from '@/lib/pricing'

export type CartItem = Product & { quantity: number }

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  subtotalBirr: number
  subtotalUsd: number
  lastAdded: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  getItemQuantity: (id: string) => number
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const CART_STORAGE_KEY = 'beinzirt.cart.v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [lastAdded, setLastAdded] = useState(0)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (item) =>
                item &&
                typeof item.id === 'string' &&
                typeof item.name === 'string' &&
                Number(item.quantity) > 0,
            ),
          )
        }
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY)
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [hydrated, items])

  const addItem = useCallback((product: Product, quantity = 1) => {
    if (product.availability === false) return
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        )
      }
      return [...prev, { ...product, quantity }]
    })
    setLastAdded(Date.now())
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id !== id) return i
          const nextQuantity = Math.max(0, quantity)
          if (i.availability === false && nextQuantity > i.quantity) return i
          return { ...i, quantity: nextQuantity }
        })
        .filter((i) => i.quantity > 0),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])
  const getItemQuantity = useCallback(
    (id: string) => items.find((item) => item.id === id)?.quantity ?? 0,
    [items],
  )

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + productPriceUsd(i) * i.quantity, 0),
    [items],
  )
  const subtotalBirr = useMemo(
    () => items.reduce((sum, i) => sum + productPriceBirr(i) * i.quantity, 0),
    [items],
  )
  const subtotalUsd = useMemo(
    () => items.reduce((sum, i) => sum + productPriceUsd(i) * i.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      subtotalBirr,
      subtotalUsd,
      lastAdded,
      addItem,
      removeItem,
      updateQuantity,
      getItemQuantity,
      clear,
    }),
    [
      items,
      count,
      subtotal,
      subtotalBirr,
      subtotalUsd,
      lastAdded,
      addItem,
      removeItem,
      updateQuantity,
      getItemQuantity,
      clear,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
