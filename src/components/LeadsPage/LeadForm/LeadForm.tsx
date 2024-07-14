import { useState } from 'react'
import CustomButton from '../../Shared/CustomButton/CustomButton'
import FileUpload from '../../Shared/FileUpload/FileUpload'

import './LeadForm.scss'
import instance from '../../../utils/api'

const LeadForm = () => {
  const [files, setFiles] = useState<any>([])

  const handleChangeFiles = (event: any) => {
    setFiles(event.target.files)
  }

  console.log(files)

  const handleSubmit = async (event: any) => {
    const formData = new FormData()
    formData.append('images', files)
    event.preventDefault()
    try {
      const response = await instance.post('/lead/check-answer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(files)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='lead-form' onSubmit={handleSubmit}>
      <span className='lead-form__title'>Add new lead</span>
      <div className='lead-form__input-wrapper'>
        <input
          required
          className='lead-form__input'
          placeholder='LinkedIn URL'
        />
        <span className='lead-form__or'>OR</span>
        <FileUpload
          value={files[0]?.filename}
          onChange={handleChangeFiles}
          label='Upload screenshots'
        />
      </div>
      <CustomButton type='submit' className='lead-form__confirm'>
        Submit
      </CustomButton>
    </form>
  )
}

export default LeadForm
