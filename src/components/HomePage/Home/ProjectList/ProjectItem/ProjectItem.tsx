import { ReactComponent as CloseIcon } from './images/close-icon.svg'

import './ProjectItem.scss'

interface IProjectItemProps {
  label?: string
  onCloseClick?: () => void
  model?: string
  industry?: string
  usage?: string
  description?: string
}

const ProjectItem = ({
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
        onClick={onCloseClick}
        className='project-item__button project-item__close-button'
      >
        <CloseIcon className='project-item__icon' />
      </button>
    </li>
  )
}

export default ProjectItem
