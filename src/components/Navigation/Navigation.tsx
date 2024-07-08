import { NavLink } from 'react-router-dom'

import './Navigation.scss'
import ThemeToggle from '../Shared/ThemeToggle/ThemeToggle'

const Navigation = () => {
  return (
    <nav className='navigation'>
      <ul className='navigation__link-list'>
        <li style={{ width: '60px' }} />
        <li className='navigation__link-item'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive && 'navigation__link--active'}`
            }
            to='/'
          >
            Home
          </NavLink>
        </li>
        <li className='navigation__link-item'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive && 'navigation__link--active'}`
            }
            to='/leads'
          >
            Leads
          </NavLink>
        </li>
        <li className='navigation__link-item'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive && 'navigation__link--active'}`
            }
            to='/leads/Chat'
          >
            Chat
          </NavLink>
        </li>
        <li className='navigation__link-item'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive && 'navigation__link--active'}`
            }
            to='/product'
          >
            Product
          </NavLink>
        </li>
        <li className='navigation__link-item'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive && 'navigation__link--active'}`
            }
            to='/analytics'
          >
            Analytics
          </NavLink>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
