import { Link } from 'react-router-dom'
import Loader from '../../../Shared/Loader/Loader'
import './LeadTable.scss'

export interface ILead {
  id: number
  cases: any
  description: string
  full_name: string
  url: string
}

interface ILeadTableProps {
  leads: ILead[]
  isLoading: boolean
}

const LeadTable = ({ leads, isLoading }: ILeadTableProps) => {
  return (
    <div className='lead-table__wrapper'>
      <table className='lead-table'>
        <tr className='lead-table__row-head'>
          <th style={{ width: '25%' }}>Full name</th>
          <th>Description</th>
          <th>URL</th>
          <th style={{ width: '5%' }}>To chat</th>
        </tr>
        {leads?.map((lead) => {
          return (
            <tr key={lead.id} className='lead-table__row'>
              <td>{lead.full_name}</td>
              <td>{lead.description}</td>
              <td style={{ wordBreak: 'break-all' }}>{lead.url}</td>
              <td className='lead-table__to-chat-cell'>
                <Link
                  className='lead-table__to-chat'
                  to={`/leads/${lead.id}/chat`}
                >
                  {'>'}
                </Link>
              </td>
            </tr>
          )
        })}
      </table>
      {isLoading ? (
        <div className='lead-table__loader'>
          <Loader />
        </div>
      ) : null}
    </div>
  )
}

export default LeadTable
