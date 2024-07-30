import { motion } from 'framer-motion'

import './NavigationAnimatedText.scss'

interface INavigationAnimatedTextProps {
  text: string
  isShown: boolean
}

const textVariants = {
  open: { opacity: 1, display: 'inline' },
  closed: { opacity: 0, display: 'none' },
}

const NavigationAnimatedText = ({
  text,
  isShown,
}: INavigationAnimatedTextProps) => {
  return (
    <motion.span
      className='navigation-animated-text'
      variants={textVariants}
      animate={isShown ? 'open' : 'closed'}
    >
      {text}
    </motion.span>
  )
}

export default NavigationAnimatedText
