import MessageList from '../ChatPage/ChatForm/ChatBox/MessageList/MessageList'
import { ReactComponent as MessagesIcon } from './images/messages-icon.svg'
import { ReactComponent as PlusIcon } from './images/plus-icon.svg'
import LeadTable, { ILead } from './LeadForm/LeadTable/LeadTable'
import LeadPreview from './LeadForm/LeadPreview/LeadPreview'
import InputBar from '../Shared/InputBar/InputBar'
import { useFetch, useQueryFetch } from '../../utils/loadData'
import Loader from '../Shared/Loader/Loader'
import { enqueueSnackbar } from 'notistack'
import LeadForm from './LeadForm/LeadForm'
import { Dialog } from '@mui/material'
import { motion } from 'framer-motion'
import instance from '../../utils/api'
import { useState } from 'react'

import './LeadsPage.scss'

const LeadsPage = () => {
  const [isLogsShown, setIsLogsShown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [gptAnswer, setGptAnswer] = useState<any>(null)
  const [files, setFiles] = useState<File[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [leadUrl, setLeadUrl] = useState('')
  const [isResponseLoading, setIsResponseLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const { isLoading, data, refetch } = useQueryFetch('lead', ['leads'])
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
      if (typeof data.gpt_answer === 'string') {
        throw new Error('Something went wrong. Please try again later')
      }
      setGptAnswer(data)
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    } finally {
      setIsResponseLoading(false)
    }
  }

  const handleResponseSubmit = async () => {
    try {
      await instance.post('/lead', { ...gptAnswer, linkedin_url: leadUrl })
      enqueueSnackbar('Lead was succesfully formed!', { variant: 'success' })
      setGptAnswer(null)
      refetch()
      onDialogClose()
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    }
  }

  const handleCheckAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(
        data.map((item: ILead) => {
          return item.id
        })
      )
    }
  }

  const handleCheckCell = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item: number) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
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
            isModal={false}
            isLoading={isLoading}
            handleCheckHead={handleCheckAll}
            handleCheckCell={handleCheckCell}
            checkedItems={selectedItems}
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
                    isModal={true}
                    onSubmit={handleResponseSubmit}
                    onDiscard={() => {
                      onDialogClose()
                      setGptAnswer(null)
                    }}
                    gptAnswer={gptAnswer && gptAnswer.gpt_answer}
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
