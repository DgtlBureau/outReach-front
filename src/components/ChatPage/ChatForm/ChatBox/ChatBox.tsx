import MessageList from './MessageList/MessageList'

import './ChatBox.scss'

const ChatBox = () => {
  return (
    <div className='chat-box'>
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
