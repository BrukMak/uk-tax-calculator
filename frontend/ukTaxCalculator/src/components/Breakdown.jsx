import React from 'react'

const Breakdown = () => {
  return (
    <table className='table-auto w-auto'>
        <thead>
            <tr>
            <th>Band</th>
            <th>Rate</th>
            <th>Income</th>
            <th>Tax</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>Basic Rate</td>
            <td>20%</td>
            <td>£0 - £37,500</td>
            <td>£0 - £7,500</td>
            </tr>
            <tr>
            <td>Higher Rate</td>
            <td>40%</td>
            <td>£37,501 - £150,000</td>
            <td>£7,501 - £30,000</td>
            </tr>
            <tr>
            <td>Additional Rate</td>
            <td>45%</td>
            <td>£150,001+</td>
            <td>£30,001+</td>
            </tr>
        </tbody>

    </table>
  )
}

export default Breakdown
