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

    const reset = () => {
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setConformPass("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== conformPass) return toast.warn("password does not match")
        register(dispatch, { firstName, lastName, email, password })
        reset()
    }

    return (
        <div className="register">
            <div className="register-container">
                <div className="r-left">
                    <h1>Join Us</h1>
                    <p>Together, we have the power to transform lives and shape a better tomorrow. Join the "Empower Minds" campaign today and be part of a movement that's changing the world through education. Together, let's empower minds and unlock potential.</p>
                </div>
                <div className="r-right">
                    <span> Sign Up and Get ₹5000 Bonous</span>
                    <form action="" onSubmit={handleSubmit}>
                        <h2 style={{ textAlign: "start" }}>Sign Up</h2>
                        <div className="first-name">
                            <div className="inputs">
                                <label htmlFor="">First Name</label>
                                <input type="text" placeholder="First Name" value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="inputs">
                                <label htmlFor="">Last Name</label>
                                <input type="text" placeholder="Last Name" value={lastName} required onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                        <div className="inputs">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="" id="email" value={email} required placeholder="example@gamil.com" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="inputs">
                            <label htmlFor="password">passsword</label>
                            <input type="password" name="" id="password" value={password} required minLength={6} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="inputs">
                            <label htmlFor="conform password">conform passsword</label>
                            <input type="password" name="" id="conform password" value={conformPass} placeholder="password" onChange={(e) => setConformPass(e.target.value)} />
                        </div>
                        <Link to={"/login"} className="link">
                            <p>Already have Account! Login</p>
                        </Link>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
