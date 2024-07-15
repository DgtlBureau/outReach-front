import cn from 'classnames'
import './Message.scss'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

interface IMessageProps {
  isRecieved?: boolean
  text: string
  date: string
}

const Message = ({ isRecieved, date, text }: IMessageProps) => {
  return (
    <li className={cn('message', isRecieved && 'message--isRecieved')}>
      {text}
      <div className='message__bottom'>
        <span className='message__label'>
          {date
            ? format(new Date(date), 'dd.MM.yyyy hh:mm', { locale: ru })
            : ''}
        </span>
        <span className='message__label'>You</span>
      </div>
    </li>
  )
}

export default Message
