import { ReactComponent as ArrowIcon } from './images/arrow.svg'
import PromptSettings from './PromptSettings/PromptSettings'
import { useNavigate, useParams } from 'react-router-dom'
import ChatBox from './ChatBox/ChatBox'

import './ChatForm.scss'
import instance from '../../../utils/api'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useFetch } from '../../../utils/loadData'

const ChatForm = () => {
  const navigate = useNavigate()
  const [chat, setChat] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()

  const leadData = useFetch(
    `/lead/${id}`,
    'Failed to load lead. Please, try again later'
  )

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
      await instance.get(`/message/${id}`)
      loadChat()
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

  const goBack = () => {
    navigate('/leads')
  }

  return (
    <form className='chat-form'>
      <div className='chat-form__chat-box-wrapper'>
        <button className='chat-form__go-back' onClick={goBack}>
          <ArrowIcon />
        </button>
        <div className='chat-form__wrapper'>
          <div className='chat-form__box-wrapper'>
            <ChatBox lead={leadData?.data} chat={chat} isLoading={isLoading} />
          </div>

          <div className='prompt__box-wrapper'>
            <PromptSettings
              chat={chat}
              chatId={id}
              getMessage={getMessage}
              reloadChat={loadChat}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default ChatForm
