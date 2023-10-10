import "./Project.css"
import userImg from "../../images/user.png"
import Donations from "../donations/Donations"
import { useEffect, useState } from "react"
import { publicRequest, userRequest } from "../../requestMethods"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom"



const Project = ({ inputs, setInputs }) => {
    const user = useSelector(state => state.auth.user)
    const [donateUser, setDonateUser] = useState("")

    const [userProfile, setUserProfile] = useState({})
    const [risedAmount, setRisedAmout] = useState(0)
    const { id } = useParams()
    const [editMode, setEditMode] = useState(false)
    const [image, setImage] = useState(false)
    const navigate = useNavigate()


    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    useEffect(() => {
        const fetchingProfile = async () => {
            try {
                const res = await publicRequest.get(`/user/single/${inputs?.userId}`)
                setUserProfile(res.data)
            } catch (error) {
                return error
            }
        }
        fetchingProfile()
    }, [inputs.userId])

    useEffect(() => {
        const fetchingProfile = async () => {
            try {
                const res = await publicRequest.get(`/user/single/${user?._id}`)
                setDonateUser(res.data)
            } catch (error) {
                return error
            }
        }
        fetchingProfile()
    }, [user._id])


    const handleDonation = async (e) => {
        e.preventDefault();
        if (!user) {
            window.location.replace("/login")
            return
        }

        if (risedAmount.length === 0) {
            return toast.warn("Enter Amount")
        }


        if (parseInt(risedAmount) > donateUser.balance) {
            return toast.warn("You don't have Suffient Balance Please Add Balance")
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
        const updated = {
            userId: user._id,
            title: inputs.title,
            description: inputs.description,
            goal: inputs.goal,
        }


        const res = await userRequest.patch(`/project/${id}`, updated);
        if (res.status === 201) {
            toast.success("updated Sucessfully")
        }
        setEditMode(false)
    }


    const handleDelete = async (id) => {

        confirmAlert({
            title: 'Confirm to Delete Project',
            message: 'Are you sure to Delete.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const res = await userRequest.delete(`/project/${id}`, {
                                userId: user._id,
                            });
                            if (res.status === 200) {
                                toast.success("Deleted Sucessfully")
                                window.location.replace("/")
                            }
                        } catch (error) {
                            console.log(error.response.data)
                            if (error.response.data === "jwt expired") {
                                toast.warn("Session Expired")
                                navigate("/");
                                localStorage.removeItem("user")
                                localStorage.removeItem("token")
                            }
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { return }
                }
            ]
        });
    }


    return (
        <div className='project'>
            <div className="project-container">
                <div className="project-left">
                    <img src={inputs.image ? inputs.image : ""} alt="" />
                </div>
                <div className="project-right">
                    {editMode && <span className="cancel" onClick={() => setEditMode(false)}>X</span>}

                    {/* title */}
                    {editMode && <input type="text" className="project-inputs" value={inputs.title} name="title" onChange={handleChange} />}
                    {!editMode && <h2>{inputs.title}</h2>}

                    {/* description */}
                    {editMode && <textarea rows={5} cols={10} className="project-inputs" value={inputs.description} name="description" onChange={handleChange} />}
                    {!editMode && <p>{inputs.description}</p>}

                    {/* Noof days */}

                    <p>{inputs.numberOfDays} Days Left</p>

                    <div className="user-profile">
                        <Link to={`/profile/${userProfile._id}`}>
                            <img src={userProfile.image ? userProfile.image : userImg} alt="" />
                        </Link>
                        <p>{userProfile?.firstName + userProfile?.lastName}</p>
                    </div>

                    <div className="progress-bar">
                        <div className="percent" style={{ width: `${Math.floor((inputs.risedAmount / inputs.goal) * 100)}%` }}></div>
                        <div className="donated-amount">
                            <h4>₹{inputs.risedAmount}</h4>
                            {editMode && <input type="number" className="project-inputs" value={inputs.goal} name="goal" onChange={handleChange} />}
                            {!editMode && <h4>₹{inputs.goal}</h4>}
                        </div>
                    </div>

                    <div className="project-btns">
                        {user?._id === inputs.userId &&
                            <>
                                {editMode ? <button onClick={handleUpdate}>Update</button> : <button onClick={() => setEditMode(true)}>Edit</button>}
                                <button onClick={() => handleDelete(inputs._id)}>Delete</button>
                            </>
                        }
                        <input type="number" placeholder="₹ Amount to Donate" required onChange={(e) => setRisedAmout(e.target.value)} />

                        <button onClick={handleDonation}>Donate</button>
                    </div>
                </div>
            </div>
            <Donations data={inputs} />
        </div>
    )
}

export default Project
