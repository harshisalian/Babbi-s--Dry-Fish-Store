import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { useProducts } from '../products.jsx'
import { CATEGORIES } from '../data/products.js'
import { SHOP } from '../config.js'
import Cat from './Cat.jsx'

// Admin page, opened at  /#/admin
// Designed for a phone: big inputs, one Save button per fish.

const BADGES = [
  ['', 'No badge'],
  ['best', 'Best seller'],
  ['new', 'New'],
  ['premium', 'Premium'],
]

const inputCls =
  'w-full rounded-xl border border-venice/25 bg-white px-3 py-3 text-base outline-none focus:border-venice'

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const EMPTY = {
  name_en: '',
  name_kn: '',
  category: 'fish',
  price_per_kg: '',
  stock_kg: '',
  badge: '',
  image_url: '',
  description_en: '',
  description_kn: '',
  tip_en: '',
  tip_kn: '',
  shelf_life_en: '',
  shelf_life_kn: '',
  alt_names: '',
  is_active: true,
}

const toDraft = (r) => ({
  name_en: r.name_en || '',
  name_kn: r.name_kn || '',
  category: r.category || 'fish',
  price_per_kg: String(r.price_per_kg ?? ''),
  stock_kg: String(r.stock_kg ?? ''),
  badge: r.badge || '',
  image_url: r.image_url || '',
  description_en: r.description_en || '',
  description_kn: r.description_kn || '',
  tip_en: r.tip_en || '',
  tip_kn: r.tip_kn || '',
  shelf_life_en: r.shelf_life_en || '',
  shelf_life_kn: r.shelf_life_kn || '',
  alt_names: (r.alt_names || []).join(', '),
  is_active: r.is_active !== false,
})

// Checks the form and turns it into the object we send to the database.
function toPayload(d) {
  const name_en = d.name_en.trim()
  if (!name_en) return { error: 'Please enter the fish name in English.' }

  const price = Number(d.price_per_kg)
  if (d.price_per_kg === '' || !Number.isInteger(price) || price <= 0) {
    return { error: 'Price per kg must be a whole number of rupees, like 700.' }
  }

  const stock = Number(d.stock_kg)
  if (d.stock_kg === '' || !Number.isFinite(stock) || stock < 0) {
    return { error: 'Stock must be 0 or more kg. Use 0 when it is sold out.' }
  }

  const clean = (v) => v.trim() || null
  return {
    data: {
      name_en,
      name_kn: clean(d.name_kn),
      category: d.category,
      price_per_kg: price,
      stock_kg: Math.round(stock * 100) / 100,
      badge: d.badge || null,
      image_url: clean(d.image_url),
      description_en: clean(d.description_en),
      description_kn: clean(d.description_kn),
      tip_en: clean(d.tip_en),
      tip_kn: clean(d.tip_kn),
      shelf_life_en: clean(d.shelf_life_en),
      shelf_life_kn: clean(d.shelf_life_kn),
      alt_names: d.alt_names
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      is_active: d.is_active,
    },
  }
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-venice">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink/50">{hint}</span>}
    </label>
  )
}

function Shell({ children, onSignOut }) {
  return (
    <div className="min-h-screen bg-merino">
      <header className="sticky top-0 z-40 border-b border-venice/10 bg-merino/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Cat variant="face" className="h-9 w-10" />
          <div className="leading-tight">
            <div className="font-display text-lg text-venice">{SHOP.name.en}</div>
            <div className="text-xs text-ink/60">Admin</div>
          </div>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <a href="#" className="font-medium text-venice underline">
              View shop
            </a>
            {onSignOut && (
              <button onClick={onSignOut} className="font-medium text-ink/70 underline">
                Sign out
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
    </div>
  )
}

function Notice({ title, children }) {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl bg-card p-6 text-center shadow-sm">
      <Cat variant="hero" className="mx-auto mb-3 w-32" />
      <h1 className="mb-2 font-display text-2xl text-venice">{title}</h1>
      <div className="space-y-2 text-sm text-ink/75">{children}</div>
    </div>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setErr('')
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) setErr('Wrong email or password. Please try again.')
    setBusy(false)
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-10 max-w-sm space-y-4 rounded-2xl bg-card p-6 shadow-sm">
      <h1 className="font-display text-2xl text-venice">Admin sign in</h1>
      <Field label="Email">
        <input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          required
        />
      </Field>
      <Field label="Password">
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputCls}
          required
        />
      </Field>
      {err && <p className="text-sm font-medium text-alert">{err}</p>}
      <button
        disabled={busy}
        className="w-full rounded-xl bg-venice py-3 font-semibold text-merino transition hover:brightness-110 disabled:opacity-60"
      >
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}

// The less-used fields, shared by the "edit" and "add" forms.
function DetailFields({ draft, setDraft }) {
  const set = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }))
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name (English)">
          <input value={draft.name_en} onChange={set('name_en')} className={inputCls} />
        </Field>
        <Field label="Name (Kannada)">
          <input value={draft.name_kn} onChange={set('name_kn')} className={inputCls} />
        </Field>
        <Field label="Category">
          <select value={draft.category} onChange={set('category')} className={inputCls}>
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>
                {c.en}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Badge">
          <select value={draft.badge} onChange={set('badge')} className={inputCls}>
            {BADGES.map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field
        label="Photo link"
        hint="A web link, or a file you put in public/images (for example /images/prawns.jpg). Leave empty to show the emoji."
      >
        <input value={draft.image_url} onChange={set('image_url')} className={inputCls} />
      </Field>
      <Field label="Other names people search for" hint="Separate with commas, e.g. bangude, bangda, ayala">
        <input value={draft.alt_names} onChange={set('alt_names')} className={inputCls} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Description (English)">
          <textarea rows={3} value={draft.description_en} onChange={set('description_en')} className={inputCls} />
        </Field>
        <Field label="Description (Kannada)">
          <textarea rows={3} value={draft.description_kn} onChange={set('description_kn')} className={inputCls} />
        </Field>
        <Field label="Cooking tip (English)">
          <textarea rows={2} value={draft.tip_en} onChange={set('tip_en')} className={inputCls} />
        </Field>
        <Field label="Cooking tip (Kannada)">
          <textarea rows={2} value={draft.tip_kn} onChange={set('tip_kn')} className={inputCls} />
        </Field>
        <Field label="Shelf life (English)">
          <input value={draft.shelf_life_en} onChange={set('shelf_life_en')} className={inputCls} />
        </Field>
        <Field label="Shelf life (Kannada)">
          <input value={draft.shelf_life_kn} onChange={set('shelf_life_kn')} className={inputCls} />
        </Field>
      </div>
    </div>
  )
}

function ProductRow({ row, onSaved }) {
  const [draft, setDraft] = useState(() => toDraft(row))
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) =>
    setDraft((d) => ({ ...d, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const dirty = JSON.stringify(draft) !== JSON.stringify(toDraft(row))

  const save = async () => {
    const { data, error } = toPayload(draft)
    if (error) return setMsg({ ok: false, text: error })
    setBusy(true)
    setMsg(null)
    const res = await supabase.from('products').update(data).eq('id', row.id).select()
    setBusy(false)
    if (res.error) return setMsg({ ok: false, text: res.error.message })
    if (!res.data?.length) return setMsg({ ok: false, text: 'Could not save. Please sign out and sign in again.' })
    setDraft(toDraft(res.data[0]))
    setMsg({ ok: true, text: 'Saved ✓' })
    onSaved()
  }

  return (
    <li className={`rounded-2xl border border-venice/10 bg-card p-4 shadow-sm ${draft.is_active ? '' : 'opacity-75'}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-lg leading-tight text-venice">{row.name_en}</div>
          {row.name_kn && <div className="text-xs text-ink/50">{row.name_kn}</div>}
        </div>
        <label className="flex shrink-0 items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={draft.is_active}
            onChange={set('is_active')}
            className="h-5 w-5 accent-[#16587B]"
          />
          Show on website
        </label>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Field label="Price per kg (₹)">
          <input inputMode="numeric" value={draft.price_per_kg} onChange={set('price_per_kg')} className={inputCls} />
        </Field>
        <Field label="Stock (kg)">
          <input inputMode="decimal" value={draft.stock_kg} onChange={set('stock_kg')} className={inputCls} />
        </Field>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={save}
          disabled={!dirty || busy}
          className="rounded-xl bg-venice px-5 py-2.5 text-sm font-semibold text-merino transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? 'Saving…' : 'Save changes'}
        </button>
        <button
          type="button"
          onClick={() => setDraft((d) => ({ ...d, stock_kg: '0' }))}
          className="rounded-xl border border-venice/25 px-4 py-2.5 text-sm font-medium text-venice hover:bg-venice/5"
        >
          Mark sold out
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="px-2 py-2.5 text-sm font-medium text-venice underline"
        >
          {open ? 'Hide details' : 'More details'}
        </button>
        {msg && <span className={`text-sm font-medium ${msg.ok ? 'text-emerald-700' : 'text-alert'}`}>{msg.text}</span>}
      </div>

      {open && (
        <div className="mt-4 border-t border-venice/10 pt-4">
          <DetailFields draft={draft} setDraft={setDraft} />
        </div>
      )}
    </li>
  )
}

function AddForm({ nextOrder, onAdded, onCancel }) {
  const [draft, setDraft] = useState(EMPTY)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const { data, error } = toPayload(draft)
    if (error) return setErr(error)
    setBusy(true)
    setErr('')
    const id = slugify(data.name_en) || `item-${Date.now()}`
    const res = await supabase.from('products').insert({ id, ...data, sort_order: nextOrder })
    setBusy(false)
    if (res.error) {
      return setErr(
        res.error.code === '23505' ? 'A fish with this name already exists in the list.' : res.error.message
      )
    }
    onAdded()
  }

  return (
    <form onSubmit={submit} className="mb-6 space-y-4 rounded-2xl border-2 border-venice/30 bg-card p-4 shadow-sm">
      <h2 className="font-display text-xl text-venice">Add a new fish</h2>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Price per kg (₹)">
          <input inputMode="numeric" value={draft.price_per_kg} onChange={set('price_per_kg')} className={inputCls} />
        </Field>
        <Field label="Stock (kg)">
          <input inputMode="decimal" value={draft.stock_kg} onChange={set('stock_kg')} className={inputCls} />
        </Field>
      </div>
      <DetailFields draft={draft} setDraft={setDraft} />
      {err && <p className="text-sm font-medium text-alert">{err}</p>}
      <div className="flex gap-2">
        <button
          disabled={busy}
          className="rounded-xl bg-venice px-5 py-2.5 text-sm font-semibold text-merino hover:brightness-110 disabled:opacity-60"
        >
          {busy ? 'Adding…' : 'Add fish'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-venice/25 px-4 py-2.5 text-sm font-medium text-venice hover:bg-venice/5"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function Products() {
  const [rows, setRows] = useState(null)
  const [err, setErr] = useState('')
  const [adding, setAdding] = useState(false)
  const { reload: reloadShop } = useProducts()

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('products').select('*').order('sort_order').order('created_at')
    if (error) setErr(error.message)
    else {
      setErr('')
      setRows(data)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // After every change, refresh the admin list AND the shop's list, so "View shop" shows the new rates.
  const refresh = () => {
    load()
    reloadShop()
  }

  if (err) return <p className="rounded-xl bg-alert/10 p-4 text-sm text-alert">Could not load products: {err}</p>
  if (!rows) return <p className="py-10 text-center text-ink/60">Loading…</p>

  const nextOrder = rows.reduce((m, r) => Math.max(m, r.sort_order || 0), 0) + 10

  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-venice">Prices and stock</h1>
          <p className="text-sm text-ink/60">Changes appear on the website straight away.</p>
        </div>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="shrink-0 rounded-xl bg-venice px-4 py-2.5 text-sm font-semibold text-merino hover:brightness-110"
          >
            + Add fish
          </button>
        )}
      </div>

      {adding && (
        <AddForm
          nextOrder={nextOrder}
          onCancel={() => setAdding(false)}
          onAdded={() => {
            setAdding(false)
            refresh()
          }}
        />
      )}

      {rows.length === 0 ? (
        <p className="py-10 text-center text-ink/60">No fish yet. Tap "+ Add fish" to add the first one.</p>
      ) : (
        <ul className="space-y-4">
          {rows.map((r) => (
            <ProductRow key={r.id} row={r} onSaved={refresh} />
          ))}
        </ul>
      )}
    </>
  )
}

export default function Admin() {
  const [session, setSession] = useState(undefined) // undefined = still checking
  const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) {
      setIsAdmin(null)
      return
    }
    let stale = false
    supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!stale) setIsAdmin(!error && Boolean(data))
      })
    return () => {
      stale = true
    }
  }, [session])

  const signOut = () => supabase.auth.signOut()

  if (!supabase) {
    return (
      <Shell>
        <Notice title="Admin is not set up yet">
          <p>The shop is showing sample fish because it is not connected to a database.</p>
          <p>Follow SUPABASE_SETUP.md, add the two values to your .env file, then restart the site.</p>
        </Notice>
      </Shell>
    )
  }

  if (session === undefined) {
    return (
      <Shell>
        <p className="py-10 text-center text-ink/60">Loading…</p>
      </Shell>
    )
  }

  if (!session) {
    return (
      <Shell>
        <Login />
      </Shell>
    )
  }

  if (isAdmin === null) {
    return (
      <Shell onSignOut={signOut}>
        <p className="py-10 text-center text-ink/60">Checking your account…</p>
      </Shell>
    )
  }

  if (!isAdmin) {
    return (
      <Shell onSignOut={signOut}>
        <Notice title="This account is not an admin">
          <p>You are signed in as {session.user.email}, but this account has not been given admin access.</p>
          <p>Add the account to the admins table (step 4 in SUPABASE_SETUP.md), then sign in again.</p>
        </Notice>
      </Shell>
    )
  }

  return (
    <Shell onSignOut={signOut}>
      <Products />
    </Shell>
  )
}
