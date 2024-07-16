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
      {messages.map((message) => (
        <Message
          key={message.id}
          text={message.message_text}
          isRecieved={message.reply_message}
          date={message.sent_date}
        />
      ))}
    </ul>
  )
}

export default MessageList
