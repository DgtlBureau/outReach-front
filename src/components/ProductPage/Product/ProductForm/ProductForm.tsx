import AddNewProjectForm from './AddNewProjectForm/AddNewProjectForm'
import { ReactComponent as PlusIcon } from './images/plus-icon.svg'
import Dropdown from '../../../Shared/Dropdown/Dropdown'
import { useFetch } from '../../../../utils/loadData'
import IcpTable from './IcpTable/IcpTable'
import { useState } from 'react'

import './ProductForm.scss'

const ProductForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isLoading, data } = useFetch(
    'projects',
    'Failed to load products. Please, try again later'
  )

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <form className='product-form'>
      {/* <div className='product-form__input-group'>
        <FileUpload label='Upload file' />
      </div>
      <div className='product-form__input-group product-form__input-group-margin-top'>
        <TextField label='Title' className='product-form__input' />
        <TextField label='Industry' className='product-form__input' />
        <TextField label='Service' className='product-form__input' />
      </div> */}
      {/* <div className='product-form__table-wrapper'>
        <span className='product-form__table-title'>Cases</span>
        <ProductTable />
      </div> */}
      <div className='product-form__table-wrapper'>
        <div className='product-form__table-title-wrapper'>
          <span className='product-form__table-title'>Projects</span>
          <Dropdown
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            activator={
              <button
                type='button'
                onClick={() => setIsModalOpen(!isModalOpen)}
                className='product-form__add-lead-dropdown-button'
              >
                <PlusIcon className='product-form__add-lead-dropdown-icon' />
              </button>
            }
          >
            <AddNewProjectForm />
          </Dropdown>
        </div>
        <IcpTable isLoading={isLoading} products={data} />
      </div>
      {/* <CustomButton className='product-form__submit-button'>
        Confirm
      </CustomButton> */}
    </form>
  )
}

export default ProductForm
