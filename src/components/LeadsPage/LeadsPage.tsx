import MessageList from '../ChatPage/ChatForm/ChatBox/MessageList/MessageList'
import { ReactComponent as MessagesIcon } from './images/messages-icon.svg'
import { ReactComponent as PlusIcon } from './images/plus-icon.svg'
import LeadTable, { ILead } from './LeadForm/LeadTable/LeadTable'
import Dropdown from '../Shared/Dropdown/Dropdown'
import InputBar from '../Shared/InputBar/InputBar'
import { useFetch } from '../../utils/loadData'
import LeadForm from './LeadForm/LeadForm'
import { motion } from 'framer-motion'
import { useState } from 'react'

import './LeadsPage.scss'
import { Dialog } from '@mui/material'
import Loader from '../Shared/Loader/Loader'
import LeadPreview from './LeadForm/LeadPreview/LeadPreview'
import instance from '../../utils/api'
import { enqueueSnackbar } from 'notistack'

const LeadsPage = () => {
  const [isLogsShown, setIsLogsShown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [gptAnswer, setGptAnswer] = useState<any>(null)
  const [files, setFiles] = useState<any>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [leadUrl, setLeadUrl] = useState('')
  const [isResponseLoading, setIsResponseLoading] = useState(false)

  const { isLoading, data } = useFetch(
    'lead',
    'Failed to load leads. Please, try again later'
  )
  const leadLogs = useFetch(
    'chat_log?chat_type=lead_answer',
    'Failed to load chat log. Please, try again later'
  )

  const handleChangeFiles = (event: any) => {
    setFiles(event.target.files)
  }

  const onDialogOpen = () => {
    setIsDialogOpen(true)
  }

  const onDialogClose = () => {
    setIsDialogOpen(false)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const convertedImages = Object.entries(files).map((file) => file[1])
    const formData = new FormData()
    convertedImages.map((image: any) => formData.append('images', image))

    setIsResponseLoading(true)
    onDialogOpen()
    try {
      const { data } = await instance.post('/lead/check-answer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setGptAnswer(data.gpt_answer)
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    } finally {
      setIsResponseLoading(false)
    }
  }

  const handleResponseSubmit = async () => {
    const formData = new FormData()
    formData.append('gpt_answer', gptAnswer)
    formData.append('linkedin_url', leadUrl)
    try {
      await instance.post('/lead', formData)
      enqueueSnackbar('Lead was succesfully formed!', { variant: 'success' })
      onDialogClose()
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    }
  }

  return (
    <main className='leads-page'>
      <div className='leads-page__table-wrapper'>
        <div className='leads-page__table-title-wrapper'>
          <span className='leads-page__table-title'>Leads</span>
          <div className='leads-page__table-title-right'>
            <InputBar
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button
              type='button'
              onClick={onDialogOpen}
              className='leads-page__add-lead-dropdown-button'
            >
              <PlusIcon className='leads-page__add-lead-dropdown-icon' />
              Add new
            </button>
          </div>
        </div>
        <div className='lead-page__table'>
          <LeadTable
            isLoading={isLoading}
            leads={
              searchQuery
                ? data.filter((lead: ILead) => {
                    return lead.full_name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  })
                : data
            }
          />
        </div>
      </div>
      <button
        className='lead-page__chatlog-button'
        onClick={() => setIsLogsShown(!isLogsShown)}
      >
        <MessagesIcon />
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

      <Dialog
        className='lead-page__dialog'
        onClose={onDialogClose}
        open={isDialogOpen}
      >
        <div className='lead-page__content'>
          {isResponseLoading ? (
            <div className='lead-page__loader'>
              <span className='lead-page__modal-title'>
                Response is forming
              </span>
              <div className='lead-page__loader-wrapper'>
                <Loader />
              </div>
            </div>
          ) : (
            <>
              {gptAnswer ? (
                <>
                  <span className='lead-page__added-content-title'>
                    Decide to save or discard response
                  </span>
                  <LeadPreview
                    onSubmit={handleResponseSubmit}
                    onDiscard={() => {
                      onDialogClose()
                      setGptAnswer('')
                    }}
                    gptAnswer={gptAnswer && JSON.parse(gptAnswer)}
                  />
                </>
              ) : (
                <LeadForm
                  files={files}
                  setFiles={handleChangeFiles}
                  leadUrl={leadUrl}
                  setLeadUrl={setLeadUrl}
                  onSubmit={handleSubmit}
                  onCancelPress={onDialogClose}
                />
              )}
            </>
          )}
        </div>
      </Dialog>
    </main>
  )
}

export default LeadsPage
