import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TextContextProvider from './util/TextContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TextContextProvider>
    <App />
    </TextContextProvider>
  </React.StrictMode>,
)
