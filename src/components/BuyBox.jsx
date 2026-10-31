import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import { useCart, priceFor, formatWeight } from '../cart.jsx'
import { CURRENCY } from '../config.js'

const PRESETS = [250, 500, 1000]

// Weight picker + live price + Add to cart. Used on the product card and in the detail view.
export default function BuyBox({ product, onAdded, onOpenCart }) {
  const { t } = useLang()
  const { add, setOpen } = useCart()
  const [grams, setGrams] = useState(500)
  const [custom, setCustom] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const out = product.stockKg <= 0
  const maxG = product.stockKg * 1000
  const safeGrams = Math.min(Math.max(grams || 0, 50), maxG || 50)
  const price = priceFor(product, safeGrams)

  const handleAdd = () => {
    add(product.id, safeGrams)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1600)
    onAdded?.()
  }

  const openCart = () => {
    onOpenCart?.()
    setOpen(true)
  }

  return (
    <div className="flex flex-col gap-3">
      {!out && (
        <>
          <div className="flex flex-wrap gap-2">
            {PRESETS.filter((g) => g <= maxG).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setGrams(g)
                  setCustom(false)
                }}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  !custom && grams === g
                    ? 'border-venice bg-venice text-merino'
                    : 'border-venice/20 bg-white text-ink hover:border-venice'
                }`}
              >
                {formatWeight(g)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCustom(true)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                custom
                  ? 'border-venice bg-venice text-merino'
                  : 'border-venice/20 bg-white text-ink hover:border-venice'
              }`}
            >
              {t('custom')}
            </button>
          </div>

          {custom && (
            <label className="flex items-center gap-2 text-sm">
              <input
                type="number"
                min={50}
                max={maxG}
                step={50}
                value={grams}
                onChange={(e) => setGrams(Number(e.target.value))}
                className="w-28 rounded-lg border border-venice/20 bg-white px-3 py-2 outline-none focus:border-venice"
              />
              <span className="text-ink/60">{t('grams')}</span>
            </label>
          )}
        </>
      )}

      <div className="flex items-center justify-between gap-3 pt-1">
        <div>
          <div className="text-xs text-ink/50">{formatWeight(safeGrams)}</div>
          <div className="text-lg font-bold">
            {CURRENCY}
            {out ? '—' : price}
          </div>
        </div>
        <button
          type="button"
          disabled={out}
          onClick={handleAdd}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition active:scale-95 disabled:cursor-not-allowed disabled:bg-black/20 ${
            justAdded ? 'bg-emerald-600' : 'bg-venice hover:brightness-110'
          }`}
        >
          {out ? t('outOfStock') : justAdded ? t('added') : t('add')}
        </button>
      </div>

      {justAdded && (
        <button type="button" onClick={openCart} className="text-left text-xs font-medium text-venice underline">
          {t('cart')} →
        </button>
      )}
    </div>
  )
}
