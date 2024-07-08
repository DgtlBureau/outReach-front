import { TextField } from '@mui/material'
import React from 'react'

import './CustomInput.scss'
import classNames from 'classnames'

interface ICustomInputProps {
  label: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  className?: string
}

const CustomInput = ({
  label,
  className,
  value,
  type,
  onChange,
}: ICustomInputProps) => {
  return (
    <TextField
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      className={classNames('custom-input', className)}
    />
  )
}

export default CustomInput
