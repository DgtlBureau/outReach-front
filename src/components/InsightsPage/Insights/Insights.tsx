import { ReactComponent as ArrowRight } from './images/chevron-right.svg'
import Loader from '../../Shared/Loader/Loader'
import { Checkbox } from '@mui/material'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import React from 'react'

import './Insights.scss'

export interface Iinsight {
  id: number
  last_message: string
}

interface IInsightsProps {
  insights: Iinsight[]
  isLoading?: boolean
  hideToChat?: boolean
  checkedItems?: number[]
  handleCheckHead?: () => void
  handleCheckCell?: (id: number) => void
}

const Insights = ({
  insights,
  isLoading,
  hideToChat,
  checkedItems,
  handleCheckHead,
  handleCheckCell,
}: IInsightsProps) => {
  return (
    <section className='insights-table__wrapper'>
      <div
        className={cn(
          'insights-table',
          !handleCheckHead || !handleCheckCell
            ? 'insights-table--no-checkbox'
            : ''
        )}
      >
        <span className='insights-table__cell-head'>Chat name</span>
        <span className='insights-table__cell-head'>To chat</span>

        {insights?.map((insight) => {
          return (
            <React.Fragment key={insight.id}>
              <span className='insights-table__cell insights-table__cell-last-message'>
                {insight.last_message}
              </span>
              <span className='insights-table__cell insights-table__to-chat-cell'>
                <Link
                  className='insights-table__to-chat'
                  to={`/insights/${insight.id}/chat`}
                >
                  <ArrowRight className='insights-table__to-chat-icon' />
                </Link>
              </span>
            </React.Fragment>
          )
        })}
      </div>
      {isLoading ? (
        <div className='insights-table__loader'>
          <Loader />
        </div>
      ) : null}
    </section>
  )
}

export default Insights
