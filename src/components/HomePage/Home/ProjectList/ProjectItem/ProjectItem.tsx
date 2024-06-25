import { ReactComponent as CloseIcon } from './images/close-icon.svg'
import { ReactComponent as EditIcon } from './images/edit-icon.svg'

import './ProjectItem.scss'

interface IProjectItemProps {
  label?: string
  onCloseClick: () => void
}

const ProjectItem = ({ label, onCloseClick }: IProjectItemProps) => {
  return (
    <li className='project-item'>
      <span className='project-item__title'>{label}</span>
      <button
        onClick={onCloseClick}
        className='project-item__button project-item__close-button'
      >
        <CloseIcon className='project-item__icon' />
      </button>
      <button className='project-item__button project-item__edit-button'>
        <EditIcon className='project-item__icon' />
      </button>
    </li>
  )
}

export default ProjectItem
