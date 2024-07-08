import './ProductTable.scss'

const ProductTable = () => {
  return (
    <div className='lead-table__wrapper'>
      <table className='lead-table'>
        <tr className='lead-table__row-head'>
          <th>Client</th>
          <th>Industry</th>
          <th>Direction</th>
          <th>Term</th>
          <th>Product</th>
          <th>Project</th>
          <th>Description</th>
        </tr>
        <tr className='lead-table__row'>
          <td>Oasis</td>
          <td>Service and Hospitality</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            We developed an IT system for employees working shifts. It includes
            a mobile app for interfactions with employers, reviews,
            accommodation changes, food orders, and more.
          </td>
        </tr>
      </table>
    </div>
  )
}

export default ProductTable
