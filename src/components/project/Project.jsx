import "./Project.css"
import userImg from "../../images/user.png"
import Donations from "../donations/Donations"
import { useEffect, useState } from "react"
import { imageUrl, publicRequest, userRequest } from "../../requestMethods"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

const Project = ({ inputs, setInputs }) => {
    const user = useSelector(state => state.auth.user)
    const PF = `${imageUrl}/images/`
    const [userProfile, setUserProfile] = useState({})
    const [risedAmount, setRisedAmout] = useState(0)
    const { id } = useParams()
    const [editMode, setEditMode] = useState(false)
    const [image, setImage] = useState(false)



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


    const handleDonation = async (e) => {
        e.preventDefault();
        if (!user) {
            window.location.replace("/login")
            return
        }

        if (risedAmount === "") {
            return toast.warn("Enter Amount")
        }
        console.log(risedAmount)
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

        if (image) {
            const data = new FormData();
            const fileName = Date.now() + image.name;
            data.append("name", fileName);
            data.append("file", image);
            updated.image = fileName;

            try {
                await publicRequest.post("/upload", data)
            } catch (err) {
                console.log(err);
            }
        }

        const res = await userRequest.patch(`/project/${id}`, updated);
        if (res.status === 201) {
            toast.success("updated Sucessfully")
        }
        setEditMode(false)
    }


    const handleDelete = async (id) => {
        const res = await userRequest.delete(`/project/${id}`, {
            userId: user._id,
        });
        if (res.status === 200) {
            toast.success("Deleted Sucessfully")
            window.location.replace("/")
        }

    }


    return (
        <div className='project'>
            <div className="project-container">
                <div className="project-left">
                    <img src={inputs.image ? PF + inputs.image : ""} alt="" />
                </div>
                <div className="project-right">
                    {/* title */}
                    {editMode && <input type="text" value={inputs.title} name="title" onChange={handleChange} />}
                    {!editMode && <h2>{inputs.title}</h2>}

                    {/* description */}
                    {editMode && <textarea rows={3} cols={10} value={inputs.description} name="description" onChange={handleChange} />}
                    {!editMode && <p>{inputs.description}</p>}

                    {/* Noof days */}

                    <p>{inputs.numberOfDays} Days Left</p>

                    <div className="user-profile">
                        <Link to={`/profile/${userProfile._id}`}>
                            <img src={userProfile.image ? PF + userProfile.image : userImg} alt="" />
                        </Link>
                        <p>{userProfile?.firstName + userProfile?.lastName}</p>
                    </div>

                    <div className="progress-bar">
                        <div className="percent" style={{ width: `${Math.floor((inputs.risedAmount / inputs.goal) * 100)}%` }}></div>
                        <div className="donated-amount">
                            <h4>₹{inputs.risedAmount}</h4>
                            {editMode && <input type="number" value={inputs.goal} name="goal" onChange={handleChange} />}
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
