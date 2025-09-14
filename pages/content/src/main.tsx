import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RootClassName } from './constants'
import './content.css'

const rootElement = document.createElement('div')
rootElement.className = RootClassName
document.body.appendChild(rootElement)

const shadowRoot = rootElement.attachShadow({ mode: 'open' })

ReactDOM.createRoot(shadowRoot).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
