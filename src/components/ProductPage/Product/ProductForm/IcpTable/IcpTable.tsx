import React from 'react'
import Loader from '../../../../Shared/Loader/Loader'
import './IcpTable.scss'
import { Checkbox } from '@mui/material'
import IcpBody from './IcpBody/IcpBody'
import { enqueueSnackbar } from 'notistack'
import instance from '../../../../../utils/api'

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
  isModal: boolean
  changeGptAnswer: ({
    e,
    idx,
  }: {
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    idx: number | null | undefined
  }) => void
  checkedItems?: number[]
  handleCheckHead?: () => void
  handleCheckCell?: (id: number) => void
  refetch?: () => void
}

const IcpTable = ({
  products,
  isLoading,
  isModal,
  changeGptAnswer,
  checkedItems,
  handleCheckHead,
  handleCheckCell,
  refetch,
}: IIcpTableProps) => {
  const submitData = async (formData: IProduct) => {
    try {
      const response = await instance.put(`/projects/${formData.id}`, formData)
      if (!response.data) {
        throw new Error('An error occurred while deleting the project')
      }
      enqueueSnackbar(`Project ${formData.client_name} was changed`, {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    } finally {
      if (refetch) {
        refetch()
      }
    }
  }

  return (
    <div className='icp-table__wrapper'>
      <div
        style={
          handleCheckHead || handleCheckCell
            ? { gridTemplateColumns: '60px repeat(5, 1fr) 40px' }
            : { gridTemplateColumns: 'repeat(5, 1fr)' }
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
        {!isModal && <span className='icp-table__cell-head' />}
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
              <IcpBody
                changeGptAnswer={changeGptAnswer}
                idx={idx}
                isModal={isModal}
                product={product}
                inputBoxClass='icp-table__cell'
                onSubmit={submitData}
              />
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
