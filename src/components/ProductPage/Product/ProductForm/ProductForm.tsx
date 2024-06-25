import { generateColors } from '../../../../utils/useGenerateColor'
import { Button, TextField } from '@mui/material'
import SkillChip from './SkillChip/SkillChip'
import { ISkill } from '../Product'
import { useState } from 'react'
import cn from 'classnames'

import './ProductForm.scss'

interface IProductFormProps {
  skills: ISkill[]
  clickAddSkill: (skill: ISkill) => void
  clickDeleteSkill: (id: number) => void
}

const ProductForm = ({
  skills,
  clickAddSkill,
  clickDeleteSkill,
}: IProductFormProps) => {
  const [skillName, setSkillName] = useState('')

  return (
    <form className='product-form'>
      <TextField label='Title' className='product-form__input' />
      <div className='product-form__input-group'>
        <TextField label='Industry' className='product-form__input' />
        <TextField label='Service' className='product-form__input' />
      </div>
      <div className='product-form__skills-container'>
        {skills.map((skill) => (
          <SkillChip
            key={skill.id}
            skill={skill}
            onDeleteClick={() => clickDeleteSkill(skill.id)}
          />
        ))}
      </div>
      <div
        className={cn(
          'product-form__input-group',
          'product-form__input-group-with-button'
        )}
      >
        <TextField
          value={skillName}
          onChange={(event) => setSkillName(event.target.value)}
          label='Skill name'
          className='product-form__input'
        />
        <Button
          onClick={() => {
            clickAddSkill({
              name: skillName,
              id: skills.length + 1,
              colors: generateColors(),
            })
            setSkillName('')
          }}
          disabled={skillName.length < 2}
          className='product-form__button'
        >
          Add Skill
        </Button>
      </div>
      <TextField
        label='Unique Offer'
        className={cn('product-form__input', 'product-form__input-top-margin')}
      />
      <div className='product-form__input-group'>
        <TextField label='Sales first name' className='product-form__input' />
        <TextField label='Sales last name' className='product-form__input' />
      </div>
      <h3 className='product-form__title'>Client</h3>
      <div
        className={cn(
          'product-form__input-group',
          'product-form__input-group-margin-top'
        )}
      >
        <TextField label='Industry' className='product-form__input' />
        <TextField label='Client Position' className='product-form__input' />
      </div>
      <div
        className={cn(
          'product-form__input-group',
          'product-form__input-group-margin-top'
        )}
      >
        <div className='product-form__empty-block' />
        <TextField label='Company size' className='product-form__input' />
      </div>
      <TextField
        label='Presentation link'
        className='product-form__input product-form__input-top-margin'
      />
      <h3 className='product-form__title'>Case</h3>
      <div
        className={cn(
          'product-form__input-group',
          'product-form__input-group-margin-top'
        )}
      >
        <TextField
          inputProps={{ className: 'product-form__input-active' }}
          label='Case title'
          className='product-form__input'
        />
        <div className='product-form__empty-block' />
      </div>
      <TextField
        label='Goal'
        className={cn('product-form__input', 'product-form__input-top-margin')}
      />
      <TextField
        label='Result'
        className={cn('product-form__input', 'product-form__input-top-margin')}
      />
      <TextField
        label='pains'
        className={cn('product-form__input', 'product-form__input-top-margin')}
      />
      <Button variant='contained' className='product-form__submit-button'>
        Confirm
      </Button>
    </form>
  )
}

export default ProductForm
