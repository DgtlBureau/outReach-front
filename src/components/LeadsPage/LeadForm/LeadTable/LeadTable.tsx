import { Link } from 'react-router-dom'
import Loader from '../../../Shared/Loader/Loader'
import { ReactComponent as ArrowRight } from './images/chevron-right.svg'
import React from 'react'

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
  isLoading?: boolean
  hideToChat?: boolean
}

const LeadTable = ({ leads, isLoading, hideToChat }: ILeadTableProps) => {
  return (
    <div className='lead-table__wrapper'>
      <div
        style={hideToChat ? { gridTemplateColumns: '160px 1fr 200px' } : {}}
        className='lead-table'
      >
        <span className='lead-table__cell-head'>Full name</span>
        <span className='lead-table__cell-head'>Description</span>
        <span className='lead-table__cell-head'>URL</span>
        {hideToChat ? (
          ''
        ) : (
          <span className='lead-table__cell-head'>To chat</span>
        )}
        {leads?.map((lead) => {
          return (
            <React.Fragment key={lead.id}>
              <span className='lead-table__cell'>{lead.full_name}</span>
              <span className='lead-table__cell'>{lead.description}</span>
              <a
                className='lead-table__cell lead-table__cell-url'
                style={{ wordBreak: 'break-all' }}
                href={lead.url}
              >
                {lead.url}
              </a>
              {hideToChat ? (
                ''
              ) : (
                <span className='lead-table__cell lead-table__to-chat-cell'>
                  <Link
                    className='lead-table__to-chat'
                    to={`/leads/${lead.id}/chat`}
                  >
                    <ArrowRight className='lead-table__to-chat-icon' />
                  </Link>
                </span>
              )}
            </React.Fragment>
          )
        })}
      </div>
      {isLoading ? (
        <div className='lead-table__loader'>
          <Loader />
        </div>
      ) : null}
    </div>
  )
}

export default LeadTable
