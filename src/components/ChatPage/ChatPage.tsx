import { useEffect, useState } from 'react'
import ChatForm from './ChatForm/ChatForm'
import instance from '../../utils/api'
import { useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

const ChatPage = () => {
  const [chat, setChat] = useState([])
  const { id } = useParams()

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

  useEffect(() => {
    loadChat()
  }, [])

  return <ChatForm />
}

export default ChatPage
