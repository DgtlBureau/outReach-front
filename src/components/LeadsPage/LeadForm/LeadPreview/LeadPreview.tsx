import CustomButton from '../../../Shared/CustomButton/CustomButton'
import LeadLine from './LeadLine/LeadLine'
import './LeadPreview.scss'

interface ILeadPreviewProps {
  gptAnswer: any
  onDiscard: () => void
  onSubmit: () => void
}

const LeadPreview = ({ gptAnswer, onDiscard, onSubmit }: ILeadPreviewProps) => {
  return (
    <div className='lead-preview'>
      <div className='lead-preview__line'>
        <LeadLine label='FIO' text={gptAnswer.FIO} />
      </div>
      <div className='lead-preview__line'>
        <LeadLine label='LinkedIn URL' text={gptAnswer.URL} />
      </div>
      <div className='lead-preview__line'>
        <LeadLine label='Description' text={gptAnswer.Description} />
      </div>
      <div className='lead-preview__line'>
        <span className='lead-preview__title'>Work History</span>
        {gptAnswer?.WorkHistory?.map((history: any, index: number) => (
          <div className='lead-preview__work-wrapper' key={index}>
            <span className='lead-preview__work'>
              {history.StartWork}
              {history.EndWork ? `-${history.EndWork}` : ''}
            </span>
            <span className='lead-preview__work'>{history.Position}</span>
            <span className='lead-preview__work'>
              {history.Company.Country}, {history.Company.City}
              {', '}
              {history.Company.CompanyName}
            </span>
          </div>
        ))}
      </div>
      {/* <div className='lead-preview__line'>
        <span className='lead-preview__title'>Publication History</span>
        {gptAnswer?.PublicationHistories?.map((history: any, index: number) => (
          <div className='lead-preview__work-wrapper' key={index}>
            {history?.Themes?.map((theme: string) => {
              return (
                <div className='lead-preview__work' key={theme}>
                  <span key={theme}>{theme}</span>
                </div>
              )
            })}
            <span className='lead-preview__title'>Themes</span>
            {history?.Direction?.map((direction: string) => {
              return (
                <div className='lead-preview__work' key={direction}>
                  <span key={direction}>{direction}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div> */}
      <div className='lead-preview__submit'>
        <CustomButton onClick={onSubmit}>Submit</CustomButton>
        <CustomButton variant='outlined' onClick={onDiscard}>
          Discard
        </CustomButton>
      </div>
    </div>
  )
}

export default LeadPreview
