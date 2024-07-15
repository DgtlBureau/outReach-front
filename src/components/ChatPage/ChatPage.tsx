import { useEffect, useState } from 'react'
import ChatForm from './ChatForm/ChatForm'
import instance from '../../utils/api'
import { useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

const ChatPage = () => {
  return <ChatForm />
}

export default ChatPage
