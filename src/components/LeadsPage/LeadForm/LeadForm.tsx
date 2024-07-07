import CustomInput from '../../Shared/CustomInput/CustomInput'
import CustomButton from '../../Shared/CustomButton/CustomButton'
import FileUpload from '../../Shared/FileUpload/FileUpload'

import './LeadForm.scss'

const LeadForm = () => {
  return (
    <form className='lead-form'>
      <CustomInput label='LinkedIn URL' />
      <div className='lead-form__input-wrapper'>
        <FileUpload />
      </div>
      <CustomButton className='lead-form__confirm'>Confirm</CustomButton>
    </form>
  )
}

export default LeadForm
