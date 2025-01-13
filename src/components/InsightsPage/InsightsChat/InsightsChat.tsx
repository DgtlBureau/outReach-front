import { secondaryInstance } from '../../../utils/api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import ChatBox from './ChatBox/ChatBox'

import './InsightsChat.scss'

const InsightsChat = () => {
  const { id } = useParams()

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
