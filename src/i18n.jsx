import { createContext, useContext, useEffect, useState } from 'react'

const STRINGS = {
  en: {
    tagline: 'Sun-dried fish, straight from the market',
    heroTitle: 'Authentic dry fish, delivered to your door',
    heroSub: 'Check today\'s rates, pick your weight and order in minutes. Cleaned, sun-dried and packed fresh.',
    shopNow: 'Shop now',
    search: 'Search fish (English or ಕನ್ನಡ)',
    sort: 'Sort',
    sortDefault: 'Featured',
    sortLow: 'Price: low to high',
    sortHigh: 'Price: high to low',
    inStockOnly: 'In stock only',
    perKg: 'per kg',
    add: 'Add to cart',
    added: 'Added ✓',
    outOfStock: 'Out of stock',
    only: 'Only {n} kg left',
    custom: 'Custom',
    grams: 'grams',
    cart: 'Cart',
    yourCart: 'Your cart',
    emptyCart: 'Your cart is empty',
    emptyCartSub: 'Add some fish to get started.',
    remove: 'Remove',
    subtotal: 'Subtotal',
    delivery: 'Delivery',
    free: 'FREE',
    total: 'Total',
    freeAbove: 'Add {n} more for free delivery',
    minOrder: 'Minimum order is {n}',
    checkout: 'Checkout',
    back: 'Back',
    name: 'Full name',
    phone: 'Mobile number',
    address: 'Delivery address',
    pincode: 'PIN code',
    city: 'City',
    notes: 'Delivery instructions (optional)',
    payment: 'Payment',
    cod: 'Cash on delivery',
    upi: 'UPI (we\'ll share the UPI ID on WhatsApp)',
    placeOrder: 'Place order on WhatsApp',
    errName: 'Please enter your name',
    errPhone: 'Enter a valid 10-digit mobile number',
    errAddress: 'Please enter your address',
    errPin: 'Enter a valid 6-digit PIN code',
    errCity: 'Please enter your city',
    noResults: 'No fish found. Try another name.',
    whyTitle: 'Why customers choose us',
    why1t: 'Sun-dried, no shortcuts',
    why1d: 'Traditionally dried and cleaned in our own market stall.',
    why2t: 'Fair, clear prices',
    why2d: 'See the rate per kg and pay for exactly the weight you pick.',
    why3t: 'Order in minutes',
    why3d: 'Add to cart and confirm on WhatsApp. We pack and ship across India.',
    contact: 'Contact us',
    chatWhatsapp: 'Chat on WhatsApp',
    footerNote: 'Rates may change daily. We confirm your final total on WhatsApp.',
    badge_best: 'Best seller',
    badge_new: 'New',
    badge_premium: 'Premium',
    orderGreeting: 'Hello! I would like to place an order:',
    items: 'items',
  },
  kn: {
    tagline: 'ಮಾರುಕಟ್ಟೆಯಿಂದ ನೇರವಾಗಿ ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿದ ಮೀನು',
    heroTitle: 'ಅಸಲಿ ಒಣ ಮೀನು, ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ',
    heroSub: 'ಇಂದಿನ ದರ ನೋಡಿ, ತೂಕ ಆಯ್ಕೆ ಮಾಡಿ, ನಿಮಿಷಗಳಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿ. ಸ್ವಚ್ಛಗೊಳಿಸಿ, ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿ, ತಾಜಾವಾಗಿ ಪ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತದೆ.',
    shopNow: 'ಈಗಲೇ ಖರೀದಿಸಿ',
    search: 'ಮೀನು ಹುಡುಕಿ (English ಅಥವಾ ಕನ್ನಡ)',
    sort: 'ವಿಂಗಡಿಸಿ',
    sortDefault: 'ವಿಶೇಷ',
    sortLow: 'ಬೆಲೆ: ಕಡಿಮೆಯಿಂದ ಹೆಚ್ಚು',
    sortHigh: 'ಬೆಲೆ: ಹೆಚ್ಚಿನಿಂದ ಕಡಿಮೆ',
    inStockOnly: 'ಲಭ್ಯವಿರುವುದು ಮಾತ್ರ',
    perKg: 'ಪ್ರತಿ ಕೆಜಿ',
    add: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    added: 'ಸೇರಿಸಲಾಗಿದೆ ✓',
    outOfStock: 'ಲಭ್ಯವಿಲ್ಲ',
    only: 'ಕೇವಲ {n} ಕೆಜಿ ಉಳಿದಿದೆ',
    custom: 'ಬೇರೆ ತೂಕ',
    grams: 'ಗ್ರಾಂ',
    cart: 'ಕಾರ್ಟ್',
    yourCart: 'ನಿಮ್ಮ ಕಾರ್ಟ್',
    emptyCart: 'ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ',
    emptyCartSub: 'ಪ್ರಾರಂಭಿಸಲು ಮೀನು ಸೇರಿಸಿ.',
    remove: 'ತೆಗೆಯಿರಿ',
    subtotal: 'ಉಪ ಮೊತ್ತ',
    delivery: 'ಡೆಲಿವರಿ',
    free: 'ಉಚಿತ',
    total: 'ಒಟ್ಟು',
    freeAbove: 'ಉಚಿತ ಡೆಲಿವರಿಗೆ ಇನ್ನೂ {n} ಸೇರಿಸಿ',
    minOrder: 'ಕನಿಷ್ಠ ಆರ್ಡರ್ {n}',
    checkout: 'ಚೆಕ್‌ಔಟ್',
    back: 'ಹಿಂದೆ',
    name: 'ಪೂರ್ಣ ಹೆಸರು',
    phone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    address: 'ಡೆಲಿವರಿ ವಿಳಾಸ',
    pincode: 'ಪಿನ್ ಕೋಡ್',
    city: 'ನಗರ',
    notes: 'ಡೆಲಿವರಿ ಸೂಚನೆಗಳು (ಐಚ್ಛಿಕ)',
    payment: 'ಪಾವತಿ',
    cod: 'ಡೆಲಿವರಿ ಸಮಯದಲ್ಲಿ ನಗದು',
    upi: 'UPI (UPI ID ಅನ್ನು WhatsApp ನಲ್ಲಿ ಕಳುಹಿಸುತ್ತೇವೆ)',
    placeOrder: 'WhatsApp ನಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿ',
    errName: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ನಮೂದಿಸಿ',
    errPhone: 'ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ',
    errAddress: 'ದಯವಿಟ್ಟು ವಿಳಾಸ ನಮೂದಿಸಿ',
    errPin: 'ಸರಿಯಾದ 6 ಅಂಕಿಯ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ',
    errCity: 'ದಯವಿಟ್ಟು ನಗರ ನಮೂದಿಸಿ',
    noResults: 'ಯಾವುದೇ ಮೀನು ಸಿಗಲಿಲ್ಲ. ಬೇರೆ ಹೆಸರು ಪ್ರಯತ್ನಿಸಿ.',
    whyTitle: 'ಗ್ರಾಹಕರು ನಮ್ಮನ್ನು ಏಕೆ ಆರಿಸುತ್ತಾರೆ',
    why1t: 'ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿದ, ಶಾರ್ಟ್‌ಕಟ್ ಇಲ್ಲ',
    why1d: 'ನಮ್ಮದೇ ಮಾರುಕಟ್ಟೆ ಅಂಗಡಿಯಲ್ಲಿ ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ಒಣಗಿಸಿ, ಸ್ವಚ್ಛಗೊಳಿಸಲಾಗುತ್ತದೆ.',
    why2t: 'ಸ್ಪಷ್ಟ, ನ್ಯಾಯಯುತ ಬೆಲೆ',
    why2d: 'ಕೆಜಿ ದರ ನೋಡಿ, ನೀವು ಆರಿಸಿದ ತೂಕಕ್ಕೆ ಮಾತ್ರ ಪಾವತಿಸಿ.',
    why3t: 'ನಿಮಿಷಗಳಲ್ಲಿ ಆರ್ಡರ್',
    why3d: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ, WhatsApp ನಲ್ಲಿ ದೃಢೀಕರಿಸಿ. ಭಾರತದಾದ್ಯಂತ ಕಳುಹಿಸುತ್ತೇವೆ.',
    contact: 'ಸಂಪರ್ಕಿಸಿ',
    chatWhatsapp: 'WhatsApp ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ',
    footerNote: 'ದರಗಳು ಪ್ರತಿದಿನ ಬದಲಾಗಬಹುದು. ಅಂತಿಮ ಮೊತ್ತವನ್ನು WhatsApp ನಲ್ಲಿ ದೃಢೀಕರಿಸುತ್ತೇವೆ.',
    badge_best: 'ಹೆಚ್ಚು ಮಾರಾಟ',
    badge_new: 'ಹೊಸದು',
    badge_premium: 'ಪ್ರೀಮಿಯಂ',
    orderGreeting: 'ನಮಸ್ಕಾರ! ನಾನು ಈ ಆರ್ಡರ್ ಮಾಡಲು ಬಯಸುತ್ತೇನೆ:',
    items: 'ವಸ್ತುಗಳು',
  },
}

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('lang') || 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {}
    document.documentElement.lang = lang
  }, [lang])

  const t = (key, vars = {}) => {
    let s = STRINGS[lang][key] ?? STRINGS.en[key] ?? key
    for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v)
    return s
  }

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
