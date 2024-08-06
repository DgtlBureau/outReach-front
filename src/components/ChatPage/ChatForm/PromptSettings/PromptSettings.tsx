import { ReactComponent as Stars } from './images/stars.svg'

import './PromptSettings.scss'

const PromptSettings = () => {
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
            className='prompt-settings__textarea'
            placeholder='Message'
          />
        </label>
        <label className='prompt-settings__label'>
          <span className='prompt-settings__title'>Prompt Expertise </span>
          <textarea
            className='prompt-settings__textarea'
            placeholder='Message'
          />
        </label>
        <button type='button' className='prompt-settings__submit'>
          Confirm
        </button>
      </div>
    </div>
  )
}

export default PromptSettings
