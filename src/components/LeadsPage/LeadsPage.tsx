import MessageList from '../ChatPage/ChatForm/ChatBox/MessageList/MessageList'
import { ReactComponent as PlusIcon } from './images/plus-icon.svg'
import LeadTable from './LeadForm/LeadTable/LeadTable'
import Dropdown from '../Shared/Dropdown/Dropdown'
import { useFetch } from '../../utils/loadData'
import LeadForm from './LeadForm/LeadForm'
import { motion } from 'framer-motion'
import { useState } from 'react'

import './LeadsPage.scss'

const LeadsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogsShown, setIsLogsShown] = useState(false)

  const { isLoading, data } = useFetch(
    'lead',
    'Failed to load leads. Please, try again later'
  )
  const leadLogs = useFetch(
    'chat_log?chat_type=lead_answer',
    'Failed to load chat log. Please, try again later'
  )

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main className='leads-page'>
      <div className='leads-page__table-wrapper'>
        <div className='leads-page__table-title-wrapper'>
          <span className='leads-page__table-title'>Leads</span>
          <Dropdown
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            activator={
              <button
                type='button'
                onClick={() => setIsModalOpen(!isModalOpen)}
                className='leads-page__add-lead-dropdown-button'
              >
                <PlusIcon className='leads-page__add-lead-dropdown-icon' />
              </button>
            }
          >
            <LeadForm />
          </Dropdown>
        </div>
        <div className='lead-page__table'>
          <LeadTable isLoading={isLoading} leads={data} />
        </div>
      </div>
      <button
        className='lead-page__chatlog-button'
        onClick={() => setIsLogsShown(!isLogsShown)}
      >
        Chatlogs
      </button>
      <motion.div
        className='lead-page__chatlog'
        transition={{ duration: 0.25 }}
        initial={{ display: 'none' }}
        animate={{
          display: 'block',
          clipPath: isLogsShown
            ? 'circle(1920px at 0 0)'
            : 'circle(0% at 100% 100%)',
        }}
      >
        <MessageList messages={leadLogs.data} />
      </motion.div>
    </main>
  )
}

export default LeadsPage
