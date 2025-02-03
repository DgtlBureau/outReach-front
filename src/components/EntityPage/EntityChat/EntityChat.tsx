import MessageList from '../../InsightsPage/InsightsChat/ChatBox/MessageList/MessageList'
import { ReactComponent as AttachIcon } from './images/attach-icon.svg'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { secondaryInstance } from '../../../utils/api'
import Loader from '../../Shared/Loader/Loader'
import { useParams } from 'react-router-dom'
import { ReactComponent as CrossIcon } from './images/cross.svg'
import { ReactComponent as RecordIcon } from './images/microphone.svg'
import { ReactComponent as StopRecordIcon } from './images/stop.svg'

import './EntityChat.scss'

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

const EntityChat = ({ chat, onMessageSend }: IChatBoxProps) => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const [time, setTime] = useState(0)
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

  const handleDeleteImage = (name: string) => {
    setFiles(files.filter((file) => file.name !== name))
  }

  console.log(files)

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles([...files, ...Array.from(e.target.files)])
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      handleStopRecording()
    } else {
      handleStartRecording()
    }
  }
  const handleStartRecording = () => {
    setIsRecording(true)
    timer.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1)
    }, 1000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    if (timer.current) {
      clearInterval(timer.current)
    }
    setTime(0)
  }

  const formatTime = () => {
    if (time < 60) {
      return `0:${time.toString().padStart(2, '0')}`
    }
    const minutes = Math.floor(time / 60)
    const remainingSeconds = time % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (chat?.length === 0) {
      setMessage(prompt)
    }
  }, [chat])

  return (
    <div className='chat-box-entity'>
      <div className='chat-box-entity__header'>
        <span className='chat-box-entity__header-title'>Object Chat</span>
      </div>
      {chat?.length === 0 ? (
        <span className='chat-box__placeholder'>
          Please send the initial message to initialize chat
        </span>
      ) : null}
      <MessageList messages={chat} />
      <form
        onSubmit={(e) => handleSendMessage(e)}
        className='chat-box-entity__controls'
      >
        <div className='chat-box-entity__attach-files'>
          <textarea
            className='chat-box-entity__input'
            disabled={isLoading}
            placeholder='Type your message here'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Bottom line between text and submit button */}
          <div className='chat-box-entity__attach'>
            <div className='chat-box-entity__attach-container'>
              <input
                type='file'
                className='chat-box-entity__attach-input'
                accept='.jpg, .jpeg, .png'
                multiple
                onChange={handleSelectFiles}
              />
              <AttachIcon className='chat-box-entity__attach-icon' />
            </div>
            <div className='chat-box-entity__attach-container'>
              <button
                className='chat-box-entity__record-button'
                onClick={toggleRecording}
                type='button'
              >
                {isRecording ? (
                  <>
                    <StopRecordIcon className='chat-box-entity__record-icon' />
                    <span className='chat-box-entity__record-time'>
                      {formatTime()}
                    </span>
                  </>
                ) : (
                  <RecordIcon className='chat-box-entity__record-icon' />
                )}
              </button>
            </div>
            {files.length ? (
              <ul className='chat-box-entity__uploaded-images'>
                {files.map((file) => {
                  return (
                    <li
                      className='chat-box-entity__uploaded-image-container'
                      key={file.name}
                    >
                      <img
                        alt={file.name}
                        className='chat-box-entity__uploaded-image'
                        src={URL.createObjectURL(file)}
                      />
                      <button
                        type='button'
                        className='chat-box-entity__uploaded-image-delete'
                        onClick={() => handleDeleteImage(file.name)}
                      >
                        <CrossIcon />
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        </div>
        <button className='chat-box-entity__submit'>
          {isLoading ? <Loader /> : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default EntityChat
