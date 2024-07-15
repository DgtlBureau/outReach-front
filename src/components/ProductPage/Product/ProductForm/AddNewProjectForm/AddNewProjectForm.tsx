import React from 'react'
import FileUpload from '../../../../Shared/FileUpload/FileUpload'
import CustomButton from '../../../../Shared/CustomButton/CustomButton'

interface IAddNewProjectFormProps {
  handleChangeFile: (event: any) => void
  onSubmit: () => void
}

const AddNewProjectForm = ({
  handleChangeFile,
  onSubmit,
}: IAddNewProjectFormProps) => {
  return (
    <form className='lead-form'>
      <span className='lead-form__title'>Add new project</span>
      <div className='lead-form__input-wrapper'>
        <FileUpload
          accept='.pdf'
          onChange={handleChangeFile}
          label='Upload PDF file'
        />
      </div>
      <CustomButton
        type='button'
        onClick={onSubmit}
        className='lead-form__confirm'
      >
        Submit
      </CustomButton>
    </form>
  )
}

export default AddNewProjectForm
