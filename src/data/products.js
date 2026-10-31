// SAMPLE DATA – replace names/prices/stock with your mom's real rates.
// pricePerKg is in rupees. stockKg is the quantity currently available.
// Please have someone who speaks Kannada fluently check the Kannada names/descriptions.
export const CATEGORIES = [
  { id: 'all', en: 'All', kn: 'ಎಲ್ಲಾ' },
  { id: 'fish', en: 'Dry Fish', kn: 'ಒಣ ಮೀನು' },
  { id: 'prawn', en: 'Prawns', kn: 'ಸಿಗಡಿ' },
  { id: 'special', en: 'Specials', kn: 'ವಿಶೇಷ' },
]

export const PRODUCTS = [
  {
    id: 'prawn-dry',
    category: 'prawn',
    emoji: '🦐',
    hue: 14,
    name: { en: 'Dried Prawns', kn: 'ಒಣ ಸಿಗಡಿ' },
    alt: ['sigadi', 'shrimp', 'konju'],
    pricePerKg: 1400,
    stockKg: 12,
    badge: 'best',
    desc: {
      en: 'Cleaned, sun-dried prawns. Great in chutney powder, curries and pulao.',
      kn: 'ಸ್ವಚ್ಛಗೊಳಿಸಿದ, ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿದ ಸಿಗಡಿ. ಚಟ್ನಿ ಪುಡಿ, ಸಾರು ಮತ್ತು ಪುಲಾವ್‌ಗೆ ಉತ್ತಮ.',
    },
  },
  {
    id: 'bombay-duck',
    category: 'special',
    emoji: '🐟',
    hue: 32,
    name: { en: 'Bombay Duck (Bombil)', kn: 'ಬೊಂಬಿಲ್' },
    alt: ['bombil', 'bummalo'],
    pricePerKg: 900,
    stockKg: 8,
    badge: 'new',
    desc: {
      en: 'Soft, fully dried Bombay duck. Best fried crisp or added to curries.',
      kn: 'ಮೃದುವಾದ, ಸಂಪೂರ್ಣ ಒಣಗಿಸಿದ ಬೊಂಬಿಲ್. ಕರಿದು ಅಥವಾ ಸಾರಿನಲ್ಲಿ ಹಾಕಿ ಸವಿಯಿರಿ.',
    },
  },
  {
    id: 'mackerel-dry',
    category: 'fish',
    emoji: '🐟',
    hue: 200,
    name: { en: 'Dried Mackerel', kn: 'ಒಣ ಬಂಗುಡೆ' },
    alt: ['bangude', 'bangda', 'ayala'],
    pricePerKg: 700,
    stockKg: 20,
    badge: 'best',
    desc: {
      en: 'Salted and sun-dried mackerel. Rich, strong flavour for coastal curries.',
      kn: 'ಉಪ್ಪು ಹಚ್ಚಿ ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿದ ಬಂಗುಡೆ. ಕರಾವಳಿ ಶೈಲಿಯ ಸಾರಿಗೆ ಅತ್ಯುತ್ತಮ.',
    },
  },
  {
    id: 'sardine-dry',
    category: 'fish',
    emoji: '🐟',
    hue: 190,
    name: { en: 'Dried Sardine', kn: 'ಒಣ ಬೂತಾಯಿ' },
    alt: ['boothai', 'mathi', 'chala'],
    pricePerKg: 450,
    stockKg: 25,
    badge: null,
    desc: {
      en: 'Small sun-dried sardines. Budget-friendly and perfect for fry or thokku.',
      kn: 'ಸಣ್ಣ ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿದ ಬೂತಾಯಿ. ಕಡಿಮೆ ಬೆಲೆ, ಫ್ರೈ ಮತ್ತು ತೊಕ್ಕಿಗೆ ಸೂಕ್ತ.',
    },
  },
  {
    id: 'seer-dry',
    category: 'special',
    emoji: '🐠',
    hue: 8,
    name: { en: 'Dried Seer Fish', kn: 'ಒಣ ಅಂಜಲ್' },
    alt: ['anjal', 'surmai', 'king fish', 'vanjaram'],
    pricePerKg: 1800,
    stockKg: 5,
    badge: 'premium',
    desc: {
      en: 'Thick seer fish slices, carefully dried. A premium pick for special meals.',
      kn: 'ದಪ್ಪ ಅಂಜಲ್ ತುಂಡುಗಳು, ಜಾಗರೂಕತೆಯಿಂದ ಒಣಗಿಸಲಾಗಿದೆ. ವಿಶೇಷ ಊಟಕ್ಕೆ ಉತ್ತಮ ಆಯ್ಕೆ.',
    },
  },
  {
    id: 'pomfret-dry',
    category: 'fish',
    emoji: '🐠',
    hue: 45,
    name: { en: 'Dried Pomfret', kn: 'ಒಣ ಮಾಂಜಿ' },
    alt: ['manji', 'paplet', 'pomfret'],
    pricePerKg: 1600,
    stockKg: 0,
    badge: null,
    desc: {
      en: 'Flat, mild-tasting pomfret, dried whole. Currently out of stock.',
      kn: 'ಸೌಮ್ಯ ರುಚಿಯ ಮಾಂಜಿ, ಪೂರ್ಣವಾಗಿ ಒಣಗಿಸಲಾಗಿದೆ. ಸದ್ಯ ಲಭ್ಯವಿಲ್ಲ.',
    },
  },
]
