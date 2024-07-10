import MessageList from './MessageList/MessageList'
import { useEffect, useRef } from 'react'

import './ChatBox.scss'

const ChatBox = () => {
  const chatRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef?.current) {
      console.log(chatRef?.current?.offsetTop)
    }
  }, [chatRef?.current])

  return (
    <div
      ref={chatRef}
      style={
        chatRef?.current
          ? { height: `calc(100vh - ${chatRef?.current?.offsetTop})` }
          : {}
      }
      className='chat-box'
    >
      <MessageList />
      <div className='chat-box__input-box'>
        <input
          placeholder='Enter response'
          className='chat-box__input'
          type='text'
        />
        <button type='button' className='chat-box__submit-button'>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatBox
