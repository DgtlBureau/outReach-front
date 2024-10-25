import { enqueueSnackbar } from 'notistack'
import instance, { secondaryInstance } from '../../../../utils/api'
import { ReactComponent as Stars } from './images/stars.svg'
import { useEffect, useState } from 'react'
import './PromptSettings.scss'
import Loader from '../../../Shared/Loader/Loader'

interface IChat {
  chat: any
  chatId: string | undefined
  getMessage: () => void
  reloadChat: () => void
}

interface IPromtGeneral {
  id: number
  text: string
  type: string
}

const CURRENT_TYPE = 'lead_answer'

const PromptSettings = ({ chat, chatId, getMessage, reloadChat }: IChat) => {
  const [promtGeneral, setPromtGeneral] = useState('')
  const [promtExpertise, setPromtExpertise] = useState(
    'Imagine that you are a professional car dealer.'
  )
  const [isLoading, setIsLoading] = useState(false)

  const findLeadOffer = (array: IPromtGeneral[]) => {
    const promt = array.find((item) => item.type === CURRENT_TYPE)
    if (!promt) {
      enqueueSnackbar("Can't wind needed promt")
      return
    }
    setPromtGeneral(promt.text)
  }

  const handleGetPrompt = async () => {
    try {
      const { data } = await secondaryInstance.get('/promts')
      if (!Array.isArray(data)) {
        throw new Error('Something went wrong, Please try again')
      }
      findLeadOffer(data)
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    }
  }

  const handleSendPromt = async () => {
    setIsLoading(true)
    const promtData = new FormData()
    promtData.append(
      'answer_text',
      promtGeneral.concat(' ').concat(promtExpertise)
    )

    try {
      const { data } = await instance.post(
        `/chat/send_answer/${chatId}`,
        promtData
      )
      if (!data.Answer) {
        throw new Error('Something went wront, Please send message later')
      }
      enqueueSnackbar('Promt was sented', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    } finally {
      setIsLoading(false)
      reloadChat()
    }
  }

  useEffect(() => {
    handleGetPrompt()
  }, [])

  return (
    <div className='prompt-settings'>
      <div className='prompt-settings__header'>
        <Stars />
        <span className='prompt-settings__title'>Extract Next Steps</span>
      </div>
      <div className='prompt-settings__content'>
        <label className='prompt-settings__label'>
          <span className='prompt-settings__title'>Prompt General</span>
          <textarea
            className={
              chat.length
                ? 'prompt-settings__textarea'
                : 'prompt-settings__textarea prompt-settings__textarea-disabled'
            }
            placeholder='Message'
            value={promtGeneral}
            readOnly={!chat.length}
            onChange={(e) => setPromtGeneral(e.target.value)}
          />
        </label>
        <label className='prompt-settings__label'>
          <span className='prompt-settings__title'>Prompt Expertise</span>
          <textarea
            className={
              chat.length
                ? 'prompt-settings__textarea'
                : 'prompt-settings__textarea prompt-settings__textarea-disabled'
            }
            placeholder='Message'
            value={promtExpertise}
            readOnly={!chat.length}
            onChange={(e) => setPromtExpertise(e.target.value)}
          />
        </label>
        <button
          disabled={isLoading}
          type='button'
          className={`prompt-settings__submit ${
            isLoading ? 'prompt-settings__submit-disabled' : ''
          }`}
          onClick={chat.length ? handleSendPromt : getMessage}
        >
          {isLoading ? (
            <div className='promt-settings__loader-box'>
              <Loader size={12} color='var(--main-color)' />
            </div>
          ) : chat.length === 0 ? (
            'Get message'
          ) : (
            'Send message'
          )}
        </button>
      </div>
    </div>
  )
}

export default PromptSettings
