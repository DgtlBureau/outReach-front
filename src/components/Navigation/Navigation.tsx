import { ReactComponent as AnalyticsIcon } from './images/analytics.svg'
import { ReactComponent as MinimizeIcon } from './images/minimize.svg'
import { ReactComponent as ProductIcon } from './images/product.svg'
import { ReactComponent as LeadsIcon } from './images/user.svg'
import { ReactComponent as HomeIcon } from './images/home.svg'
import { ReactComponent as InsightsIcon } from './images/insights.svg'
import ThemeToggle from '../Shared/ThemeToggle/ThemeToggle'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import cn from 'classnames'

import './Navigation.scss'
import NavigationAnimatedText from './NavigationAnimatedText/NavigationAnimatedText'

interface INavigationProps {
  isExpand: boolean
  toggleExpand: () => void
}

const variants = {
  open: { width: '100%' },
  closed: { width: '60px' },
}

const textVariants = {
  open: { opacity: 1, display: 'inline' },
  closed: { opacity: 0, display: 'none' },
}

const Navigation = ({ isExpand, toggleExpand }: INavigationProps) => {
  return (
    <motion.nav
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      variants={variants}
      animate={isExpand ? 'open' : 'closed'}
      className='navigation'
    >
      <ul className='navigation__link-list'>
        <li className='navigation__link-item'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''}`
            }
            to='/'
          >
            <HomeIcon className='navigation__icon' />
            <NavigationAnimatedText text='Home' isShown={isExpand} />
          </NavLink>
        </li>
        <li className='navigation__link-item'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''}`
            }
            to='/product'
          >
            <ProductIcon className='navigation__icon' />
            <NavigationAnimatedText text='Projects' isShown={isExpand} />
          </NavLink>
        </li>
        <div className='navigation__separator' />
        <li className='navigation__link-item navigation__link-item--margin'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''}`
            }
            to='/leads'
          >
            <LeadsIcon className='navigation__icon' />
            <NavigationAnimatedText text='Leads' isShown={isExpand} />
          </NavLink>
        </li>
        <li className='navigation__link-item navigation__link-item--margin'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''}`
            }
            to='/insights'
          >
            <InsightsIcon className='navigation__icon navigation__icon--imported' />
            <NavigationAnimatedText text='Insights' isShown={isExpand} />
          </NavLink>
        </li>
        <li className='navigation__link-item'>
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${isActive && 'navigation__link--active'}`
            }
            to='/analytics'
          >
            <AnalyticsIcon className='navigation__icon' />
            <NavigationAnimatedText text='Statistics' isShown={isExpand} />
          </NavLink>
        </li>
      </ul>

      <div className='navigation__controls'>
        <motion.div
          className='navigation__controls-theme-toggle'
          variants={textVariants}
          animate={isExpand ? 'open' : 'closed'}
        >
          <ThemeToggle />
        </motion.div>
        <motion.div
          variants={textVariants}
          animate={isExpand ? 'open' : 'closed'}
          className='navigation__separator'
        />
        <button className='navigation__minimize-button' onClick={toggleExpand}>
          <MinimizeIcon
            className={cn(
              'navigation__minimize-icon',
              !isExpand && 'navigation__minimize-icon--minimized'
            )}
          />
          <motion.span
            className='navigation__minimize-text'
            variants={textVariants}
            animate={isExpand ? 'open' : 'closed'}
          >
            Hide
          </motion.span>
        </button>
      </div>
    </motion.nav>
  )
}

export default Navigation
