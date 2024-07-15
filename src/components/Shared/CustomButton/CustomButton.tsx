import { Button } from '@mui/material'
import cn from 'classnames'

import './CustomButton.scss'

interface ICustomButtonProps {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'text' | 'outlined' | 'contained'
  onClick?: () => void
}

const CustomButton = ({
  type = 'button',
  children,
  className,
  variant = 'contained',
  onClick,
}: ICustomButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      variant={variant}
      className={cn(
        'custom-button',
        variant === 'outlined' ? 'custom-button__outlined' : '',
        className
      )}
    >
      {children}
    </Button>
  )
}

export default CustomButton
