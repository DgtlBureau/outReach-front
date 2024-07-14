import React from 'react'
import FileUpload from '../../../../Shared/FileUpload/FileUpload'
import CustomButton from '../../../../Shared/CustomButton/CustomButton'

const AddNewProjectForm = () => {
  return (
    <form className='lead-form'>
      <span className='lead-form__title'>Add new lead</span>
      <div className='lead-form__input-wrapper'>
        <input className='lead-form__input' placeholder='LinkedIn URL' />
        <span className='lead-form__or'>OR</span>
        <FileUpload label='Upload screenshots' />
      </div>
      <CustomButton className='lead-form__confirm'>Submit</CustomButton>
    </form>
  )
}

export default AddNewProjectForm
