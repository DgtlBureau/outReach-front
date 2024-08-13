import { ReactComponent as CloseIcon } from './images/close-icon.svg'

import './ProjectItem.scss'

interface IProjectItemProps {
  id:number
  label?: string
  onCloseClick: (id:number) => void
  model?: string
  industry?: string
  usage?: string
}

const ProjectItem = ({
  id,
  label,
  model,
  industry,
  usage,
  onCloseClick,
}: IProjectItemProps) => {
  return (
    <li className='project-item'>
      <span className='project-item__title'>{label}</span>
      <div className='project-item__description'>
        <p className='project-item__model'>{model}</p>
        <p className='project-item__model'>{industry}</p>
        <p className='project-item__model'>{usage}</p>
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
