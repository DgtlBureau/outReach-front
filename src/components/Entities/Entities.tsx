import Entity from './Entity/Entity'
import image1 from './images/1.jpg'
import image2 from './images/2.jpg'
import image3 from './images/3.jpg'

import './Entities.scss'

const Entities = () => {
  return (
    <ul className='entities'>
      <Entity image={image1} name='Доброткова' address='ул. Доброткова 12' />
      <Entity image={image2} name='Доброткова' address='ул. Доброткова 12' />
      <Entity image={image3} name='Доброткова' address='ул. Доброткова 12' />
    </ul>
  )
}

export default Entities
