import "./ProfilePage.css"
import ProjectList from '../../components/projectList/ProjectList'
import Navber from '../../components/navber/Navber'
import { AiOutlineEdit } from "react-icons/ai"
import { useEffect, useRef, useState } from "react"
import { publicRequest, updateUser } from "../../requestMethods"
import { useParams } from "react-router-dom"
import userImage from "../../images/user.png"
import { toast } from "react-toastify"
import { FcCancel } from "react-icons/fc"
import { useSelector } from "react-redux"
import Footer from "../../components/footer/Footer"
import axios from "axios"

const ProfilePage = () => {
    const user = useSelector(state => state.auth.user)
    const [editMode, setEditMode] = useState(false)
    const [balance, setBalance] = useState(false)
    const { id } = useParams()
    const [inputs, setInputs] = useState({})
    const [image, setImage] = useState("")
    const imgRef = useRef()

    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }


    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'crowdFunding');
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/ddsepnnsm/image/upload',
                    formData
                );
                const imageUrl = response.data.secure_url;
                setImage(imageUrl);

            } catch (err) {
                console.log(err)
            }

        }
    }


    const handleUpdate = async () => {
        const updated = {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            balance: inputs.balance,
            image: image ? image : inputs.image,
        }
        const token = JSON.parse(localStorage.getItem("token"))

        updateUser('/user', 'PATCH', updated, token)
            .then((response) => {
                if (response) {
                    toast.success("updated sucessfully")
                    setEditMode(false)
                    setBalance(false)
                }
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


    useEffect(() => {
        const fetchingUser = async () => {
            try {
                const res = await publicRequest.get(`/user/single/${id}`)
                setInputs(res.data)
            } catch (error) {
                if (error.message === "wt expired") {
                    localStorage.clear()
                } else {
                    return error.message
                }
            }
        }
        fetchingUser()
    }, [id])




    return (
        <div>
            <Navber />
            <div className="profile-page">
                <div className="profile-card">

                    {id === user?._id && !editMode && <AiOutlineEdit onClick={() => setEditMode(true)}
                        className="edit" />}

                    {editMode && <FcCancel onClick={() => setEditMode(false)} className="edit" />}

                    {!editMode ? <img src={image ? image : inputs.image ? inputs.image : userImage} alt="" /> :
                        <>
                            <img src={image ? image : inputs.image ? inputs.image : userImage} style={{ cursor: "pointer" }} onClick={() => imgRef.current.click()} alt="" />
                            <input type="file" name="firstName" ref={imgRef} hidden onChange={handleUploadImage} />
                        </>
                    }
                    <div className="names">
                        <h4>First Name: -</h4>
                        {!editMode ? <span>{inputs.firstName}</span> : <input type="text" name="firstName" value={inputs.firstName} onChange={handleChange} />}

                    </div>
                    <div className="names">
                        <h4>Last Name: -</h4>
                        {!editMode ? <span>{inputs.lastName}</span> : <input type="text" name="lastName" value={inputs.lastName} onChange={handleChange} />}

                    </div>
                    <div className="names">
                        <h4>Email: -</h4>
                        {!editMode ? <span>{inputs.email}</span> : <span>{inputs.email}</span>}

                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                        {id === user?._id ?
                            <div className="names">
                                <h4>Balance: -</h4>
                                {!editMode && !balance ? <span>{inputs.balance}</span> : <input type="number" name="balance" value={inputs.balance} onChange={handleChange} />}
                            </div>
                            : ""}
                        <div className="names">
                            {id === user?._id && !balance && !editMode && <button onClick={() => setBalance(true)} className="btn"> Add </button>}
                            {!editMode && balance && <button onClick={handleUpdate} className="btn"> Submit </button>}
                        </div>
                    </div>

                    {editMode && <button className="update" onClick={handleUpdate}>Update</button>}
                </div>
                <ProjectList profile id={id} />
            </div>
            <Footer />
        </div>
    )
}

export default ProfilePage