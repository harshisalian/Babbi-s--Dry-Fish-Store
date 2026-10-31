// SAMPLE DATA – replace names/prices/stock/tips with your mom's real details.
// pricePerKg is in rupees. stockKg is the quantity currently available (0 = out of stock).
// image: put the photo in public/images/ and use '/images/your-file.jpg' (null shows an emoji placeholder).
// tip and shelfLife are shown on the product detail view. Confirm the shelf life with your mom.
// Please have someone who speaks Kannada fluently check every Kannada text.
export const CATEGORIES = [
  { id: 'all', en: 'All', kn: 'ಎಲ್ಲಾ' },
  { id: 'fish', en: 'Dry Fish', kn: 'ಒಣ ಮೀನು' },
  { id: 'prawn', en: 'Prawns', kn: 'ಸಿಗಡಿ' },
  { id: 'special', en: 'Specials', kn: 'ವಿಶೇಷ' },
]

const SHELF = {
  en: 'Best within 3 months if stored airtight',
  kn: 'ಗಾಳಿಯಾಡದಂತೆ ಇಟ್ಟರೆ 3 ತಿಂಗಳೊಳಗೆ ಬಳಸಿ',
}

export const PRODUCTS = [
  {
    id: 'prawn-dry',
    category: 'prawn',
    emoji: '🦐',
    image: null, // e.g. '/images/prawns.jpg'
    name: { en: 'Dried Prawns', kn: 'ಒಣ ಸಿಗಡಿ' },
    alt: ['sigadi', 'shrimp', 'konju'],
    pricePerKg: 1400,
    stockKg: 12,
    badge: 'best',
    desc: {
      en: 'Cleaned, sun-dried prawns. Great in chutney powder, curries and pulao.',
      kn: 'ಸ್ವಚ್ಛಗೊಳಿಸಿದ, ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿದ ಸಿಗಡಿ. ಚಟ್ನಿ ಪುಡಿ, ಸಾರು ಮತ್ತು ಪುಲಾವ್‌ಗೆ ಉತ್ತಮ.',
    },
    tip: {
      en: 'Dry-roast lightly and grind with coconut and chillies for chutney powder.',
      kn: 'ಸ್ವಲ್ಪ ಹುರಿದು, ತೆಂಗಿನಕಾಯಿ ಮತ್ತು ಮೆಣಸಿನಕಾಯಿಯೊಂದಿಗೆ ರುಬ್ಬಿ ಚಟ್ನಿ ಪುಡಿ ಮಾಡಿ.',
    },
    shelfLife: SHELF,
  },
  {
    id: 'bombay-duck',
    category: 'special',
    emoji: '🐟',
    image: null,
    name: { en: 'Bombay Duck (Bombil)', kn: 'ಬೊಂಬಿಲ್' },
    alt: ['bombil', 'bummalo'],
    pricePerKg: 900,
    stockKg: 8,
    badge: 'new',
    desc: {
      en: 'Soft, fully dried Bombay duck. Best fried crisp or added to curries.',
      kn: 'ಮೃದುವಾದ, ಸಂಪೂರ್ಣ ಒಣಗಿಸಿದ ಬೊಂಬಿಲ್. ಕರಿದು ಅಥವಾ ಸಾರಿನಲ್ಲಿ ಹಾಕಿ ಸವಿಯಿರಿ.',
    },
    tip: {
      en: 'Shallow fry until crisp and serve with rice and rasam or dal.',
      kn: 'ಗರಿಗರಿಯಾಗುವವರೆಗೆ ಕರಿದು, ಅನ್ನ ಮತ್ತು ಸಾರಿನೊಂದಿಗೆ ಬಡಿಸಿ.',
    },
    shelfLife: SHELF,
  },
  {
    id: 'mackerel-dry',
    category: 'fish',
    emoji: '🐟',
    image: null,
    name: { en: 'Dried Mackerel', kn: 'ಒಣ ಬಂಗುಡೆ' },
    alt: ['bangude', 'bangda', 'ayala'],
    pricePerKg: 700,
    stockKg: 20,
    badge: 'best',
    desc: {
      en: 'Salted and sun-dried mackerel. Rich, strong flavour for coastal curries.',
      kn: 'ಉಪ್ಪು ಹಚ್ಚಿ ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿದ ಬಂಗುಡೆ. ಕರಾವಳಿ ಶೈಲಿಯ ಸಾರಿಗೆ ಅತ್ಯುತ್ತಮ.',
    },
    tip: {
      en: 'Soak in warm water for 15 minutes to remove extra salt, then cook in a tamarind curry.',
      kn: 'ಹೆಚ್ಚುವರಿ ಉಪ್ಪು ಹೋಗಲು 15 ನಿಮಿಷ ಬೆಚ್ಚಗಿನ ನೀರಿನಲ್ಲಿ ನೆನೆಸಿ, ನಂತರ ಹುಣಸೆಹಣ್ಣಿನ ಸಾರಿನಲ್ಲಿ ಬೇಯಿಸಿ.',
    },
    shelfLife: SHELF,
  },
  {
    id: 'sardine-dry',
    category: 'fish',
    emoji: '🐟',
    image: null,
    name: { en: 'Dried Sardine', kn: 'ಒಣ ಬೂತಾಯಿ' },
    alt: ['boothai', 'mathi', 'chala'],
    pricePerKg: 450,
    stockKg: 25,
    badge: null,
    desc: {
      en: 'Small sun-dried sardines. Budget-friendly and perfect for fry or thokku.',
      kn: 'ಸಣ್ಣ ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿದ ಬೂತಾಯಿ. ಕಡಿಮೆ ಬೆಲೆ, ಫ್ರೈ ಮತ್ತು ತೊಕ್ಕಿಗೆ ಸೂಕ್ತ.',
    },
    tip: {
      en: 'Fry with onion and chilli powder, or make a spicy thokku.',
      kn: 'ಈರುಳ್ಳಿ ಮತ್ತು ಮೆಣಸಿನ ಪುಡಿಯೊಂದಿಗೆ ಕರಿಯಿರಿ, ಅಥವಾ ಖಾರದ ತೊಕ್ಕು ಮಾಡಿ.',
    },
    shelfLife: SHELF,
  },
  {
    id: 'seer-dry',
    category: 'special',
    emoji: '🐠',
    image: null,
    name: { en: 'Dried Seer Fish', kn: 'ಒಣ ಅಂಜಲ್' },
    alt: ['anjal', 'surmai', 'king fish', 'vanjaram'],
    pricePerKg: 1800,
    stockKg: 5,
    badge: 'premium',
    desc: {
      en: 'Thick seer fish slices, carefully dried. A premium pick for special meals.',
      kn: 'ದಪ್ಪ ಅಂಜಲ್ ತುಂಡುಗಳು, ಜಾಗರೂಕತೆಯಿಂದ ಒಣಗಿಸಲಾಗಿದೆ. ವಿಶೇಷ ಊಟಕ್ಕೆ ಉತ್ತಮ ಆಯ್ಕೆ.',
    },
    tip: {
      en: 'Soak briefly, then shallow fry with masala or add to a coconut curry.',
      kn: 'ಸ್ವಲ್ಪ ಹೊತ್ತು ನೆನೆಸಿ, ಮಸಾಲೆಯೊಂದಿಗೆ ಕರಿಯಿರಿ ಅಥವಾ ತೆಂಗಿನಕಾಯಿ ಸಾರಿಗೆ ಹಾಕಿ.',
    },
    shelfLife: SHELF,
  },
  {
    id: 'pomfret-dry',
    category: 'fish',
    emoji: '🐠',
    image: null,
    name: { en: 'Dried Pomfret', kn: 'ಒಣ ಮಾಂಜಿ' },
    alt: ['manji', 'paplet', 'pomfret'],
    pricePerKg: 1600,
    stockKg: 0,
    badge: null,
    desc: {
      en: 'Flat, mild-tasting pomfret, dried whole. Currently out of stock.',
      kn: 'ಸೌಮ್ಯ ರುಚಿಯ ಮಾಂಜಿ, ಪೂರ್ಣವಾಗಿ ಒಣಗಿಸಲಾಗಿದೆ. ಸದ್ಯ ಲಭ್ಯವಿಲ್ಲ.',
    },
    tip: {
      en: 'Shallow fry whole with a little turmeric and salt.',
      kn: 'ಸ್ವಲ್ಪ ಅರಿಶಿನ ಮತ್ತು ಉಪ್ಪಿನೊಂದಿಗೆ ಪೂರ್ತಿ ಕರಿಯಿರಿ.',
    },
    shelfLife: SHELF,
  },
]
