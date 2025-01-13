import { ReactComponent as SearchIcon } from './images/search-icon.svg'

import './InputBar.scss'

interface IInputBarProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputBar = ({ value, onChange }: IInputBarProps) => {
  return (
    <label className='input-bar'>
      <input
        className='input-bar__input'
        type='text'
        placeholder='Search'
        value={value}
        onChange={onChange}
      />
      <SearchIcon className='input-bar__icon' />
    </label>
  )
}

export default InputBar
