import { useState } from 'react'
import ProductForm from './ProductForm/ProductForm'
import {
  generateBackgroundColor,
  generateColors,
} from '../../../utils/useGenerateColor'

export interface ISkill {
  id: number
  name: string
  colors: { backgroundColor: string; textColor: string }
}

const Product = () => {
  const [skills, setSkills] = useState<ISkill[]>([
    {
      id: 1,
      name: 'React',
      colors: generateColors(),
    },
    {
      id: 2,
      name: 'Node.js',
      colors: generateColors(),
    },
  ])

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter((s) => s.id !== id))
  }

  const handleAddSkill = (skill: ISkill) => {
    setSkills([...skills, skill])
  }

  return (
    <ProductForm
      skills={skills}
      clickAddSkill={handleAddSkill}
      clickDeleteSkill={handleDeleteSkill}
    />
  )
}

export default Product
