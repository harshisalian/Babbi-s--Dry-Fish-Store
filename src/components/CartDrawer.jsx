import Cat from './Cat.jsx'
import { useLang } from '../i18n.jsx'
import { useCart, formatWeight } from '../cart.jsx'
import { CURRENCY, DELIVERY } from '../config.js'

export default function CartDrawer({ onCheckout }) {
  const { lang, t } = useLang()
  const { items, open, setOpen, setGrams, remove, subtotal, deliveryFee, total } = useCart()

  if (!open) return null

  const belowMin = subtotal < DELIVERY.minOrder
  const toFree = DELIVERY.freeAbove - subtotal

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={t('yourCart')}>
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-card shadow-2xl">
        <header className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <h2 className="font-display text-xl font-bold text-venice">{t('yourCart')}</h2>
          <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-2 text-xl hover:bg-black/5">
            ✕
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
            <Cat variant="hero" className="w-40" />
            <p className="font-semibold">{t('emptyCart')}</p>
            <p className="text-sm text-black/50">{t('emptyCartSub')}</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-black/5 overflow-y-auto px-5">
              {items.map(({ id, product, grams, price }) => (
                <li key={id} className="flex gap-3 py-4">
                  <div
                    className="flex h-16 w-16 flex-none items-center justify-center rounded-xl text-3xl"
                    style={{ background: `#d6e6ef` }}
                  >
                    {product.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <h3 className="font-semibold leading-tight">{product.name[lang]}</h3>
                      <span className="font-bold">
                        {CURRENCY}
                        {price}
                      </span>
                    </div>
                    <div className="text-xs text-black/50">
                      {CURRENCY}
                      {product.pricePerKg} / {lang === 'en' ? 'kg' : 'ಕೆಜಿ'}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-black/10 bg-white">
                        <button
                          onClick={() => (grams <= 250 ? setGrams(id, 250) : setGrams(id, grams - 250))}
                          className="px-3 py-1 text-lg hover:bg-black/5"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="min-w-16 px-1 text-center text-sm font-medium">{formatWeight(grams)}</span>
                        <button
                          onClick={() => setGrams(id, grams + 250)}
                          className="px-3 py-1 text-lg hover:bg-black/5"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <button onClick={() => remove(id)} className="text-xs font-medium text-alert hover:underline">
                        {t('remove')}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="space-y-2 border-t border-black/10 bg-white px-5 py-4">
              {subtotal < DELIVERY.freeAbove && (
                <p className="rounded-lg bg-rock/25 px-3 py-2 text-xs text-venice">
                  {t('freeAbove', { n: `${CURRENCY}${toFree}` })}
                </p>
              )}
              <Row label={t('subtotal')} value={`${CURRENCY}${subtotal}`} />
              <Row label={t('delivery')} value={deliveryFee === 0 ? t('free') : `${CURRENCY}${deliveryFee}`} />
              <div className="border-t border-black/10 pt-2">
                <Row label={t('total')} value={`${CURRENCY}${total}`} bold />
              </div>
              {belowMin && (
                <p className="text-xs font-medium text-alert">{t('minOrder', { n: `${CURRENCY}${DELIVERY.minOrder}` })}</p>
              )}
              <button
                disabled={belowMin}
                onClick={onCheckout}
                className="w-full rounded-xl bg-venice py-3 font-semibold text-white transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-black/20"
              >
                {t('checkout')}
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}

function Row({ label, value, bold }) {
  return (
    <div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm text-black/70'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}
