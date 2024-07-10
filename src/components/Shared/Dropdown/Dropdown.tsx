import { ClickAwayListener } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'

import './Dropdown.scss'

interface IDropdownProps {
  children: React.ReactNode
  activator: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const dropdown = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

const Dropdown = ({ isOpen, onClose, activator, children }: IDropdownProps) => {
  return (
    <ClickAwayListener onClickAway={onClose}>
      <div className='dropdown'>
        {activator}
        <motion.div
          initial={{ display: 'none' }}
          animate={{
            display: 'block',
            clipPath: isOpen
              ? 'circle(1000px at 100% 100%)'
              : 'circle(0 at 92% -10px)',
          }}
          className='dropdown__content'
        >
          {children}
        </motion.div>
      </div>
    </ClickAwayListener>
  )
}

export default Dropdown
