import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 🛒 Carrito
import { CartProvider } from './context/CardContext'

// 🔐 Auth
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)
 
