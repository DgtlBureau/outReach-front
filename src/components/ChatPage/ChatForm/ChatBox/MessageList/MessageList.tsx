import { useEffect, useRef } from 'react'
import Message from './Message/Message'

import './MessageList.scss'

interface IMessageListProps {
  messages: { id: number; message_text: string; reply_message: boolean }[]
}

const MessageList = ({ messages }: IMessageListProps) => {
  return (
    <ul className='message-list'>
      {messages.reverse().map((message) => (
        <Message
          key={message.id}
          text={message.message_text}
          isRecieved={message.reply_message}
        />
      ))}
    </ul>
  )
}

export default MessageList
