import { ReactComponent as AnalyticsIcon } from './images/analytics.svg'
import { ReactComponent as MinimizeIcon } from './images/minimize.svg'
import { ReactComponent as ProductIcon } from './images/product.svg'
import { ReactComponent as LeadsIcon } from './images/user.svg'
import { ReactComponent as HomeIcon } from './images/home.svg'
import { ReactComponent as ChatIcon } from './images/chat.svg'
import ThemeToggle from '../Shared/ThemeToggle/ThemeToggle'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import cn from 'classnames'

import './Navigation.scss'

interface INavigationProps {
  isExpand: boolean
  toggleExpand: () => void
}

const Navigation = ({ isExpand, toggleExpand }: INavigationProps) => {
  return (
    <nav className='navigation'>
      <ul className='navigation__link-list'>
        <li style={{ width: '60px' }} />
        <li className='navigation__link-item'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''} ${
                !isExpand ? 'navigation__link--minimized' : ''
              }`
            }
            to='/'
          >
            <HomeIcon className='navigation__icon' />
            {isExpand ? ' Home' : ''}
          </NavLink>
        </li>
        <li className='navigation__link-item'>
          <NavLink
            end
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''} ${
                !isExpand ? 'navigation__link--minimized' : ''
              }`
            }
            to='/leads'
          >
            <LeadsIcon className='navigation__icon' />
            {isExpand ? ' Leads' : null}
          </NavLink>
        </li>
        <li className='navigation__link-item'>
          <NavLink
            end
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''} ${
                !isExpand ? 'navigation__link--minimized' : ''
              }`
            }
            to='/leads/chat'
          >
            <ChatIcon className='navigation__icon' />
            {isExpand ? ' Chat' : ''}
          </NavLink>
        </li>
        <li className='navigation__link-item'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''} ${
                !isExpand ? 'navigation__link--minimized' : ''
              }`
            }
            to='/product'
          >
            <ProductIcon className='navigation__icon' />
            {isExpand ? ' Product' : ''}
          </NavLink>
        </li>
        <li className='navigation__link-item'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive && 'navigation__link--active'} ${
                !isExpand ? 'navigation__link--minimized' : ''
              }`
            }
            to='/analytics'
          >
            <AnalyticsIcon className='navigation__icon' />
            {isExpand ? ' Analytics' : ''}
          </NavLink>
        </li>
      </ul>
      <div className='navigation__controls'>
        <button className='navigation__minimize-button' onClick={toggleExpand}>
          <MinimizeIcon
            className={cn(
              'navigation__minimize-icon',
              !isExpand && 'navigation__minimize-icon--minimized'
            )}
          />
        </button>
        {isExpand ? <ThemeToggle /> : ''}
      </div>
    </nav>
  )
}

export default Navigation
