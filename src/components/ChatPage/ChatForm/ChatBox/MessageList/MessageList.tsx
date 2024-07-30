import { ReactComponent as SenderAvatar } from './images/avatar-responder.svg'
import { ReactComponent as YouAvatar } from './images/avatar-you.svg'
import { useEffect, useRef } from 'react'
import Message from './Message/Message'

import './MessageList.scss'

interface IMessage {
  id: number
  message_text: string
  sent_date: string
  reply_message: boolean
}

interface IMessageListProps {
  messages: IMessage[]
}

const MessageList = ({ messages }: IMessageListProps) => {
  const listRef = useRef<any>(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  return (
    <ul ref={listRef} className='message-list'>
      {messages.map((message, index) => (
        <div
          className={`message-list__message ${
            message.reply_message ? 'message-list__message--received' : ''
          }`}
          key={message.id}
        >
          {message.reply_message ? <SenderAvatar /> : ''}
          <Message
            text={message.message_text}
            isRecieved={message.reply_message}
            date={message.sent_date}
          />
          {!message.reply_message ? <YouAvatar /> : ''}
        </div>
      ))}
    </ul>
  )
}

export default MessageList
