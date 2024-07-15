import CustomButton from '../../Shared/CustomButton/CustomButton'
import FileUpload from '../../Shared/FileUpload/FileUpload'
import { Dialog, DialogTitle } from '@mui/material'
import LeadPreview from './LeadPreview/LeadPreview'
import Loader from '../../Shared/Loader/Loader'
import { enqueueSnackbar } from 'notistack'
import instance from '../../../utils/api'
import { useState } from 'react'

import './LeadForm.scss'

const LeadForm = () => {
  const [gptAnswer, setGptAnswer] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<any>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [leadUrl, setLeadUrl] = useState('')

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

    setIsLoading(true)
    onDialogOpen()
    try {
      const { data } = await instance.post('/lead/check-answer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setGptAnswer(data.gpt_answer)
      console.log('response', data.gpt_answer)
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    } finally {
      setIsLoading(false)
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

  console.log(gptAnswer)

  return (
    <form className='lead-form' onSubmit={handleSubmit}>
      <span className='lead-form__title'>Add new lead</span>
      <div className='lead-form__input-wrapper'>
        <input
          value={leadUrl}
          onChange={(e: any) => setLeadUrl(e.target.value)}
          required
          className='lead-form__input'
          placeholder='LinkedIn URL'
        />
        <div className='lead-form__file-upload'>
          <FileUpload
            accept='.jpeg, .png, .jpg'
            value={files[0]?.filename}
            onChange={handleChangeFiles}
            label='Upload screenshots'
          />
        </div>
      </div>
      <CustomButton type='submit' className='lead-form__confirm'>
        Submit
      </CustomButton>
      <Dialog
        className='lead-form__dialog'
        onClose={onDialogClose}
        open={isDialogOpen}
      >
        <DialogTitle>
          {isLoading ? (
            <span className='lead-form__title'>Response is forming</span>
          ) : (
            <span className='lead-form__title'>
              Please, check the response and decide what to do
            </span>
          )}
        </DialogTitle>
        <div className='lead-form__content'>
          {isLoading ? (
            <div className='lead-form__loader'>
              <Loader />
            </div>
          ) : (
            <LeadPreview
              onSubmit={handleResponseSubmit}
              onDiscard={onDialogClose}
              gptAnswer={gptAnswer && JSON.parse(gptAnswer)}
            />
          )}
        </div>
      </Dialog>
    </form>
  )
}

export default LeadForm
