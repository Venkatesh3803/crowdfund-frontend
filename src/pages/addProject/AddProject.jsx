import { useState } from "react"
import Navber from "../../components/navber/Navber"
import "./AddProject.css"
import { creatingProject } from "../../requestMethods"
import axios from "axios"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

const AddProject = () => {
    const user = useSelector(state => state.auth.user)
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newProject = {
            userId: user?._id,
            title: inputs.title,
            description: inputs.description,
            goal: inputs.goal,
            numberOfDays: inputs.numberOfDays,
            category: inputs.category,
            image: image
        }
        let token = JSON.parse(localStorage.getItem("token"))


        creatingProject("/project", "POST", newProject, token)
            .then((response) => {
                toast.success("posted sucessful")
            })
            .catch((error) => {

                if (error === "jwt expired") {
                    toast.warn("Session expired")
                }
                if (error === "jwt malformed") {
                    toast.warn("Opps something went, Refresh page and try again")
                }
                console.log(error)
            })


    }

    return (
        <>
            <Navber />
            <div className='add-project'>
                <form action="" onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: "center" }}>Add Project</h2>
                    <div className="add-inputs">
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder="Title" name="title" required onChange={handleChange} />
                    </div>
                    <div className="add-inputs">
                        <label htmlFor="">Category</label>
                        <select name="category" id="" onChange={handleChange} required>
                            <option value="">select</option>
                            <option value="health">Health</option>
                            <option value="education">Education</option>
                            <option value="technology">Technology</option>
                        </select>
                    </div>
                    <div className="add-inputs">
                        <label htmlFor="">Description</label>
                        <textarea rows={4} cols={20} name="description" placeholder="Description" onChange={handleChange} required />
                    </div>
                    <div className="add-inputs">
                        <label htmlFor="">Image</label>
                        <input type="file" onChange={handleUploadImage} />
                    </div>
                    <div className="add-goal">
                        <div className="add-inputs">
                            <label htmlFor="">Goal</label>
                            <input type="number" placeholder="Enter Target Amount" name="goal" onChange={handleChange} required />
                        </div>
                        <div className="add-inputs">
                            <label htmlFor="">No of Days</label>
                            <input type="number" name="numberOfDays" placeholder="No Of Days to reach target" onChange={handleChange} required />
                        </div>
                    </div>
                    <button type="submit">Add Project</button>
                </form>
            </div>
        </>
    )
}

export default AddProject