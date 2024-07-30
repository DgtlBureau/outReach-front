import MessageList from '../../../ChatPage/ChatForm/ChatBox/MessageList/MessageList'
import { ReactComponent as MessagesIcon } from './images/messages-icon.svg'
import AddNewProjectForm from './AddNewProjectForm/AddNewProjectForm'
import CustomButton from '../../../Shared/CustomButton/CustomButton'
import { ReactComponent as PlusIcon } from './images/plus-icon.svg'
import Dropdown from '../../../Shared/Dropdown/Dropdown'
import InputBar from '../../../Shared/InputBar/InputBar'
import { useFetch } from '../../../../utils/loadData'
import { Dialog, DialogTitle } from '@mui/material'
import Loader from '../../../Shared/Loader/Loader'
import instance from '../../../../utils/api'
import { enqueueSnackbar } from 'notistack'
import IcpTable, { IProduct } from './IcpTable/IcpTable'
import { motion } from 'framer-motion'
import { useState } from 'react'

import './ProductForm.scss'

const ProductForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gptAnswer, setGptAnswer] = useState<any>('')
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectFile, setProjectFile] = useState<any>(null)
  const [isLogsShown, setIsLogsShown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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

  const onDialogOpen = () => {
    setIsDialogOpen(true)
  }

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
          <div className='product-form__table-head-right'>
            <InputBar
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button
              type='button'
              onClick={onDialogOpen}
              className='product-form__add-lead-dropdown-button'
            >
              <PlusIcon className='product-form__add-lead-dropdown-icon' />
              Add new
            </button>
            {/* <Dropdown
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              activator={
                <button
                  type='button'
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className='product-form__add-lead-dropdown-button'
                >
                  <PlusIcon className='product-form__add-lead-dropdown-icon' />
                  Add new
                </button>
              }
            >
              <AddNewProjectForm
                value={projectFile}
                onSubmit={handleSendProject}
                handleChangeFile={handleChangeFile}
              />
            </Dropdown> */}
          </div>
        </div>
        <IcpTable
          isLoading={isLoading}
          products={
            searchQuery
              ? data.filter((project: IProduct) => {
                  const lowerCasedQuery = searchQuery.toLowerCase()
                  return (
                    project.name.toLowerCase().includes(lowerCasedQuery) ||
                    project.industry.toLowerCase().includes(lowerCasedQuery) ||
                    project.location.toLowerCase().includes(lowerCasedQuery) ||
                    project.product.toLowerCase().includes(lowerCasedQuery) ||
                    project.technology_stack
                      .toLowerCase()
                      .includes(lowerCasedQuery) ||
                    project.integration_needs
                      .toLowerCase()
                      .includes(lowerCasedQuery) ||
                    project.success_metrics
                      .toLowerCase()
                      .includes(lowerCasedQuery) ||
                    project.long_term_goals
                      .toLowerCase()
                      .includes(lowerCasedQuery) ||
                    project.short_term_goals
                      .toLowerCase()
                      .includes(lowerCasedQuery) ||
                    project.term.toLowerCase().includes(lowerCasedQuery) ||
                    project.pain_points
                      .toLowerCase()
                      .includes(lowerCasedQuery) ||
                    project.business_model
                      .toLowerCase()
                      .includes(lowerCasedQuery)
                  )
                })
              : data
          }
        />
      </div>
      <Dialog
        className='product-form__dialog'
        onClose={onDialogClose}
        open={isDialogOpen}
      >
        <div className='product-form__content'>
          {isSubmitLoading ? (
            <div className='product-form__loader'>
              <span className='product-form__modal-title'>
                Response is forming
              </span>
              <div className='product-form__loader-wrapper'>
                <Loader />
              </div>
            </div>
          ) : (
            <>
              {gptAnswer ? (
                <>
                  <span className='product-form__added-content-title'>
                    Decide to save or discard response
                  </span>
                  <div className='product-form__added-content'>
                    <IcpTable
                      isLoading={false}
                      products={gptAnswer && JSON.parse(gptAnswer)}
                    />
                    <div className='product-form__controls'>
                      <CustomButton
                        style='outlined'
                        onClick={() => {
                          setGptAnswer('')
                          onDialogClose()
                        }}
                      >
                        Discard
                      </CustomButton>
                      <CustomButton onClick={handleResponseSubmit}>
                        Submit
                      </CustomButton>
                    </div>
                  </div>
                </>
              ) : (
                <AddNewProjectForm
                  value={projectFile}
                  onSubmit={handleSendProject}
                  onCancelPress={onDialogClose}
                  handleChangeFile={handleChangeFile}
                />
              )}
            </>
          )}
        </div>
      </Dialog>
      <button
        className='product-form__chatlog-button'
        onClick={() => setIsLogsShown(!isLogsShown)}
      >
        <MessagesIcon />
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
