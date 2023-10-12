
import "./Donations.css"

import moment from "moment"

const Donations = ({donation}) => {

    
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
                    {donation?.map((d) => {
                        return (
                            <tr key={d._id}>
                                <td>{d._id}</td>
                                <td>{d.email}</td>
                                <td>No refund</td>
                                <td>₹{d.risedAmount}</td>
                                <td>{moment(d.createdAt).startOf().fromNow()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Donations
