import { secondaryInstance } from '../../../utils/api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import ChatBox from './ChatBox/ChatBox'
import { useState } from 'react'

import './InsightsChat.scss'

const InsightsChat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const { id } = useParams()

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles(Array.from(e.target.files))
    }
  }

  const {
    data,
    isLoading: isChatLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const { data } = await secondaryInstance.get(`/insights/${id}`)
      return data
    },
    queryKey: ['insights-chat', id],
  })

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleUploadFile = async () => {
    setIsLoading(true)
    const convertedImages = Object.entries(files).map((file) => file[1])
    const formData = new FormData()
    convertedImages.map((file: any) => formData.append('files', file))
    try {
      await secondaryInstance.post(`/insights/start-chat/${id}`, formData)
      setIsModalOpen(false)
      refetch()
    } catch (e) {
      enqueueSnackbar(String(e), { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <div className='insights-chat__wrapper'>
        <ChatBox
          onMessageSend={refetch}
          chat={data}
          isLoading={isChatLoading}
        />
      </div>
    </main>
  )
}

export default InsightsChat
