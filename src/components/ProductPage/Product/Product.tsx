import ProductForm from './ProductForm/ProductForm'

import './Product.scss'

export interface ISkill {
  id: number
  name: string
  colors: { backgroundColor: string; textColor: string }
}

const Product = () => {
  return (
    <main className='product'>
      <div className='product__wrapper'>
        <ProductForm />
      </div>
    </main>
  )
}

export default Product
