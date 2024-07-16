import Loader from '../../../../Shared/Loader/Loader'
import './IcpTable.scss'

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
}

const IcpTable = ({ products, isLoading }: IIcpTableProps) => {
  return (
    <div className='lead-table__wrapper'>
      <table className='lead-table'>
        <tr className='lead-table__row-head'>
          <th>Name</th>
          <th>Industry</th>
          <th>Company size</th>
          <th>Location</th>
          <th style={{ width: '70px' }}>Business model</th>
          <th style={{ width: '170px' }}>Company type</th>
          <th style={{ width: '200px' }}>Buying behaviour</th>
          <th>Product usage</th>
          <th>Technology stack</th>
          <th>Integration needs</th>
        </tr>
        {products?.map((product) => {
          return (
            <tr key={product?.id} className='lead-table__row'>
              <td>{product?.name}</td>
              <td>{product?.industry}</td>
              <td>{product?.company_size}</td>
              <td>{product?.location}</td>
              <td style={{ textAlign: 'center' }}>{product?.business_model}</td>
              <td>{product?.company_type}</td>
              <td>{product?.buying_behaviour}</td>
              <td>{product?.product_usage}</td>
              <td>{product?.technology_stack}</td>
              <td>{product?.integration_needs}</td>
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

export default IcpTable
