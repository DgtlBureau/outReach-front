import AddNewProjectForm from './AddNewProjectForm/AddNewProjectForm'
import CustomButton from '../../../Shared/CustomButton/CustomButton'
import { ReactComponent as PlusIcon } from './images/plus-icon.svg'
import Dropdown from '../../../Shared/Dropdown/Dropdown'
import { useFetch } from '../../../../utils/loadData'
import { Dialog, DialogTitle } from '@mui/material'
import Loader from '../../../Shared/Loader/Loader'
import instance from '../../../../utils/api'
import { enqueueSnackbar } from 'notistack'
import IcpTable from './IcpTable/IcpTable'
import { motion } from 'framer-motion'
import { useState } from 'react'

import './ProductForm.scss'
import MessageList from '../../../ChatPage/ChatForm/ChatBox/MessageList/MessageList'

const ProductForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gptAnswer, setGptAnswer] = useState<any>('')
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectFile, setProjectFile] = useState<any>(null)
  const [isLogsShown, setIsLogsShown] = useState(false)

  const handleChangeFile = (event: any) => {
    setProjectFile(event.target.files[0])
  }

  const { isLoading, data } = useFetch(
    'projects',
    'Failed to load products. Please, try again later'
  )
  const projectLogs = useFetch(
    'chat_log?chat_type=project_answer',
    'Failed to load chat log. Please, try again later'
  )

  const onDialogClose = () => {
    setIsDialogOpen(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSendProject = async () => {
    const formData = new FormData()
    formData.append('pdf', projectFile)

    setIsDialogOpen(true)
    setIsSubmitLoading(true)
    try {
      const { data } = await instance.post('/projects/check-answer', formData)
      setGptAnswer(data.gpt_answer)
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    } finally {
      setIsSubmitLoading(false)
    }
  }

  const handleResponseSubmit = async () => {
    const formData = new FormData()
    formData.append('gpt_answer', gptAnswer)
    try {
      await instance.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      enqueueSnackbar('Projects were successfully formed!', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    }
  }

  return (
    <div className='product-form'>
      <div className='product-form__table-wrapper'>
        <div className='product-form__table-title-wrapper'>
          <span className='product-form__table-title'>Projects</span>
          <Dropdown
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            activator={
              <button
                type='button'
                onClick={() => setIsModalOpen(!isModalOpen)}
                className='product-form__add-lead-dropdown-button'
              >
                <PlusIcon className='product-form__add-lead-dropdown-icon' />
              </button>
            }
          >
            <AddNewProjectForm
              value={projectFile}
              onSubmit={handleSendProject}
              handleChangeFile={handleChangeFile}
            />
          </Dropdown>
        </div>
        <IcpTable isLoading={isLoading} products={data} />
      </div>
      <Dialog
        className='product-form__dialog'
        onClose={onDialogClose}
        open={isDialogOpen}
      >
        <DialogTitle>
          {isSubmitLoading ? (
            <span className='lead-form__title'>Response is forming</span>
          ) : (
            <span className='lead-form__title'>
              Please, check the response and decide what to do
            </span>
          )}
        </DialogTitle>
        <div className='product-form__content'>
          {isSubmitLoading ? (
            <div className='product-form__loader'>
              <Loader />
            </div>
          ) : (
            <>
              <IcpTable
                isLoading={false}
                products={gptAnswer && JSON.parse(gptAnswer)}
              />
              <div className='product-form__controls'>
                <CustomButton onClick={handleResponseSubmit}>
                  Submit
                </CustomButton>
                <CustomButton variant='outlined' onClick={onDialogClose}>
                  Discard
                </CustomButton>
              </div>
            </>
          )}
        </div>
      </Dialog>
      <button
        className='product-form__chatlog-button'
        onClick={() => setIsLogsShown(!isLogsShown)}
      >
        Chatlogs
      </button>
      <motion.div
        className='product-form__chatlog'
        transition={{ duration: 0.25 }}
        initial={{ display: 'none' }}
        animate={{
          display: 'block',
          clipPath: isLogsShown
            ? 'circle(1920px at 0 0)'
            : 'circle(0% at 100% 100%)',
        }}
      >
        <MessageList messages={projectLogs.data} />
      </motion.div>
    </div>
  )
}

export default ProductForm
