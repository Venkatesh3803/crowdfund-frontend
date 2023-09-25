import "./Donations.css"

const Donations = ({ data }) => {
    return (
        <div className='donations'>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Donation</th>
                        <th>Amount</th>
                        <th>Ago</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>123sdf5s</td>
                        <td>Venkatesh@gmail.com</td>
                        <td>No refund</td>
                        <td>7500</td>
                        <td>15 min</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Donations
