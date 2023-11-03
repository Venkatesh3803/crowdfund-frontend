import "./Project.css"
import noImage from "../../images/noimage.avif"
import userImg from "../../images/user.png"
import Donations from "../donations/Donations"
import { useEffect, useState } from "react"
import { deleteProject, editProject, makingDonation, publicRequest } from "../../requestMethods"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



const Project = ({ inputs, setInputs }) => {
    const user = useSelector(state => state.auth.user)
    const [donateUser, setDonateUser] = useState("")
    const [userProfile, setUserProfile] = useState({})
    const [risedAmount, setRisedAmout] = useState(0)
    const { id } = useParams()
    const [editMode, setEditMode] = useState(false)
    const [donation, setDonation] = useState([])


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
    }, [user?._id])



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

        let token = JSON.parse(localStorage.getItem("token"))

        let donation = {
            userId: user._id,
            projectId: id,
            risedAmount: parseInt(risedAmount),
            email: user.email
        }

        makingDonation(`/donation/${id}`, 'POST', donation, token)
            .then((response) => {
                setDonation(prev => [...prev, response])
                toast.success("Donated sucessfully")
                setRisedAmout(0)
            })
            .catch((error) => {
                if (error === "jwt expired") {
                    toast.warning("Session expired please login again")
                }
                if (error === "jwt malformed") {
                    toast.warning("something went wrong refresh page and try again")
                }

            });
    }

    const handleUpdate = async () => {
        const updated = {
            userId: user._id,
            title: inputs.title,
            description: inputs.description,
            goal: inputs.goal,
        }
        let token = JSON.parse(localStorage.getItem("token"))

        editProject(`/project/${id}`, "PATCH", updated, token)
            .then((response) => {
                toast.success("Updated sucessfully")
            }).catch((error) => {
                if (error === "jwt expired") {
                    toast.warning("Session expired please login again")
                }
                if (error === "jwt malformed") {
                    toast.warning("something went wrong refresh page and try again")
                }

            });
        setEditMode(false)
    }


    const handleDelete = async (id) => {
        let token = JSON.parse(localStorage.getItem("token"))

        let body = { userId: user._id }
        confirmAlert({
            title: 'Confirm to Delete Project',
            message: 'Are you sure to Delete.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        deleteProject(`/project/${id}`, "DELETE", body, token)
                            .then((response) => {
                                if (response === "Deleted") {
                                    toast.success("Deleted Sucessfully")
                                }
                                window.location.replace("/")
                            })
                            .catch((error) => {
                                toast.warn(error)
                            })
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
                    <img src={inputs.image ? inputs.image : noImage} alt="" />
                </div>
                <div className="project-right">
      

                    {/* title */}
                    {!editMode ? <h2>{inputs.title}</h2> : <input type="text" className="project-inputs" value={inputs.title} name="title" onChange={handleChange} />}


                    {/* description */}
                    {!editMode ? <p>{inputs.description}</p> : <textarea rows={5} cols={10} className="project-inputs" value={inputs.description} name="description" onChange={handleChange} />}

                    {/* Noof days */}

                    <p>{inputs.numberOfDays} Days Left</p>

                    <div className="user-profile">
                        <Link to={`/profile/${userProfile._id}`}>
                            <img src={userProfile.image ? userProfile.image : userImg} alt="" />
                        </Link>
                        <p>{userProfile?.firstName + userProfile?.lastName}</p>
                    </div>

                    <div className="progress-bar">
                        <div className="percent" style={{ width: `${Math.floor((inputs.risedAmount / inputs.goal) * 100)}` < 100 ? `${Math.floor((inputs.risedAmount / inputs.goal) * 100)}%` : "100%" }}></div>
                        <div className="donated-amount">
                            <h4>₹{inputs.risedAmount}</h4>
                            {!editMode ? <h4>₹{inputs.goal}</h4> : <input type="number" className="project-inputs" value={inputs.goal} name="goal" onChange={handleChange} />}
                        </div>
                    </div>

                    <div className="project-btns">
                        {user?._id === inputs.userId &&
                            <>
                                {editMode ? <button className="btn" onClick={handleUpdate}>Update</button> : <button className="btn" onClick={() => setEditMode(true)}>Edit</button>}
                                {editMode && <button className="cancel" onClick={() => setEditMode(false)}>Cancel</button>}
                                {!editMode &&
                                    <button className="delete" onClick={() => handleDelete(inputs._id)}>Delete</button>
                                }
                            </>
                        }

                        {!editMode &&
                            <>
                                <input type="number" placeholder="₹ Amount to Donate" value={risedAmount} required onChange={(e) => setRisedAmout(e.target.value)} />
                                <button className="btn" onClick={handleDonation}>Donate</button>
                            </>
                        }
                    </div>
                </div>
            </div>
            <Donations donation={donation} />
        </div>
    )
}

export default Project
