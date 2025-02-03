import { Link } from 'react-router-dom'

import './Entity.scss'

interface IEntityProps {
  id?: number
  image: string
  name: string
  address: string
}

const Entity = ({ id = 1, image, name, address }: IEntityProps) => {
  return (
    <li className='entity'>
      <Link to={`${id}`} className='entity__link'>
        <img className='entity__image' src={image} alt='Object cover' />
        <div>
          <span className='entity__name'>{name}</span>
          <span className='entity__address'>{address}</span>
        </div>
      </Link>
    </li>
  )
}

export default Entity
