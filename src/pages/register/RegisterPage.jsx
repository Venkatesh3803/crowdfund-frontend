import { Link, useNavigate } from "react-router-dom"
import "./RegisterPage.css"
import { useState } from "react"
import { publicRequest } from "../../requestMethods"
import { toast } from "react-toastify"


const RegisterPage = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conformPass, setConformPass] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== conformPass) return toast.warn("password does not match")
        try {
            const res = await publicRequest.post("/auth/register", {
                firstName, lastName, email, password
            })
           
            if (res.status === 200) {
                toast.success("Registed Sucessfully")
                navigate("/login")
            }
        } catch (error) {
            return toast.error(error.massage)
        }
    }

    return (
        <div className="register">
            <form action="" onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center" }}>Sign Up</h2>
                <div className="first-name">
                    <div className="inputs">
                        <label htmlFor="">First Name</label>
                        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="">Last Name</label>
                        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="inputs">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="" id="email" placeholder="example@gamil.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="inputs">
                    <label htmlFor="password">passsword</label>
                    <input type="password" name="" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="inputs">
                    <label htmlFor="conform password">conform passsword</label>
                    <input type="password" name="" id="conform password" placeholder="password" onChange={(e) => setConformPass(e.target.value)} />
                </div>
                <Link to={"/login"} className="link">
                    <p>Already have Account! Login</p>
                </Link>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default RegisterPage
