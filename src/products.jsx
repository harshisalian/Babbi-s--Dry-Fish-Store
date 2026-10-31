import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { PRODUCTS as SAMPLE } from './data/products.js'
import { supabase } from './lib/supabase.js'

const ProductsContext = createContext(null)

const EMOJI = { prawn: '🦐', special: '🐠', fish: '🐟' }
const pair = (en, kn) => ({ en: en || '', kn: kn || en || '' })

// Turns a database row into the shape the shop components already use.
export const fromRow = (r) => ({
  id: r.id,
  category: r.category || 'fish',
  emoji: EMOJI[r.category] || '🐟',
  image: r.image_url || null,
  name: pair(r.name_en, r.name_kn),
  alt: r.alt_names || [],
  pricePerKg: Number(r.price_per_kg),
  stockKg: Number(r.stock_kg),
  badge: r.badge || null,
  desc: pair(r.description_en, r.description_kn),
  tip: r.tip_en || r.tip_kn ? pair(r.tip_en, r.tip_kn) : null,
  shelfLife: r.shelf_life_en || r.shelf_life_kn ? pair(r.shelf_life_en, r.shelf_life_kn) : null,
})

export function ProductsProvider({ children }) {
  // Without Supabase we show the sample fish. With Supabase we wait for the real list.
  const [products, setProducts] = useState(supabase ? [] : SAMPLE)
  const [loading, setLoading] = useState(Boolean(supabase))
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!supabase) return
    const { data, error: err } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .order('created_at')
    if (err) setError(err.message)
    else {
      setProducts(data.map(fromRow))
      setError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // Pick up price/stock changes when a customer comes back to the tab.
  useEffect(() => {
    if (!supabase) return
    const onVisible = () => document.visibilityState === 'visible' && load()
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [load])

  return (
    <ProductsContext.Provider value={{ products, loading, error, reload: load, usingSample: !supabase }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
