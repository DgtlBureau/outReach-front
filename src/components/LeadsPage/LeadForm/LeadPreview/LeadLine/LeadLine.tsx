import './LeadLine.scss'

interface ILeadLineProps {
  label: string
  text: string
}

const LeadLine = ({ label, text }: ILeadLineProps) => {
  return (
    <label className='lead-line'>
      {label}
      <span className='lead-line__text'>{text}</span>
    </label>
  )
}

export default LeadLine
