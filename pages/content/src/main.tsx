import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RootClassName } from './constants'

const rootElement = document.createElement('div')
rootElement.className = RootClassName
document.body.appendChild(rootElement)

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
