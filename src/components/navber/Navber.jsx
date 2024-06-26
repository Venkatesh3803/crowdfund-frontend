import { Link } from "react-router-dom"
import "./Navber.css"
import { useState } from "react"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { logOut } from "../../redux/authReducer"



const Navber = () => {
    const user = useSelector(state => state.auth.user)

    const [profileMenu, setProfileMenu] = useState(false)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOut())
        setProfileMenu(false)
        toast.success("LogOut Sucess")

    }

    return (
        <>
            <nav>
                <div className="nav-container">

                    <div className="nav-left">
                        <h2 className="logo">
                            <Link to={"/"} className="link">
                                <span>We The</span> People
                            </Link>
                        </h2>
                    </div>
                    <div className="nav-right">
                        <div className="add-btns">
                            <Link to={"/about"} className="link">
                                <span style={{ marginRight: "1rem", fontSize: "18px" }}>About</span>
                            </Link>
                            <Link to={"/addproject"}>
                                <button >Add Project</button>
                            </Link>
                            {user ?
                                <span className="profile" onMouseEnter={() => setProfileMenu(true)}>{user.email.split("")[0].toUpperCase()}</span>
                                :
                                <Link to={"/login"}>
                                    <button>Login</button>
                                </Link>
                            }
                        </div>
                        {profileMenu &&
                            <>
                                <div className="profile-menu" onMouseLeave={() => setProfileMenu(false)}>
                                    <ul>
                                        <Link to={`/profile/${user._id}`} style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>
                                            <li>
                                                Profile
                                            </li>
                                        </Link>
                                        <li onClick={handleLogOut}>Log Out</li>
                                    </ul>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navber