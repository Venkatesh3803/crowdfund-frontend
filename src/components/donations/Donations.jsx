import { useParams } from "react-router-dom"
import "./Donations.css"
import { useEffect, useState } from "react"
import { publicRequest } from "../../requestMethods"
import moment from "moment"

const Donations = () => {
    const { id } = useParams()
    const [donation, setDonation] = useState([])
    useEffect(() => {
        const fetchingDontaions = async () => {
            try {
                const res = await publicRequest.get(`/donation/list?projectid=${id}`)
                setDonation(res.data)
            } catch (error) {
                return error
            }
        }
        fetchingDontaions()
    }, [id])


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
                    {donation.map((d) => {
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
