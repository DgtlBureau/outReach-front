import './IcpTable.scss'

const IcpTable = () => {
  return (
    <div className='lead-table__wrapper'>
      <table className='lead-table'>
        <tr className='lead-table__row-head'>
          <th>Industry</th>
          <th>Company size</th>
          <th>Location</th>
          <th>Business model</th>
          <th>Company type</th>
          <th>Buying behaviour</th>
          <th>Product usage</th>
          <th>Technology stack</th>
          <th>Integration needs</th>
        </tr>
        <tr className='lead-table__row'>
          <td>Sports management</td>
          <td>50-500 employees</td>
          <td>Asia, Europe, and North</td>
          <td>B2B</td>
          <td>Established enterprises and rapidly growing startups</td>
          <td>
            Seeking comprehensive America digital solutions; open to long-term
            partnerships
          </td>
          <td>
            High adoption and integration of digital platforms and mobile
            applications
          </td>
          <td>
            Uses CRM systems, mobile apps, ERP platforms, and e-commerce
            solutions
          </td>
          <td>
            Requires seamless integration with existing digital infrastructure
          </td>
        </tr>
      </table>
    </div>
  )
}

export default IcpTable
