import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './i18n.jsx'
import { ProductsProvider } from './products.jsx'
import { CartProvider } from './cart.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LangProvider>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </LangProvider>
  </React.StrictMode>
)
