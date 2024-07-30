import { ru } from 'date-fns/locale'
import { format } from 'date-fns'
import cn from 'classnames'

import './Message.scss'

interface IMessageProps {
  isRecieved?: boolean
  text: string
  date: string
}

const Message = ({ isRecieved, date, text }: IMessageProps) => {
  return (
    <li className={cn('message', isRecieved && 'message--isReceived')}>
      <span className='message__sender'>You</span>
      <p className='message__text'>{text}</p>
      <span className='message__date'>
        {date ? format(new Date(date), 'dd.MM.yyyy hh:mm', { locale: ru }) : ''}
      </span>
    </li>
  )
}

export default Message
