import { ReactComponent as PlusIcon } from './images/plus-icon.svg'
import { secondaryInstance } from '../../utils/api'
import { useQuery } from '@tanstack/react-query'
import Insights from './Insights/Insights'

import './InsightsPage.scss'
import { useState } from 'react'
import Loader from '../Shared/Loader/Loader'

const InsightsPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { data, refetch } = useQuery({
    queryFn: async () => {
      const { data } = await secondaryInstance.get('/insights')
      return data
    },
    queryKey: ['insights'],
  })

  const handleCreateChat = async () => {
    setIsLoading(true)
    try {
      await secondaryInstance.post('/insights')
      refetch()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='insights-page'>
      <div className='insights-page__top'>
        <h2 className='insights-page__title'>Insights</h2>
        <button
          onClick={handleCreateChat}
          type='button'
          className={`insights-page__add-new-chat ${
            isLoading ? 'insights-page__add-new-chat--loading' : ''
          }`}
        >
          <div className='insights-page__add-new-chat-loader'>
            <Loader />
          </div>
          <div className='insights-page__add-new-chat-text'>
            <PlusIcon className='insights-page__add-new-chat-icon' />
            Add new
          </div>
        </button>
      </div>
      <Insights insights={data} />
    </main>
  )
}

export default InsightsPage
