import { ReactComponent as CloseIcon } from './images/close-icon.svg'

import './LeadItem.scss'

interface ILeadItemProps {
  label?: string
  description?: string
  onCloseClick?: () => void
}

const LeadItem = ({ label, description, onCloseClick }: ILeadItemProps) => {
  return (
    <li className='lead-item'>
      <span className='lead-item__title'>{label}</span>
      <p className='lead-item__description'>{description}</p>
      <button
        onClick={onCloseClick}
        className='lead-item__button lead-item__close-button'
      >
        <CloseIcon className='lead-item__icon' />
      </button>
    </li>
  )
}

export default LeadItem
