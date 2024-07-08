import CustomButton from '../../../Shared/CustomButton/CustomButton'
import FileUpload from '../../../Shared/FileUpload/FileUpload'
import ProductTable from './ProductTable/ProductTable'
import { TextField } from '@mui/material'
import IcpTable from './IcpTable/IcpTable'

import './ProductForm.scss'

const ProductForm = () => {
  return (
    <form className='product-form'>
      <div className='product-form__input-group'>
        <FileUpload label='Upload file' />
      </div>
      <div className='product-form__input-group product-form__input-group-margin-top'>
        <TextField label='Title' className='product-form__input' />
        <TextField label='Industry' className='product-form__input' />
        <TextField label='Service' className='product-form__input' />
      </div>
      <div className='product-form__table-wrapper'>
        <span className='product-form__table-title'>Cases</span>
        <ProductTable />
      </div>
      <div className='product-form__table-wrapper'>
        <span className='product-form__table-title'>ICP&lsquo;s</span>
        <IcpTable />
      </div>
      <CustomButton className='product-form__submit-button'>
        Confirm
      </CustomButton>
    </form>
  )
}

export default ProductForm
