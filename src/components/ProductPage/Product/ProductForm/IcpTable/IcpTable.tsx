import React from 'react'
import Loader from '../../../../Shared/Loader/Loader'
import './IcpTable.scss'
import { Checkbox } from '@mui/material'

export interface IProduct {
  business_model: string
  buying_behaviour: string
  common_problems: string
  company_size: string
  company_type: string
  description: string
  direction: string
  id: number
  industry: string
  integration_needs: string
  location: string
  long_term_goals: string
  name: string
  pain_points: string
  product: string
  product_usage: string
  project: string
  short_term_goals: string
  success_metrics: string
  technology_stack: string
  term: string
}

interface IIcpTableProps {
  products: IProduct[]
  isLoading?: boolean
  checkedItems?: number[]
  handleCheckHead?: () => void
  handleCheckCell?: (id: number) => void
}

const IcpTable = ({
  products,
  isLoading,
  checkedItems,
  handleCheckHead,
  handleCheckCell,
}: IIcpTableProps) => {
  return (
    <div className='icp-table__wrapper'>
      <div
        style={
          !handleCheckHead || !handleCheckCell
            ? { gridTemplateColumns: 'repeat(10, 1fr)' }
            : {}
        }
        className='icp-table'
      >
        {handleCheckHead ? (
          <div className='icp-table__cell-head icp-table__cell-head--checkbox'>
            <Checkbox
              sx={{
                '&.Mui-checked': {
                  color: '#6c47ff',
                },
              }}
              onChange={handleCheckHead}
              checked={products?.length === checkedItems?.length}
            />
          </div>
        ) : (
          ''
        )}
        <span className='icp-table__cell-head'>Name</span>
        <span className='icp-table__cell-head'>Industry</span>
        <span className='icp-table__cell-head'>Company size</span>
        <span className='icp-table__cell-head'>Location</span>
        <span className='icp-table__cell-head'>Business model</span>
        <span className='icp-table__cell-head'>Company type</span>
        <span className='icp-table__cell-head'>Buying behaviour</span>
        <span className='icp-table__cell-head'>Product usage</span>
        <span className='icp-table__cell-head'>Technology stack</span>
        <span className='icp-table__cell-head'>Integration needs</span>
        {products?.map((product) => {
          return (
            <React.Fragment key={product.id}>
              {handleCheckCell ? (
                <div className='icp-table__cell icp-table__cell--checkbox'>
                  <Checkbox
                    sx={{
                      '&.Mui-checked': {
                        color: '#6c47ff',
                      },
                    }}
                    onChange={() => handleCheckCell(product.id)}
                    checked={checkedItems?.includes(product.id)}
                  />
                </div>
              ) : (
                ''
              )}
              <span className='icp-table__cell'>{product?.name}</span>
              <span className='icp-table__cell'>{product?.industry}</span>
              <span className='icp-table__cell'>{product?.company_size}</span>
              <span className='icp-table__cell'>{product?.location}</span>
              <span className='icp-table__cell' style={{ textAlign: 'center' }}>
                {product?.business_model}
              </span>
              <span className='icp-table__cell'>{product?.company_type}</span>
              <span className='icp-table__cell'>
                {product?.buying_behaviour}
              </span>
              <span className='icp-table__cell'>{product?.product_usage}</span>
              <span className='icp-table__cell'>
                {product?.technology_stack}
              </span>
              <span className='icp-table__cell'>
                {product?.integration_needs}
              </span>
            </React.Fragment>
          )
        })}
      </div>
      {isLoading ? (
        <div className='icp-table__loader'>
          <Loader />
        </div>
      ) : null}
    </div>
  )
}

export default IcpTable
