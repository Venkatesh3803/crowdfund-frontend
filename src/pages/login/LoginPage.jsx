import { Link, useNavigate } from "react-router-dom"
import "./LoginPage.css"
import { useState } from "react"
import { publicRequest } from "../../requestMethods"
import { toast } from "react-toastify"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await publicRequest.post("/auth/login", {
                email, password
            })

            if (res.status === 201) {
                localStorage.setItem("user", JSON.stringify(res.data))
                toast.success("Login Sucess")
                navigate("/")
            }
        } catch (error) {
            setErr(true)
        }
    }
    return (
        <div className="login">
            <form action="" onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center" }}>Login in</h2>
                <div className="inputs">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="" id="email" placeholder="example@gamil.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="inputs">
                    <label htmlFor="password">passsword</label>
                    <input type="password" name="" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Link to={"/register"} className="link">
                    <p>Don't have Account! Sign Up</p>
                </Link>
                {err && <p style={{ color: "red", textAlign: "end" }}>*Invalid Credentials</p>}
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LoginPage