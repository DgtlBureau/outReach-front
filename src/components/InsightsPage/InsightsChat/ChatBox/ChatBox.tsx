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

const prompt = `Привет!
Мне необходимо собрать инсайты на основе имеющихся данных по игрокам для главного тренера, с которыми он ознакомится за 2 минуты. Инсайты по всем игрокам должны уместиться на 2 страницы формата A4. В конце инсайтов дай рекомендацию по общему направлению движения тренировок для тренера. Инсаты это события, которые характерны для позиции, показывающие насколько игрок реально пригоден на основе имеющихся данных. Например, если у Центрального защитника 70% плохих передач - то он плохой распасовщик. Я прикрепил отдельно список инсайтов, ты на них можешь ориентироваться и использовать как пример.
Игроков нужно сгруппировать на 3 группы: Top, Middle, Low и группировать их в зависимости от их показателей по параметрам. Все показатели игроков представлены на скриншотах.  Схема моей команды 4-4-2.
Кроме того я прикрепляю документ в котором описаны позиции данных игроков и трешхолды. Трешхолды это значения, которые используются как усредненные для уровня Top и они являются хорошим показателем. Соответственно собирая инсайты учитывай как трешхолды, так и показатели игроков - насколько они совпадают. Игроков сравнивай между собой только по их профилю, соответственно сравнивать защитников можно только по оборонительным действиям и владению, а нападающих по атакующим действиям. Учитывай количество ошибок в показателях также.
Добавь к рекомендации по каждому игроку ключевые интересные события/особенности, которые ты мог заметить по игроку, которые являются характерной для данной позиции, но не совпадают с его поведением по показателям. Используй только количественные данные и фактически подтверждаемые, не давай субъективную оценку действиям. 
Результат напиши на английском.`

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
