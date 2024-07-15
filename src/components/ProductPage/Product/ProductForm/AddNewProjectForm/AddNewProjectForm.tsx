import FileUpload from '../../../../Shared/FileUpload/FileUpload'
import CustomButton from '../../../../Shared/CustomButton/CustomButton'

import './AddNewProjectForm.scss'

interface IAddNewProjectFormProps {
  handleChangeFile: (event: any) => void
  onSubmit: () => void
  value?: File
}

const AddNewProjectForm = ({
  handleChangeFile,
  onSubmit,
  value,
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
      {value && (
        <span key={value.name} className='lead-form__file-preview'>
          {value.name}
        </span>
      )}
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
