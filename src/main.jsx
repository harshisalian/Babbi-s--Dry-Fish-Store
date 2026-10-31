import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './i18n.jsx'
import { CartProvider } from './cart.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LangProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </LangProvider>
  </React.StrictMode>
)
