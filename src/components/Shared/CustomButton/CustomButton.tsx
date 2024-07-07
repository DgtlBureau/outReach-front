import { Button } from '@mui/material'
import cn from 'classnames'

import './CustomButton.scss'

interface ICustomButtonProps {
  children: React.ReactNode
  className?: string
}

const CustomButton = ({ children, className }: ICustomButtonProps) => {
  return (
    <Button variant='contained' className={cn('custom-button', className)}>
      {children}
    </Button>
  )
}

export default CustomButton
