import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import { useCart, formatWeight } from '../cart.jsx'
import { CURRENCY, SHOP } from '../config.js'

const empty = { name: '', phone: '', address: '', pincode: '', city: '', notes: '', payment: 'cod' }

export default function Checkout({ onClose }) {
  const { t } = useLang()
  const { items, subtotal, deliveryFee, total, clear } = useCart()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = t('errName')
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = t('errPhone')
    if (form.address.trim().length < 6) e.address = t('errAddress')
    if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = t('errPin')
    if (form.city.trim().length < 2) e.city = t('errCity')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev) => {
    ev.preventDefault()
    if (!validate()) return

    // Message goes to the shop owner, so it is always written in English (with Kannada fish names).
    const lines = items.map(
      (i, n) => `${n + 1}. ${i.product.name.en} (${i.product.name.kn}) – ${formatWeight(i.grams)} – ${CURRENCY}${i.price}`
    )
    const msg = [
      `*New order – ${SHOP.name.en}*`,
      '',
      ...lines,
      '',
      `Subtotal: ${CURRENCY}${subtotal}`,
      `Delivery: ${deliveryFee === 0 ? 'FREE' : CURRENCY + deliveryFee}`,
      `*Total: ${CURRENCY}${total}*`,
      `Payment: ${form.payment === 'cod' ? 'Cash on delivery' : 'UPI'}`,
      '',
      `*Name:* ${form.name.trim()}`,
      `*Mobile:* ${form.phone.trim()}`,
      `*Address:* ${form.address.trim()}, ${form.city.trim()} – ${form.pincode.trim()}`,
      form.notes.trim() ? `*Notes:* ${form.notes.trim()}` : null,
    ]
      .filter((l) => l !== null)
      .join('\n')

    window.open(`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    clear()
    setForm(empty)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <form
        onSubmit={submit}
        noValidate
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-card p-6 shadow-2xl sm:rounded-3xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-venice">{t('checkout')}</h2>
          <button type="button" onClick={onClose} className="text-sm font-medium text-venice underline">
            {t('back')}
          </button>
        </div>

        <div className="space-y-3">
          <Field label={t('name')} error={errors.name}>
            <input value={form.name} onChange={set('name')} autoComplete="name" className={inputCls(errors.name)} />
          </Field>
          <Field label={t('phone')} error={errors.phone}>
            <input
              value={form.phone}
              onChange={set('phone')}
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel-national"
              className={inputCls(errors.phone)}
            />
          </Field>
          <Field label={t('address')} error={errors.address}>
            <textarea
              value={form.address}
              onChange={set('address')}
              rows={2}
              autoComplete="street-address"
              className={inputCls(errors.address)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('city')} error={errors.city}>
              <input value={form.city} onChange={set('city')} autoComplete="address-level2" className={inputCls(errors.city)} />
            </Field>
            <Field label={t('pincode')} error={errors.pincode}>
              <input
                value={form.pincode}
                onChange={set('pincode')}
                inputMode="numeric"
                maxLength={6}
                autoComplete="postal-code"
                className={inputCls(errors.pincode)}
              />
            </Field>
          </div>
          <Field label={t('notes')}>
            <input value={form.notes} onChange={set('notes')} className={inputCls()} />
          </Field>

          <fieldset>
            <legend className="mb-1 text-sm font-medium">{t('payment')}</legend>
            {['cod', 'upi'].map((p) => (
              <label key={p} className="mb-2 flex cursor-pointer items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm">
                <input
                  type="radio"
                  name="payment"
                  value={p}
                  checked={form.payment === p}
                  onChange={set('payment')}
                  className="accent-[#16587B]"
                />
                {t(p)}
              </label>
            ))}
          </fieldset>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
          <span className="text-sm text-black/60">
            {items.length} {t('items')}
          </span>
          <span className="text-xl font-bold">
            {t('total')}: {CURRENCY}
            {total}
          </span>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-[#25a244] py-3.5 font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
        >
          {t('placeOrder')}
        </button>
      </form>
    </div>
  )
}

const inputCls = (err) =>
  `w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-venice ${
    err ? 'border-alert' : 'border-black/10'
  }`

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-alert">{error}</span>}
    </label>
  )
}
