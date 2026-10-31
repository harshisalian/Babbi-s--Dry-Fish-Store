import { useMemo, useState } from 'react'
import { useLang } from './i18n.jsx'
import { useCart } from './cart.jsx'
import { PRODUCTS, CATEGORIES } from './data/products.js'
import { SHOP } from './config.js'
import ProductCard from './components/ProductCard.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Checkout from './components/Checkout.jsx'
import Cat from './components/Cat.jsx'

function Sun({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="13" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1="50" y1="14" x2="50" y2="26" transform={`rotate(${i * 45} 50 50)`} />
      ))}
    </svg>
  )
}

export default function App() {
  const { lang, setLang, t } = useLang()
  const { count, setOpen } = useCart()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [inStock, setInStock] = useState(false)
  const [checkingOut, setCheckingOut] = useState(false)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = PRODUCTS.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (inStock && p.stockKg <= 0) return false
      if (!q) return true
      const hay = [p.name.en, p.name.kn, ...p.alt].join(' ').toLowerCase()
      return hay.includes(q)
    })
    if (sort === 'low') list = [...list].sort((a, b) => a.pricePerKg - b.pricePerKg)
    if (sort === 'high') list = [...list].sort((a, b) => b.pricePerKg - a.pricePerKg)
    return list
  }, [query, category, sort, inStock])

  const waLink = `https://wa.me/${SHOP.whatsapp}`

  const why = [
    ['☀️', 'why1t', 'why1d', 'right-6 w-16', 0],
    ['💰', 'why2t', 'why2d', 'right-10 w-[4.5rem]', 1.2],
    ['📦', 'why3t', 'why3d', 'right-5 w-14', 2.1],
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-venice/10 bg-merino/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <a href="#top" className="flex items-center gap-2">
            <Cat variant="face" className="h-9 w-10" />
            <span className="font-display text-xl leading-tight text-venice">{SHOP.name[lang]}</span>
          </a>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex overflow-hidden rounded-full border border-venice/30 text-sm font-medium">
              {['en', 'kn'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 ${lang === l ? 'bg-venice text-merino' : 'text-venice hover:bg-venice/10'}`}
                >
                  {l === 'en' ? 'EN' : 'ಕನ್ನಡ'}
                </button>
              ))}
            </div>
            <button
              onClick={() => setOpen(true)}
              className="relative rounded-full bg-venice px-4 py-2 text-sm font-semibold text-merino transition hover:brightness-110"
            >
              🛒 {t('cart')}
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rock px-1 text-xs text-venice">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="overflow-hidden bg-venice text-merino">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-rock-light">{t('tagline')}</p>
            <h1 className="font-display text-4xl leading-tight sm:text-5xl">{t('heroTitle')}</h1>
            <p className="mt-4 max-w-xl text-lg text-merino/85">{t('heroSub')}</p>
            <a
              href="#shop"
              className="mt-8 inline-block rounded-xl bg-merino px-6 py-3 font-semibold text-venice transition hover:bg-white"
            >
              {t('shopNow')} ↓
            </a>
          </div>

          <div className="relative mx-auto mt-16 w-full max-w-sm md:mt-14">
            <Sun className="absolute -right-4 -top-14 w-24 animate-[spin_40s_linear_infinite] text-rock" />
            <Cat variant="peek" className="absolute bottom-full left-8 w-24" />
            <div className="rotate-1 rounded-3xl bg-merino p-3 shadow-2xl">
              <img
                src="/logo.png"
                alt="Babbi's Dry Fish Mart logo: a cat holding up a fish"
                width="1254"
                height="1254"
                className="aspect-square w-full rounded-2xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop */}
      <main id="shop" className="mx-auto max-w-6xl px-4 pb-10 pt-16">
        <div className="relative mb-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <Cat variant="peek" delay={0.6} className="absolute bottom-full right-4 hidden w-14 sm:block" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search')}
            className="w-full rounded-xl border border-venice/20 bg-card px-4 py-3 outline-none focus:border-venice"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label={t('sort')}
            className="rounded-xl border border-venice/20 bg-card px-3 py-3 text-sm outline-none focus:border-venice"
          >
            <option value="default">{t('sortDefault')}</option>
            <option value="low">{t('sortLow')}</option>
            <option value="high">{t('sortHigh')}</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="h-4 w-4 accent-[#16587B]"
            />
            {t('inStockOnly')}
          </label>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                category === c.id
                  ? 'border-venice bg-venice text-merino'
                  : 'border-venice/20 bg-card hover:border-venice'
              }`}
            >
              {c[lang]}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <Cat variant="hero" className="w-36" />
            <p className="text-venice/70">{t('noResults')}</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>

      {/* Why us */}
      <section className="bg-rock/25">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="mb-16 font-display text-3xl text-venice">{t('whyTitle')}</h2>
          <div className="grid gap-12 md:grid-cols-3 md:gap-6">
            {why.map(([icon, title, desc, catPos, delay]) => (
              <div key={title} className="relative rounded-2xl bg-card p-6 shadow-sm">
                <Cat variant="peek" delay={delay} className={`absolute bottom-full ${catPos}`} />
                <div className="mb-3 text-3xl">{icon}</div>
                <h3 className="mb-1 text-lg font-semibold text-venice">{t(title)}</h3>
                <p className="text-sm leading-relaxed text-ink/75">{t(desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-16 bg-venice text-merino">
        <Cat variant="peek" delay={0.9} className="absolute bottom-full right-8 w-20" />
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-xl">{SHOP.name[lang]}</div>
            <div className="text-sm text-merino/75">{SHOP.market[lang]}</div>
            <div className="text-sm text-merino/75">{SHOP.phoneDisplay}</div>
            <p className="mt-3 max-w-md text-xs text-merino/65">{t('footerNote')}</p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start rounded-xl bg-[#25a244] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            💬 {t('chatWhatsapp')}
          </a>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('chatWhatsapp')}
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25a244] text-2xl text-white shadow-lg transition hover:scale-105"
      >
        💬
      </a>

      <CartDrawer
        onCheckout={() => {
          setOpen(false)
          setCheckingOut(true)
        }}
      />
      {checkingOut && <Checkout onClose={() => setCheckingOut(false)} />}
    </div>
  )
}
