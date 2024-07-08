import CustomInput from '../../Shared/CustomInput/CustomInput'
import ChatBox from './ChatBox/ChatBox'
import './ChatForm.scss'

const ChatForm = () => {
  return (
    <form className='chat-form'>
      <div className='chat-form__inputs-wrapper'>
        <CustomInput className='chat-form__input' label='First name' />
        <CustomInput className='chat-form__input' label='Last name' />
      </div>
      <span className='chat-form__rating'>
        Lead rating: <span className='chat-form__rating-numbers'>98.5 %</span>
      </span>
      <div className='chat-form__chat-box-wrapper'>
        <ChatBox />
      </div>
    </form>
  )
}

export default ChatForm
