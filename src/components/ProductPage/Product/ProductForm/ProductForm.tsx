import MessageList from '../../../ChatPage/ChatForm/ChatBox/MessageList/MessageList'
import { ReactComponent as MessagesIcon } from './images/messages-icon.svg'
import AddNewProjectForm from './AddNewProjectForm/AddNewProjectForm'
import CustomButton from '../../../Shared/CustomButton/CustomButton'
import { ReactComponent as PlusIcon } from './images/plus-icon.svg'
import { ReactComponent as DeleteIcon } from './images/delete-icon.svg'
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
  const [gptAnswer, setGptAnswer] = useState<any>('')
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectFile, setProjectFile] = useState<any>(null)
  const [isLogsShown, setIsLogsShown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const handleChangeFile = (event: any) => {
    setProjectFile(event.target.files[0])
  }

  const { isLoading, data, refetch } = useFetch(
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

  const handleCheckAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(data.map((item: IProduct) => item.id))
    }
  }

  const handleCheckCell = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item: number) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
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
      onDialogClose()
      refetch()
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    }
  }

  const handleRemoveProject = async () => {
    if (selectedItems.length === 0) {
      return
    }
    for (const id of selectedItems) {
      try {
        const res = await instance.delete(`/projects/${id}`)
        if (res.data.message !== 'Success') {
          enqueueSnackbar(`Project with id ${id} is ${res.data.message}`, { variant: 'error' })
          throw new Error(res.data.message)
        }
        enqueueSnackbar(`Project with id ${id} was removed`, { variant: 'success' })
        refetch()
        setSelectedItems(prev => prev.filter(item => item !== id))
      } catch (error) {
        enqueueSnackbar(String(error), { variant: 'error' })
      }
    }
  }

  return (
    <div className='product-form'>
      <div className='product-form__table-wrapper'>
        <div className='product-form__table-title-wrapper'>
          <span className='product-form__table-title'>Projects</span>
          <div className='product-form__table-head-right'>
            {selectedItems.length !== 0 && <button type='button' className='product-form__delete-button' onClick={handleRemoveProject}>
              <DeleteIcon />
              {`Delete ${selectedItems.length !== 0 ? `(${selectedItems.length})` : ''}`}
            </button>}
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
          </div>
        </div>
        <IcpTable
          isLoading={isLoading}
          handleCheckHead={handleCheckAll}
          handleCheckCell={handleCheckCell}
          checkedItems={selectedItems}
          refetch={()=>refetch()}
          products={
            searchQuery
              ? data.filter((project: IProduct) => {
                  const lowerCasedQuery = searchQuery.toLowerCase()
                  return (
                    project.client_name.toLowerCase().includes(lowerCasedQuery) ||
                    project.industry_name.toLowerCase().includes(lowerCasedQuery) ||
                    project.direction_of_application.toLowerCase().includes(lowerCasedQuery) ||
                    project.project_description.toLowerCase().includes(lowerCasedQuery) ||
                    project.scope_of_work
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
