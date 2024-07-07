import { TextField } from '@mui/material'
import React from 'react'

import './CustomInput.scss'

interface ICustomInputProps {
  label: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}

const CustomInput = ({ label, value, type, onChange }: ICustomInputProps) => {
  return (
    <TextField
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      className='custom-input'
    />
  )
}

export default CustomInput
