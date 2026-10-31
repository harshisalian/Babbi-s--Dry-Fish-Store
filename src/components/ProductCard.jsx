import { useState } from 'react'
import Cat from './Cat.jsx'
import BuyBox from './BuyBox.jsx'
import ProductImage from './ProductImage.jsx'
import { useLang } from '../i18n.jsx'
import { CURRENCY } from '../config.js'

export default function ProductCard({ product, onOpen }) {
  const { lang, t } = useLang()
  const [popped, setPopped] = useState(false)
  const out = product.stockKg <= 0

  const showCat = () => {
    setPopped(true)
    setTimeout(() => setPopped(false), 1800)
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-venice/10 bg-card shadow-sm transition hover:shadow-md">
      <button
        type="button"
        onClick={() => onOpen(product)}
        aria-label={`${t('viewDetails')}: ${product.name[lang]}`}
        className="relative block h-40 w-full overflow-hidden text-left"
      >
        <ProductImage product={product} out={out} />
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
        {popped && <Cat variant="peek" className="cat-pop absolute bottom-0 right-4 w-20" />}
      </button>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <button type="button" onClick={() => onOpen(product)} className="text-left">
          <h3 className="font-display text-lg leading-tight text-venice">{product.name[lang]}</h3>
          <p className="text-sm text-ink/50">{product.name[lang === 'en' ? 'kn' : 'en']}</p>
        </button>

        <p className="text-sm leading-relaxed text-ink/70">{product.desc[lang]}</p>

        <button
          type="button"
          onClick={() => onOpen(product)}
          className="self-start text-xs font-medium text-venice underline"
        >
          {t('viewDetails')}
        </button>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-venice">
            {CURRENCY}
            {product.pricePerKg}
          </span>
          <span className="text-sm text-ink/50">/ {lang === 'en' ? 'kg' : 'ಕೆಜಿ'}</span>
          {!out && product.stockKg <= 5 && (
            <span className="ml-auto text-xs font-medium text-alert">{t('only', { n: product.stockKg })}</span>
          )}
        </div>

        <div className="mt-auto">
          <BuyBox product={product} onAdded={showCat} />
        </div>
      </div>
    </article>
  )
}
