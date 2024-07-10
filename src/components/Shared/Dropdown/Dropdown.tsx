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

const Dropdown = ({ isOpen, onClose, activator, children }: IDropdownProps) => {
  return (
    <ClickAwayListener onClickAway={onClose}>
      <div className='dropdown'>
        {activator}
        <motion.div
          transition={{ duration: 0.25 }}
          initial={{ display: 'none' }}
          animate={{
            display: 'block',
            clipPath: isOpen
              ? 'circle(700px at 100% 0)'
              : 'circle(0% at 92% -10px)',
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
