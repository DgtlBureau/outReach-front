import { ReactComponent as PlusIcon } from './images/plus-icon.svg'
import LeadTable from './LeadForm/LeadTable/LeadTable'
import Dropdown from '../Shared/Dropdown/Dropdown'
import { useFetch } from '../../utils/loadData'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import LeadForm from './LeadForm/LeadForm'
import instance from '../../utils/api'

import './LeadsPage.scss'

const LeadsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isLoading, data } = useFetch(
    'lead',
    'Failed to load leads. Please, try again later'
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
    </main>
  )
}

export default LeadsPage
