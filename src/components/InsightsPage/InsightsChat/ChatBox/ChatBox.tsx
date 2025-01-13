import { secondaryInstance } from '../../../../utils/api'
import { ReactComponent as AttachIcon } from './images/attach-icon.svg'
import MessageList from './MessageList/MessageList'
import Loader from '../../../Shared/Loader/Loader'
import { useParams } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'

import './ChatBox.scss'

interface IChatBoxProps {
  onMessageSend: () => void
  chat: any
  isLoading: boolean
}

const prompt = `Hello!
I need to gather insights based on available player data for the head coach, which he can review in 2 minutes. Insights for all players should fit on 2 A4 pages. At the end of the insights, provide a recommendation for the general direction of training for the coach. Insights are events characteristic of the position, showing how suitable the player really is based on available data. For example, if a Center Back has 70% bad passes - he's a poor distributor. I've attached a separate list of insights that you can use as reference and examples.
Players need to be grouped into 3 categories: Top, Middle, Low, and grouped according to their parameter indicators. All player statistics are shown in the screenshots. My team's formation is 4-4-2.
I'm also attaching a document describing the players' positions and thresholds. Thresholds are values used as averages for the Top level and are considered good indicators. When gathering insights, consider both thresholds and player indicators - how well they match. Compare players only within their profile, meaning defenders can only be compared by defensive actions and possession, while forwards by attacking actions. Also consider the number of errors in the indicators.
Add to each player's recommendation key interesting events/characteristics that you might notice about the player that are characteristic of their position but don't match their behavioral indicators. Use only quantitative data and factually verifiable information, don't give subjective evaluations of actions.`

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

  useEffect(() => {
    if (chat?.length === 0) {
      setMessage(prompt)
    }
  }, [chat])

  return (
    <div className='chat-box-insights'>
      {chat?.length === 0 ? (
        <span className='chat-box__placeholder'>
          Please send the initial message to initialize chat
        </span>
      ) : null}
      <MessageList messages={chat} />
      <form
        onSubmit={(e) => handleSendMessage(e)}
        className='chat-box-insights__controls'
      >
        <div className='chat-box-insights__attach-files'>
          <textarea
            className='chat-box-insights__input'
            disabled={isLoading}
            placeholder='Type your message here'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className='chat-box-insights__attach'>
            <input
              type='file'
              className='chat-box-insights__attach-input'
              accept='.pdf, .jpg, .jpeg, .png, .doc, .docx, .docm'
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
