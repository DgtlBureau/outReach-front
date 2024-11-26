import { ru } from 'date-fns/locale'
import { format } from 'date-fns'
import cn from 'classnames'

import './Message.scss'

interface IMessageProps {
  isRecieved?: boolean
  text: string
  date: string
  category: string
}

const Message = ({ isRecieved, date, text, category }: IMessageProps) => {
  return (
    <li className={cn('message-insights', isRecieved && 'message--isReceived')}>
      <span className='message__sender'>
        {isRecieved ? 'OutReach Assistant' : 'You'}
      </span>
      <p className='message__text'>{text}</p>
      <div className='message__description'>
        <span className='message__category'>{category}</span>
        <span className='message__date'>
          {date
            ? format(new Date(date), 'dd.MM.yyyy hh:mm', { locale: ru })
            : ''}
        </span>
      </div>
    </li>
  )
}

export default Message
