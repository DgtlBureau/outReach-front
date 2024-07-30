import { Button } from '@mui/material'
import cn from 'classnames'

import './CustomButton.scss'

interface ICustomButtonProps {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  style?: 'text' | 'outlined' | 'empty'
  onClick?: () => void
}

const CustomButton = ({
  type = 'button',
  children,
  className,
  style,
  onClick,
}: ICustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        'custom-button',
        style === 'outlined' ? 'custom-button--outlined' : '',
        style === 'empty' ? 'custom-button--empty' : '',
        className
      )}
    >
      {children}
    </button>
  )
}

export default CustomButton
