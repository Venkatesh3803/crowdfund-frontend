import { useState } from "react"
import Navber from "../../components/navber/Navber"
import "./AddProject.css"
import { publicRequest, userRequest } from "../../requestMethods"
import { toast } from "react-toastify"

const AddProject = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [inputs, setInputs] = useState({})
    const [image, setImage] = useState("")

    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newProject = {
            userId: user._id,
            title: inputs.title,
            description: inputs.description,
            goal: inputs.goal,
            numberOfDays: inputs.numberOfDays,
            category: inputs.category
        }

        if (image) {
            const data = new FormData();
            const fileName = Date.now() + image.name;
            data.append("name", fileName);
            data.append("file", image);
            newProject.image = fileName;
  
            try {
                await publicRequest.post("/upload", data)
            } catch (err) {
                console.log(err);
            }
        }

        try {
            let res = await userRequest.post("/project", newProject)
            if (res.status === 201) {
                toast.success("posted sucessful")
            }
        } catch (error) {
            return error.message
        }
    }
    return (
        <>
            <Navber />
            <div className='add-project'>
                <form action="" onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: "center" }}>Add Project</h2>
                    <div className="add-inputs">
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder="Title" name="title" onChange={handleChange} />
                    </div>
                    <div className="add-inputs">
                        <label htmlFor="">Category</label>
                        <select name="category" id="" onChange={handleChange}>
                            <option value="">select</option>
                            <option value="health">Health</option>
                            <option value="education">Education</option>
                            <option value="technology">Technology</option>
                        </select>
                    </div>
                    <div className="add-inputs">
                        <label htmlFor="">Description</label>
                        <textarea rows={4} cols={20} name="description" placeholder="Description" onChange={handleChange} />
                    </div>
                    <div className="add-inputs">
                        <label htmlFor="">Image</label>
                        <input type="file" placeholder="Title" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="add-goal">
                        <div className="add-inputs">
                            <label htmlFor="">Goal</label>
                            <input type="number" placeholder="Enter Target Amount" name="goal" onChange={handleChange} />
                        </div>
                        <div className="add-inputs">
                            <label htmlFor="">No of Days</label>
                            <input type="number" name="numberOfDays" placeholder="No Of Days to reach target" onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit">Add Project</button>
                </form>
            </div>
        </>
    )
}

export default AddProject