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
import { useEffect, useState } from 'react'

import './ProductForm.scss'

const ProductForm = () => {
  const [gptAnswer, setGptAnswer] = useState<any>('')
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectFile, setProjectFile] = useState<any>(null)
  const [isLogsShown, setIsLogsShown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItems, setSelectedItems] = useState<any>([])

 

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
      setGptAnswer(data)
      console.log('Set GPT Answer:', data);
      console.log('Parsed', JSON.parse(data.gpt_answer));
      
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    } finally {
      setIsSubmitLoading(false)
      console.log('ANSAWER', gptAnswer);
    }
  }

  const handleResponseSubmit = async () => {
    const formData = new FormData()
    // formData.append('gpt_answer', gptAnswer)
    formData.append('gpt_answer', gptAnswer)
    try {
      const response = await instance.post('/projects', formData, {
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

  // useEffect(() => {
  //   console.log('EFFECT', JSON.parse(gptAnswer.gpt_answer).Cases);
    
  // },[gptAnswer])

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
          </div>
        </div>
        <IcpTable
          isLoading={isLoading}
          handleCheckHead={handleCheckAll}
          handleCheckCell={handleCheckCell}
          checkedItems={selectedItems}
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
                      // products={gptAnswer && JSON.parse(gptAnswer)}
                      products={gptAnswer && JSON.parse(gptAnswer.gpt_answer).Cases}
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
