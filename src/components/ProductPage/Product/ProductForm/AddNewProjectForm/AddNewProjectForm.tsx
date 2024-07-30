import FileUpload from '../../../../Shared/FileUpload/FileUpload'
import CustomButton from '../../../../Shared/CustomButton/CustomButton'

import './AddNewProjectForm.scss'

interface IAddNewProjectFormProps {
  handleChangeFile: (event: any) => void
  onCancelPress: () => void
  onSubmit: () => void
  value?: File
}

const AddNewProjectForm = ({
  handleChangeFile,
  onCancelPress,
  onSubmit,
  value,
}: IAddNewProjectFormProps) => {
  return (
    <form className='add-new-project-form'>
      <span className='add-new-project-form__title'>Add new project</span>
      <div className='add-new-project-form__content'>
        <label className='add-new-project-form__input-wrapper'>
          <span className='add-new-project-form__upload-label'>Upload</span>
          <FileUpload
            name={value?.name}
            accept='.pdf'
            onChange={handleChangeFile}
          />
        </label>
        <div className='add-new-project-form__controls'>
          <CustomButton
            type='button'
            onClick={onCancelPress}
            className='add-new-project-form__confirm'
            style='empty'
          >
            Cancel
          </CustomButton>
          <CustomButton
            type='button'
            onClick={onSubmit}
            className='add-new-project-form__confirm'
          >
            Submit
          </CustomButton>
        </div>
      </div>
    </form>
  )
}

export default AddNewProjectForm
