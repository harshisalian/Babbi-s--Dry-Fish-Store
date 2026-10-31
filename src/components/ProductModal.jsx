import { useEffect } from 'react'
import BuyBox from './BuyBox.jsx'
import ProductImage from './ProductImage.jsx'
import Cat from './Cat.jsx'
import { useLang } from '../i18n.jsx'
import { CURRENCY } from '../config.js'

export default function ProductModal({ product, onClose }) {
  const { lang, t } = useLang()
  const out = product.stockKg <= 0

  // Close on Escape, and stop the page behind from scrolling while the modal is open.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const rows = [
    product.tip && [t('cookingTip'), product.tip[lang]],
    [t('storage'), t('storageText')],
    product.shelfLife && [t('shelfLife'), product.shelfLife[lang]],
    product.origin && [t('origin'), product.origin[lang]],
  ].filter(Boolean)

  return (
    <div
      className="fixed inset-0 z-[55] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={product.name[lang]}
    >
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} />
      <div className="relative grid max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-card shadow-2xl sm:rounded-3xl md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label={t('close')}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-merino/90 text-lg text-venice shadow hover:bg-white"
        >
          ✕
        </button>

        <div className="relative h-56 md:h-full md:min-h-96">
          <ProductImage product={product} out={out} />
          <Cat variant="peek" delay={0.4} className="absolute bottom-0 left-4 w-20" />
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div>
            <h2 className="font-display text-2xl leading-tight text-venice">{product.name[lang]}</h2>
            <p className="text-sm text-ink/50">{product.name[lang === 'en' ? 'kn' : 'en']}</p>
          </div>

          <p className="text-sm leading-relaxed text-ink/75">{product.desc[lang]}</p>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-venice">
              {CURRENCY}
              {product.pricePerKg}
            </span>
            <span className="text-sm text-ink/50">/ {lang === 'en' ? 'kg' : 'ಕೆಜಿ'}</span>
            {!out && product.stockKg <= 5 && (
              <span className="ml-auto text-xs font-medium text-alert">{t('only', { n: product.stockKg })}</span>
            )}
          </div>

          <dl className="space-y-3 rounded-2xl bg-rock/15 p-4 text-sm">
            {rows.map(([label, value]) => (
              <div key={label}>
                <dt className="font-semibold text-venice">{label}</dt>
                <dd className="text-ink/75">{value}</dd>
              </div>
            ))}
          </dl>

          <div>
            <div className="mb-2 text-sm font-semibold text-venice">{t('chooseWeight')}</div>
            <BuyBox product={product} onOpenCart={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}
