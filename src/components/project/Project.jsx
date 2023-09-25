import "./Project.css"
import userImg from "../../images/user.png"
import Donations from "../donations/Donations"
import { useEffect, useState } from "react"
import { publicRequest, userRequest } from "../../requestMethods"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const Project = ({ data }) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const PF = "http://localhost:5500/images/"
    const [userProfile, setUserProfile] = useState({})
    const [risedAmount, setRisedAmout] = useState(0)
    const { id } = useParams()

    useEffect(() => {
        const fetchingProfile = async () => {
            try {
                const res = await publicRequest.get(`/user/single/${data?.userId}`)
                setUserProfile(res.data)
            } catch (error) {
                return error
            }
        }
        fetchingProfile()
    }, [data.userId])


    const handleDonation = async (e) => {
        e.preventDefault();
        try {
            const res = await userRequest.post(`/donation/${id}`, {
                userId: user._id,
                projectId: id,
                risedAmount: risedAmount,
                email: user.email
            })

            if (res.status === 200) {
                toast.success("donated Sucessfully")
            }
        } catch (error) {
            return error
        }
    }


    return (
        <div className='project'>
            <div className="project-container">
                <div className="project-left">
                    <img src={data.image ? PF + data.image : ""} alt="" />
                </div>
                <div className="project-right">
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                    <p>{data.numberOfDays}</p>
                    <div className="user-profile">
                        <img src={userImg} alt="" />
                        <p>{userProfile?.firstName + userProfile?.lastName}</p>
                    </div>
                    <div className="progress-bar">
                        <div className="percent" style={{ width: `${data.risedAmount / data.goal}` }}></div>
                        <div className="donated-amount">
                            <h4>{data.risedAmount}</h4>
                            <h4>{data.goal}</h4>
                        </div>
                    </div>

                    <div className="project-btns">
                        {user?._id === data.userId &&
                            <>
                                <button>Edit</button>
                                <button>Delete</button>
                            </>
                        }
                        {user && <input type="number" placeholder="Amount to Donate" onChange={(e) => setRisedAmout(e.target.value)} />}
                        <button onClick={handleDonation}>Donate</button>
                    </div>
                </div>

            </div>
            <Donations data={data} />
        </div>
    )
}

export default Project
