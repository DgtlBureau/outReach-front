import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import App from './components/App'

import './index.css'
import './static/styles/reset.css'
import './static/styles/fonts.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </StrictMode>
)
