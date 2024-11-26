import { secondaryInstance } from '../../../../utils/api'
import { ReactComponent as AttachIcon } from './images/attach-icon.svg'
import MessageList from './MessageList/MessageList'
import Loader from '../../../Shared/Loader/Loader'
import { useParams } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import './ChatBox.scss'

interface IChatBoxProps {
  onMessageSend: () => void
  chat: any
  isLoading: boolean
}

const ChatBox = ({ chat, onMessageSend }: IChatBoxProps) => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const { id } = useParams()

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const convertedImages = Object.entries(files).map((file) => file[1])
    const formData = new FormData()
    convertedImages.map((file: any) => formData.append('files', file))
    formData.append('message', message)
    try {
      await secondaryInstance.post(`/insights/send-message/${id}`, formData)
      setMessage('')
      setFiles([])
      onMessageSend()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles([...Array.from(e.target.files)])
    }
  }

  return (
    <div className='chat-box-insights'>
      {chat?.length === 0 ? (
        <span className='chat-box__placeholder'>
          Please click button Get Message to get promt
        </span>
      ) : null}
      <MessageList messages={chat} />
      <form
        onSubmit={(e) => handleSendMessage(e)}
        className='chat-box-insights__controls'
      >
        <div className='chat-box-insights__attach-files'>
          <input
            className='chat-box-insights__input'
            type='text'
            disabled={isLoading}
            placeholder='Type your message here'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className='chat-box-insights__attach'>
            <input
              type='file'
              className='chat-box-insights__attach-input'
              accept='.pdf, .jpg, .jpeg, .png'
              multiple
              onChange={handleSelectFiles}
            />
            {files.length ? (
              <span className='chat-box-insights__attach-amount'>
                {files.length}
              </span>
            ) : null}
            <AttachIcon className='chat-box-insights__attach-icon' />
          </div>
        </div>
        <button className='chat-box-insights__submit'>
          {isLoading ? <Loader /> : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default ChatBox
