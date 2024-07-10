import { ReactComponent as PlusIcon } from './images/plus-icon.svg'
import LeadTable from './LeadForm/LeadTable/LeadTable'
import Dropdown from '../Shared/Dropdown/Dropdown'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import LeadForm from './LeadForm/LeadForm'
import instance from '../../utils/api'

import './LeadsPage.scss'

const LeadsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const loadLeads = async () => {
    try {
      const response = await instance.get('/leads')
    } catch (error) {
      enqueueSnackbar('Failed to load leads please, try again later', {
        variant: 'error',
      })
    }
  }

  // useEffect(() => {
  //   loadLeads()
  // }, [])

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
          <LeadTable />
        </div>
      </div>
    </main>
  )
}

export default LeadsPage
