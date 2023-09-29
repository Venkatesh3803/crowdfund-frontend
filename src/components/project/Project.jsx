import "./Project.css"
import userImg from "../../images/user.png"
import Donations from "../donations/Donations"
import { useEffect, useState } from "react"
import { imageUrl, publicRequest, userRequest } from "../../requestMethods"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

const Project = ({ data }) => {
    const user = useSelector(state => state.auth.user)
    const PF = `${imageUrl}/images/`
    const [userProfile, setUserProfile] = useState({})
    const [risedAmount, setRisedAmout] = useState(0)
    const { id } = useParams()
    const [editMode, setEditMode] = useState(false)



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

        if (!user) {
            window.location.replace("/login")
            return
        }


        try {
            const res = await userRequest.post(`/donation/${id}`, {
                userId: user._id,
                projectId: id,
                risedAmount: parseInt(risedAmount),
                email: user.email
            })
            if (res.status === 201) {
                toast.success("donated Sucessfully")
                setRisedAmout("")
            }
        } catch (error) {
            return error
        }
    }

    const handleUpdate = async () => {
        setEditMode(false)
    }



    return (
        <div className='project'>
            <div className="project-container">
                <div className="project-left">
                    <img src={data.image ? PF + data.image : ""} alt="" />
                </div>
                <div className="project-right">
                    {/* title */}
                    {editMode && <input type="text" value={data.title} />}
                    {!editMode && <h2>{data.title}</h2>}

                    {/* description */}
                    {editMode && <textarea rows={3} cols={10} value={data.description} />}
                    {!editMode && <p>{data.description}</p>}

                    {/* Noof days */}
                    {editMode && <input type="number" className="number" value={data.numberOfDays} />}
                    {!editMode && <p>{data.numberOfDays} Days Left</p>}

                    <div className="user-profile">
                        <Link to={`/profile/${userProfile._id}`}>
                            <img src={userProfile.image ? PF + userProfile.image : userImg} alt="" />
                        </Link>
                        <p>{userProfile?.firstName + userProfile?.lastName}</p>
                    </div>

                    <div className="progress-bar">
                        <div className="percent" style={{ width: `${Math.floor(data.goal / data.risedAmount)}%` }}></div>
                        <div className="donated-amount">
                            <h4>{data.risedAmount}</h4>
                            <h4>{data.goal}</h4>
                        </div>
                    </div>

                    <div className="project-btns">
                        {user?._id === data.userId &&
                            <>
                                {editMode ? <button onClick={handleUpdate}>Update</button> : <button onClick={() => setEditMode(true)}>Edit</button>}
                                <button>Delete</button>
                            </>
                        }
                        <input type="number" placeholder="Amount to Donate" required onChange={(e) => setRisedAmout(e.target.value)} />

                        <button onClick={handleDonation}>Donate</button>
                    </div>
                </div>
            </div>
            <Donations data={data} />
        </div>
    )
}

export default Project
