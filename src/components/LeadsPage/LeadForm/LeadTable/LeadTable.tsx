import './LeadTable.scss'

const LeadTable = () => {
  return (
    <div className='lead-table__wrapper'>
      <table className='lead-table'>
        <tr className='lead-table__row-head'>
          <th>Full name</th>
          <th>Description</th>
          <th>Case - Goal</th>
          <th>Case - Result</th>
          <th>Case - Problem</th>
          <th>Work History - Position</th>
          <th>Work History - Company</th>
          <th>Work History - Country</th>
        </tr>
        <tr className='lead-table__row'>
          <td>Oasis</td>
          <td>Service and Hospitality</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Japan</td>
        </tr>
      </table>
    </div>
  )
}

export default LeadTable
