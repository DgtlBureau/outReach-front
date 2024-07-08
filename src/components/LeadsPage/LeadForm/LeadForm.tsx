import CustomInput from '../../Shared/CustomInput/CustomInput'
import CustomButton from '../../Shared/CustomButton/CustomButton'
import FileUpload from '../../Shared/FileUpload/FileUpload'
import LeadTable from './LeadTable/LeadTable'

import './LeadForm.scss'

const LeadForm = () => {
  return (
    <form className='lead-form'>
      <div className='lead-form__input-wrapper'>
        <CustomInput className='lead-form__input' label='LinkedIn URL' />
        <span className='lead-form__or'>or</span>
        <FileUpload label='Upload screenshots' />
      </div>
      <CustomButton className='lead-form__confirm'>Confirm</CustomButton>
      <div className='lead-form__table-wrapper'>
        <span className='lead-form__table-title'>Profile</span>
        <LeadTable />
      </div>
    </form>
  )
}

export default LeadForm
