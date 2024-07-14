import { Button } from '@mui/material'
import cn from 'classnames'

import './CustomButton.scss'

interface ICustomButtonProps {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const CustomButton = ({
  type = 'button',
  children,
  className,
}: ICustomButtonProps) => {
  return (
    <Button
      type={type}
      variant='contained'
      className={cn('custom-button', className)}
    >
      {children}
    </Button>
  )
}

export default CustomButton
