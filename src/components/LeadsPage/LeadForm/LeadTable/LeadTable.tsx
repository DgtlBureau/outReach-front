import { ReactComponent as ArrowRight } from './images/chevron-right.svg'
import Loader from '../../../Shared/Loader/Loader'
import { Checkbox, Drawer } from '@mui/material'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import React, { useState } from 'react'

import './LeadTable.scss'
import LeadInfo from './LeadInfo/LeadInfo'

export interface ILead {
  id: number
  cases: any
  description: string
  full_name: string
  url: string
  work_history?: any
  publication?: any
}

interface ILeadTableProps {
  leads: ILead[]
  isModal: boolean
  isLoading?: boolean
  hideToChat?: boolean
  checkedItems?: number[]
  handleCheckHead?: () => void
  handleCheckCell?: (id: number) => void
}

const LeadTable = ({
  leads,
  isLoading,
  hideToChat,
  isModal,
  checkedItems,
  handleCheckHead,
  handleCheckCell,
}: ILeadTableProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentLead, setCurrentLead] = useState<ILead | null>(null)

  return (
    <div className='lead-table__wrapper'>
      <div
        className={cn(
          'lead-table',
          !handleCheckHead || !handleCheckCell ? 'lead-table--no-checkbox' : ''
        )}
      >
        {!isModal && (
          <div className='lead-table__cell-head lead-table__cell-head--checkbox'>
            <Checkbox
              sx={{
                '&.Mui-checked': {
                  color: '#6c47ff',
                },
              }}
              onChange={handleCheckHead}
              checked={leads?.length === checkedItems?.length}
            />
          </div>
        )}
        <span className='lead-table__cell-head'>Full name</span>
        <span className='lead-table__cell-head'>Description</span>
        {hideToChat ? (
          ''
        ) : (
          <span className='lead-table__cell-head'>To chat</span>
        )}
        {leads?.map((lead) => {
          return (
            <React.Fragment key={lead.id}>
              {handleCheckCell ? (
                <div className='lead-table__cell lead-table__cell--checkbox'>
                  <Checkbox
                    sx={{
                      '&.Mui-checked': {
                        color: '#6c47ff',
                      },
                    }}
                    onChange={() => handleCheckCell(lead.id)}
                    checked={checkedItems?.includes(lead.id)}
                  />
                </div>
              ) : (
                ''
              )}
              <button
                onClick={() => {
                  if (isModal) {
                    return
                  }
                  setIsDrawerOpen(true)
                  setCurrentLead(lead)
                }}
                className='lead-table__cell lead-table__cell-button'
              >
                {lead.full_name}
              </button>
              <span className='lead-table__cell'>{lead.description}</span>
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

      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: '50% !important',
            backgroundColor: 'var(--main-color)',
          },
        }}
      >
        <LeadInfo
          lead={currentLead as ILead}
          onCloseClick={() => setIsDrawerOpen(false)}
        />
      </Drawer>
    </div>
  )
}

export default LeadTable
