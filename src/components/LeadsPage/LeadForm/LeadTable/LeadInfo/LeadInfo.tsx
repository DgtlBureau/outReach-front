import { TextareaAutosize } from '@mui/material'
import CustomInput from '../../../../Shared/CustomInput/CustomInput'
import { ILead } from '../LeadTable'
import { ReactComponent as CloseIcon } from './images/close.svg'

import './LeadInfo.scss'

interface ILeadInfoProps {
  lead: ILead
  onCloseClick: () => void
}

const LeadInfo = ({ onCloseClick, lead }: ILeadInfoProps) => {
  return (
    <div className='lead-info'>
      <div className='lead-info__header'>
        <button onClick={onCloseClick} className='lead-info__close'>
          <CloseIcon />
        </button>
        <span className='lead-info__title'>Personal Card</span>
      </div>
      <div className='lead-info__content'>
        <CustomInput label='Full name' value={lead?.full_name} />
        <CustomInput label='URL' value={lead?.url} />
        <div className='lead-info__textarea-wrapper'>
          <span className='lead-info__textarea-label'>Description</span>
          <TextareaAutosize
            className='lead-info__textarea'
            value={lead?.description}
          />
        </div>
        <label className='lead-info__work-history'>
          <span className='lead-info__work-history-label'>Work history</span>
          {lead?.work_history.map((item: any) => {
            return (
              <div key={item.id} className='lead-info__work-history-item'>
                <div className='lead-info__work-history-text'>
                  {item.start_work} - {item.end_work}
                </div>
                <div className='lead-info__work-history-text'>
                  {item.position} {item.company}
                </div>
              </div>
            )
          })}
        </label>
        <label className='lead-info__cases'>
          <span className='lead-info__cases-label'>Cases</span>
          {lead?.cases.map(
            (item: {
              id: number
              case_problem: string
              case_purpose: string
              case_result: string
            }) => {
              return (
                <div key={item.id} className='lead-info__cases-item'>
                  <div className='lead-info__cases-text'>Case - Problem</div>
                  <div className='lead-info__cases-text'>
                    {item.case_problem}
                  </div>
                  <div className='lead-info__cases-text'>Case - Purpose</div>
                  <div className='lead-info__cases-text'>
                    {item.case_purpose}
                  </div>
                  <div className='lead-info__cases-text'>Case - Result</div>
                  <div className='lead-info__cases-text'>
                    {item.case_result}
                  </div>
                </div>
              )
            }
          )}
        </label>
        <label className='lead-info__cases'>
          <span className='lead-info__cases-label'>Publications</span>
          {lead?.publication.map((item: any) => {
            return (
              <div key={item.id} className='lead-info__cases-item'>
                <div className='lead-info__cases-text'>Direction</div>
                <div className='lead-info__cases-text'>{item.direction}</div>
                <div className='lead-info__cases-text'>Themes</div>
                <div className='lead-info__cases-text'>{item.themes}</div>
              </div>
            )
          })}
        </label>
      </div>
    </div>
  )
}

export default LeadInfo
