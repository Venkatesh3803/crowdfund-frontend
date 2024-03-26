import { Link } from "react-router-dom"
import "./LoginPage.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/apicalls"

const LoginPage = () => {
    const { error } = useSelector(state => state.auth)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()


    const reset = () => {
        setEmail("");
        setPassword("")
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        login(dispatch, { email, password })
        reset();
    }
    return (
        <div className="login">
            <div className="login-container">
                <div className="l-left">
                    
                </div>

                <div className="l-right">
                    <form action="" onSubmit={handleSubmit}>
                        <p className="welcome">Welcome Back, Please Login to your account</p>
                        <h2 style={{ textAlign: "start", fontSize: "26px" }}>Login in</h2>
                        <div className="inputs">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="" id="email" placeholder="example@gamil.com" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="inputs">
                            <label htmlFor="password">passsword</label>
                            <input type="password" name="" id="password" placeholder="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Link to={"/register"} className="link">
                            <p>Don't have Account! Sign Up</p>
                        </Link>
                        {error && <p style={{ color: "red", textAlign: "end" }}>*Invalid Credentials</p>}
                        <button type="submit">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage