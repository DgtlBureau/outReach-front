import { ReactComponent as LogoIcon } from './images/logo.svg'

import './Header.scss'

const Header = () => {
  return (
    <header className='header'>
      <LogoIcon />
      <h1 className='header__name'>OutReach</h1>
    </header>
  )
}

export default Header
