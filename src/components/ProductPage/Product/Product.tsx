import ProductForm from './ProductForm/ProductForm'

export interface ISkill {
  id: number
  name: string
  colors: { backgroundColor: string; textColor: string }
}

const Product = () => {
  return <ProductForm />
}

export default Product
