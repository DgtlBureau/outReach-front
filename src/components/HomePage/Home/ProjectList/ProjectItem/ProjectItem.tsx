import { ReactComponent as CloseIcon } from './images/close-icon.svg'

import './ProjectItem.scss'

interface IProjectItemProps {
  id:number
  label?: string
  onCloseClick?: () => void
  description?: string
}

const ProjectItem = ({
  id,
  label,
  description,
  onCloseClick,
}: IProjectItemProps) => {
  return (
    <li className='project-item'>
      <span className='project-item__title'>{label}</span>
      <div className='project-item__description'>
        <p className='project-item__model'>{description}</p>
      </div>
      <button
        onClick={()=>onCloseClick(id)}
        className='project-item__button project-item__close-button'
      >
        <CloseIcon className='project-item__icon' />
      </button>
    </li>
  )
}

export default ProjectItem
