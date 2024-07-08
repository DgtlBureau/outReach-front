import { Route, Routes, useLocation } from 'react-router-dom'
import ProductPage from './ProductPage/ProductPage'
import Navigation from './Navigation/Navigation'
import LeadsPage from './LeadsPage/LeadsPage'
import HomePage from './HomePage/HomePage'
import { useEffect } from 'react'

import './App.scss'
import ChatPage from './ChatPage/ChatPage'

function App() {
  useEffect(() => {
    const isThemeDark = JSON.parse(
      localStorage.getItem('isThemeDark') || 'false'
    )
    if (isThemeDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <div className='app'>
      <Navigation />
      <div className='app__routes-container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/leads' element={<LeadsPage />} />
          <Route path='/leads/chat' element={<ChatPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
