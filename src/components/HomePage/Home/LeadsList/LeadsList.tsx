import { ILead } from '../../../LeadsPage/LeadForm/LeadTable/LeadTable'
import LeadItem from './LeadItem/LeadItem'

import './LeadsList.scss'

const LeadsList = ({ leads }: { leads: ILead[] }) => {
  return (
    <ul className='leads-list'>
      {leads?.map((lead: ILead) => (
        <LeadItem
          key={lead.id}
          label={lead.full_name}
          description={lead.description}
        />
      ))}
    </ul>
  )
}

export default LeadsList
