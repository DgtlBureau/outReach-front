import cn from 'classnames'
import './Message.scss'

interface IMessageProps {
  isRecieved?: boolean
  text: string
}

const Message = ({ isRecieved, text }: IMessageProps) => {
  return (
    <li className={cn('message', isRecieved && 'message--isRecieved')}>
      {text}
      <span className='message__label'>You</span>
    </li>
  )
}

export default Message
