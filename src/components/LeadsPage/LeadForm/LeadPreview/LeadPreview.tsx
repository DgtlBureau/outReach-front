import CustomButton from '../../../Shared/CustomButton/CustomButton'
import LeadTable from '../LeadTable/LeadTable'
import LeadLine from './LeadLine/LeadLine'
import './LeadPreview.scss'

interface ILeadPreviewProps {
  gptAnswer: any
  isModal: boolean
  onDiscard: () => void
  onSubmit: () => void
}

const LeadPreview = ({
  isModal,
  gptAnswer,
  onDiscard,
  onSubmit,
}: ILeadPreviewProps) => {
  console.log(gptAnswer)

  return (
    <div className='lead-preview'>
      <LeadTable
        hideToChat
        isModal={isModal}
        leads={[
          {
            id: 1,
            cases: [],
            full_name: gptAnswer.FIO,
            description: gptAnswer.Description,
            url: gptAnswer.URL,
          },
        ]}
      />
      <div className='lead-preview__controls'>
        <CustomButton style='outlined' onClick={onDiscard}>
          Discard
        </CustomButton>
        <CustomButton onClick={onSubmit}>Submit</CustomButton>
      </div>
    </div>
  )
}

export default LeadPreview
