# Dry Fish Store (MVP)

A bilingual (English + Kannada) online store for a dry fish business. Customers see the rate per kg, pick a weight (250 g / 500 g / 1 kg / custom), add to cart, and send the order to the shop on WhatsApp.

## Run it

```bash
npm install
npm run dev      # open the printed local address
npm run build    # production build in dist/
```

## Make it your mom's shop

1. `src/config.js` – shop name, WhatsApp number (country code, no `+`), market address, delivery charge, free-delivery limit, minimum order.
2. `src/data/products.js` – fish names, Kannada names, price per kg, stock in kg, description. Sample data only; replace with real rates. Set `stockKg: 0` to mark a fish out of stock.
3. Have a Kannada speaker check the Kannada names and text in `products.js` and `src/i18n.jsx`.

## What works now

- Product catalogue with price per kg and live price for the chosen weight
- Search by English, Kannada or local names, category filter, sort by price, in-stock filter
- Cart (saved in the browser), weight stepper, delivery charge and free-delivery threshold, minimum order
- Checkout form with validation (10-digit mobile, 6-digit PIN), COD or UPI
- Order is sent as a formatted WhatsApp message to the shop
- English / Kannada switch

## Not built yet (next steps)

1. Real product photos
2. Admin page so rates and stock can be edited without touching code (Supabase)
3. Online payment (Razorpay) with server-side verification
4. Order storage, customer accounts, order tracking
5. AI features (chatbot, semantic search) once the basics are live

## Deploy

Push to GitHub and import the repo in Vercel (framework: Vite). No environment variables needed yet.

## Product photos

Put compressed photos (under 200 KB each) in `public/images/` and set `image: '/images/prawns.jpg'` on the product in `src/data/products.js`. Products without a photo show the emoji placeholder.

## Admin page and database (added)

- Open `/#/admin` to sign in and change prices, stock, photos and descriptions, hide a fish, or add a new one.
- Setup steps (about 20 minutes): see `SUPABASE_SETUP.md`. Until then the shop shows the sample fish from `src/data/products.js`.
- New files: `src/products.jsx` (loads the fish), `src/lib/supabase.js`, `src/components/Admin.jsx`, `supabase/schema.sql`, `supabase/seed.sql`, `.env.example`.
- After pulling this update run `npm install` once.

Remaining ideas, in order: save orders in the database, upload photos from the admin page, Razorpay payments, order tracking, AI helpers.
