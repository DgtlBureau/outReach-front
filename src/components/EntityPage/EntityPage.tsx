import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import './EntityPage.scss'
import ChatBox from '../InsightsPage/InsightsChat/ChatBox/ChatBox'
import { secondaryInstance } from '../../utils/api'
import EntityChat from './EntityChat/EntityChat'

const EntityPage = () => {
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
    <main className='insights-chat__wrapper'>
      <EntityChat
        onMessageSend={refetch}
        chat={data}
        isLoading={isChatLoading}
      />
    </main>
  )
}

export default EntityPage
