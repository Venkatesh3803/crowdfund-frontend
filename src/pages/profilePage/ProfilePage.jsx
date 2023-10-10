import "./ProfilePage.css"
import ProjectList from '../../components/projectList/ProjectList'
import Navber from '../../components/navber/Navber'
import { AiOutlineEdit } from "react-icons/ai"
import { useEffect, useState } from "react"
import { publicRequest, userRequest } from "../../requestMethods"
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
            image: image,
        }

        const res = await userRequest.patch("/user", updated);
        if (res.status === 201) {
            toast.success("updated Sucessfully")
        }
        setEditMode(false)
        setBalance(false)
    }


    useEffect(() => {
        const fetchingUser = async () => {
            const res = await publicRequest.get(`/user/single/${id}`)
            setInputs(res.data)
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
                    {!editMode && <img src={inputs.image ? inputs.image : userImage} alt="" />}
                    {editMode && <input type="file" name="firstName" onChange={handleUploadImage} />}
                    <div className="names">
                        <h4>First Name: -</h4>
                        {!editMode && <span>{inputs.firstName}</span>}
                        {editMode && <input type="text" name="firstName" value={inputs.firstName} onChange={handleChange} />}
                    </div>
                    <div className="names">
                        <h4>Last Name: -</h4>
                        {!editMode && <span>{inputs.lastName}</span>}
                        {editMode && <input type="text" name="lastName" value={inputs.lastName} onChange={handleChange} />}
                    </div>
                    <div className="names">
                        <h4>Email: -</h4>
                        {!editMode && <span>{inputs.email}</span>}
                        {editMode && <span>{inputs.email}</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                        <div className="names">
                            <h4>Balance: -</h4>
                            {!editMode && !balance && <span>{inputs.balance}</span>}
                            {editMode && <input type="number" name="balance" value={inputs.balance} onChange={handleChange} />}
                            {balance && <input type="number" name="balance" value={inputs.balance} onChange={handleChange} />}
                        </div>
                        <div className="names">
                            {id === user?._id && !balance && !editMode && <button onClick={() => setBalance(true)} className="btn"> Add </button>}
                            {balance && <button onClick={handleUpdate} className="btn"> Submit </button>}
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