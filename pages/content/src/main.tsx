import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RootClassName } from './constants'

// 创建根元素
const rootElement = document.createElement('div')
rootElement.className = RootClassName
document.body.appendChild(rootElement)

// 渲染 React 应用
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
