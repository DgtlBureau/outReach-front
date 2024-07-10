import CustomInput from '../../Shared/CustomInput/CustomInput'
import CustomButton from '../../Shared/CustomButton/CustomButton'
import FileUpload from '../../Shared/FileUpload/FileUpload'

import './LeadForm.scss'

const LeadForm = () => {
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

export default LeadForm
