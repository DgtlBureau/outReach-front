import { ILead } from '../../../LeadsPage/LeadForm/LeadTable/LeadTable'
import { ReactComponent as Avatar } from './images/avatar.svg'
import MessageList from './MessageList/MessageList'
import Loader from '../../../Shared/Loader/Loader'

import './ChatBox.scss'
import { Drawer } from '@mui/material'
import { useState } from 'react'
import LeadInfo from '../../../LeadsPage/LeadForm/LeadTable/LeadInfo/LeadInfo'

interface IChatBoxProps {
  lead: ILead
  chat: any
  isLoading: boolean
}

const ChatBox = ({ lead, chat }: IChatBoxProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <div className='chat-box'>
      <div className='chat-box__header'>
        <Avatar />
        <button
          onClick={() => setIsDrawerOpen(true)}
          type='button'
          className='chat-box__name'
        >
          {lead.full_name}
        </button>
      </div>
      {chat.length === 0 ? (
        <span className='chat-box__placeholder'>
          Please click button Get Message to get promt
        </span>
      ) : null}
      <MessageList messages={chat} />
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: '50% !important',
            backgroundColor: 'var(--main-color)',
          },
        }}
      >
        <LeadInfo
          lead={lead as ILead}
          onCloseClick={() => setIsDrawerOpen(false)}
        />
      </Drawer>
    </div>
  )
}

export default ChatBox
