import { MaterialDesignContent, SnackbarProvider } from 'notistack'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './ProductPage/ProductPage'
import Navigation from './Navigation/Navigation'
import LeadsPage from './LeadsPage/LeadsPage'
import { useEffect, useState } from 'react'
import ChatPage from './ChatPage/ChatPage'
import HomePage from './HomePage/HomePage'
import { motion } from 'framer-motion'
import { styled } from '@mui/material'

import './App.scss'
import Header from './Header/Header'
import InsightsPage from './InsightsPage/InsightsPage'
import InsightsChat from './InsightsPage/InsightsChat/InsightsChat'
import OneToOne from './OneToOne/OneToOne'

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-root': {
    fontFamily: 'Inter',
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: '#2D7738',
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: 300,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#970C0C',
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: 300,
  },
}))

const variants = {
  open: {
    width: '265px',
  },
  closed: { width: '60px', padding: 0 },
}

function App() {
  const [isNavigationExpanded, setIsNavigationExpanded] = useState(false)

  const toggleIsNavigationExpanded = () => {
    setIsNavigationExpanded(!isNavigationExpanded)
    localStorage.setItem(
      'isNavigationExpanded',
      JSON.stringify(!isNavigationExpanded)
    )
  }

  useEffect(() => {
    const isThemeDark = JSON.parse(
      localStorage.getItem('isThemeDark') || 'false'
    )
    if (isThemeDark) {
      document.documentElement.classList.add('dark')
    }
    const isNavigationExpanded = JSON.parse(
      localStorage.getItem('isNavigationExpanded') || 'false'
    )
    setIsNavigationExpanded(isNavigationExpanded)
  }, [])

  return (
    <div className='app'>
      <div className='app__header'>
        <Header />
      </div>
      <div className='app__content'>
        <motion.div
          variants={variants}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          animate={isNavigationExpanded ? 'open' : 'closed'}
          className={'app__navigation-wrapper'}
        >
          <Navigation
            isExpand={isNavigationExpanded}
            toggleExpand={toggleIsNavigationExpanded}
          />
        </motion.div>
        <div className='app__routes-container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/product' element={<ProductPage />} />
            <Route path='/insights' element={<InsightsPage />} />
            <Route path='/insights/:id/chat' element={<InsightsChat />} />
            <Route path='/leads' element={<LeadsPage />} />
            <Route path='/leads/:id/chat' element={<ChatPage />} />
            <Route path='/one-to-one' element={<OneToOne />} />
          </Routes>
        </div>
        <SnackbarProvider
          Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
          }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        />
      </div>
    </div>
  )
}

export default App
