import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useProducts } from './products.jsx'
import { DELIVERY } from './config.js'

const CartContext = createContext(null)

export const priceFor = (product, grams) => Math.round((product.pricePerKg * grams) / 1000)
export const formatWeight = (g) => (g >= 1000 ? `${+(g / 1000).toFixed(2)} kg` : `${g} g`)

const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem('cart') || '[]')
    return Array.isArray(raw) ? raw.filter((i) => i && typeof i.id === 'string' && Number(i.grams) > 0) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const { products } = useProducts()
  const [items, setItems] = useState(load) // [{ id, grams }]
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch {}
  }, [items])

  const maxGrams = (id) => (products.find((p) => p.id === id)?.stockKg ?? 0) * 1000

  const add = (id, grams) =>
    setItems((prev) => {
      const cap = maxGrams(id)
      if (cap <= 0) return prev
      const existing = prev.find((i) => i.id === id)
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, grams: Math.min(i.grams + grams, cap) } : i))
      }
      return [...prev, { id, grams: Math.min(grams, cap) }]
    })

  const setGrams = (id, grams) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, grams: Math.max(50, Math.min(grams, maxGrams(id))) } : i))
    )

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clear = () => setItems([])

  // Prices always come from the current product list, so a price change in the admin page
  // is reflected in carts too. Items that are hidden or sold out simply do not show.
  // (Saved items are kept while products are still loading, so the cart is not wiped.)
  const detailed = useMemo(
    () =>
      items
        .map((i) => {
          const product = products.find((p) => p.id === i.id)
          if (!product || product.stockKg <= 0) return null
          const grams = Math.min(i.grams, product.stockKg * 1000)
          return { id: i.id, grams, product, price: priceFor(product, grams) }
        })
        .filter(Boolean),
    [items, products]
  )

  const subtotal = detailed.reduce((s, i) => s + i.price, 0)
  const deliveryFee = subtotal === 0 || subtotal >= DELIVERY.freeAbove ? 0 : DELIVERY.charge
  const total = subtotal + deliveryFee
  const count = detailed.length

  return (
    <CartContext.Provider
      value={{ items: detailed, add, setGrams, remove, clear, subtotal, deliveryFee, total, count, open, setOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
