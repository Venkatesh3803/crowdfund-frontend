import { Link } from "react-router-dom"
import "./RegisterPage.css"
import { useState } from "react"
import { toast } from "react-toastify"
import { register } from "../../redux/apicalls"
import { useDispatch } from "react-redux"


const RegisterPage = () => {
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conformPass, setConformPass] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== conformPass) return toast.warn("password does not match")

        register(dispatch, { firstName, lastName, email, password })

    }

    return (
        <div className="register">
            <button>
                <Link to={"/"} className="link">
                    Back to home
                </Link>
            </button>
            <span> Sign Up and Get ₹5000 Bonous</span>
            <form action="" onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center" }}>Sign Up</h2>
                <div className="first-name">
                    <div className="inputs">
                        <label htmlFor="">First Name</label>
                        <input type="text" placeholder="First Name" required onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="">Last Name</label>
                        <input type="text" placeholder="Last Name" required onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="inputs">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="" id="email" required placeholder="example@gamil.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="inputs">
                    <label htmlFor="password">passsword</label>
                    <input type="password" name="" id="password" required minLength={6} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
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
