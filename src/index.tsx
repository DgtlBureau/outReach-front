import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import App from './components/App'

import './index.css'
import './static/styles/reset.css'
import './static/styles/fonts.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      networkMode: 'always',
    },
  },
})

root.render(
  // <StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
  // </StrictMode>
)
