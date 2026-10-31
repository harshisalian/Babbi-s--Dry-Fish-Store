import { useState } from 'react'
import Cat from './Cat.jsx'
import { useLang } from '../i18n.jsx'
import { useCart, priceFor, formatWeight } from '../cart.jsx'
import { CURRENCY } from '../config.js'

const PRESETS = [250, 500, 1000]

export default function ProductCard({ product }) {
  const { lang, t } = useLang()
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
    setTimeout(() => setJustAdded(false), 1400)
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-card shadow-sm transition hover:shadow-md">
      <div
        className="relative flex h-40 items-center justify-center overflow-hidden text-6xl"
        style={{ background: 'linear-gradient(135deg, #F5EEDD, #84B3CE)' }}
      >
        {justAdded && <Cat variant="peek" className="cat-pop absolute bottom-0 right-4 w-20" />}
        <span aria-hidden className={out ? 'opacity-40 grayscale' : ''}>
          {product.emoji}
        </span>
        {product.badge && !out && (
          <span className="absolute left-3 top-3 rounded-full bg-venice px-2.5 py-1 text-xs font-semibold text-white">
            {t(`badge_${product.badge}`)}
          </span>
        )}
        {out && (
          <span className="absolute left-3 top-3 rounded-full bg-alert px-2.5 py-1 text-xs font-semibold text-white">
            {t('outOfStock')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-display text-lg font-bold leading-tight text-venice">{product.name[lang]}</h3>
          <p className="text-sm text-black/50">{product.name[lang === 'en' ? 'kn' : 'en']}</p>
        </div>

        <p className="text-sm leading-relaxed text-black/70">{product.desc[lang]}</p>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-venice">
            {CURRENCY}
            {product.pricePerKg}
          </span>
          <span className="text-sm text-black/50">/ {lang === 'en' ? 'kg' : 'ಕೆಜಿ'}</span>
          {!out && product.stockKg <= 5 && (
            <span className="ml-auto text-xs font-medium text-alert">{t('only', { n: product.stockKg })}</span>
          )}
        </div>

        {!out && (
          <>
            <div className="flex flex-wrap gap-2">
              {PRESETS.filter((g) => g <= maxG).map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setGrams(g)
                    setCustom(false)
                  }}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    !custom && grams === g
                      ? 'border-venice bg-venice text-white'
                      : 'border-black/10 bg-white text-ink hover:border-venice'
                  }`}
                >
                  {formatWeight(g)}
                </button>
              ))}
              <button
                onClick={() => setCustom(true)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  custom ? 'border-venice bg-venice text-white' : 'border-black/10 bg-white text-ink hover:border-venice'
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
                  className="w-28 rounded-lg border border-black/10 bg-white px-3 py-2 outline-none focus:border-venice"
                />
                <span className="text-black/60">{t('grams')}</span>
              </label>
            )}
          </>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div>
            <div className="text-xs text-black/50">{formatWeight(safeGrams)}</div>
            <div className="text-lg font-bold">
              {CURRENCY}
              {out ? '—' : price}
            </div>
          </div>
          <button
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
          <button onClick={() => setOpen(true)} className="text-left text-xs font-medium text-venice underline">
            {t('cart')} →
          </button>
        )}
      </div>
    </article>
  )
}
