import React from 'react'
import Loader from '../../../../Shared/Loader/Loader'
import './IcpTable.scss'
import { Checkbox } from '@mui/material'

export interface IProduct {
  id: number
  industry_name: string
  client_name: string
  direction_of_application: string
  project_description: string
  scope_of_work: string
  ClientName: string
  DirectionOfApplication: string
  IndustryName: string
  ScopeOfWork: string
  Project: string
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
            ? { gridTemplateColumns: 'repeat(5, 1fr)' }
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
        <span className='icp-table__cell-head'>Client Name</span>
        <span className='icp-table__cell-head'>Industry name</span>
        <span className='icp-table__cell-head'>Direction of application</span>
        <span className='icp-table__cell-head'>Project description</span>
        <span className='icp-table__cell-head'>Scope of work</span>
        {products?.map((product, idx) => {
          return (
            <React.Fragment key={product.id || idx}>
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
              <span className='icp-table__cell'>
                {product.client_name || product.ClientName}
              </span>
              <span className='icp-table__cell'>
                {product.industry_name || product.IndustryName}
              </span>
              <span className='icp-table__cell'>
                {product.direction_of_application ||
                  product.DirectionOfApplication}
              </span>
              <span className='icp-table__cell'>
                {product.project_description || product.Project}
              </span>
              <span className='icp-table__cell'>
                {product.scope_of_work || product.ScopeOfWork}
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
