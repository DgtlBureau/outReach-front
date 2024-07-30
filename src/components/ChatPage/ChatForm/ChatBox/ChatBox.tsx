import MessageList from './MessageList/MessageList'

import './ChatBox.scss'
import { enqueueSnackbar } from 'notistack'
import instance from '../../../../utils/api'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loader from '../../../Shared/Loader/Loader'

// { text: 'Hello! I hope you are having a great day.', isRecieved: true }

const ChatBox = () => {
  const [chat, setChat] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()

  const loadChat = async () => {
    try {
      const { data } = await instance.get(`/chat/${id}`)
      setChat(data)
    } catch (error) {
      enqueueSnackbar('Failed to load chat. Please, try again later', {
        variant: 'error',
      })
    }
  }

  const getMessage = async () => {
    setIsLoading(true)
    try {
      const { data } = await instance.get(`/message/${id}`)
      setChat([
        ...chat,
        {
          message_text: data.gpt_answer,
          reply_message: false,
          sent_date: new Date(),
        },
      ])
    } catch (error) {
      enqueueSnackbar('Failed to get message. Please, try again later', {
        variant: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadChat()
  }, [])

  return (
    <div className='chat-box'>
      {chat.length === 0 ? (
        <span className='chat-box__placeholder'>
          Chat is empty, create a message by clicking button below
        </span>
      ) : (
        ''
      )}
      <MessageList messages={chat} />
      <div className='chat-box__input-box'>
        {/* <input
          placeholder='Enter response'
          className='chat-box__input'
          type='text'
        /> */}
        <button
          onClick={getMessage}
          type='button'
          className='chat-box__submit-button'
        >
          {isLoading ? (
            <div className='chat-box__submit-loader'>
              <Loader color='var(--secondary-color)' />
            </div>
          ) : (
            'Get message'
          )}
        </button>
      </div>
    </div>
  )
}

export default ChatBox
