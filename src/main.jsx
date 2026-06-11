import React from 'react'
import ReactDOM from 'react-dom/client'
import { InstUISettingsProvider, canvas } from '@instructure/ui'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InstUISettingsProvider theme={canvas}>
      <App />
    </InstUISettingsProvider>
  </React.StrictMode>
)
