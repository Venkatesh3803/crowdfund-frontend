import { Link } from "react-router-dom"
import "./Navber.css"
import { useState } from "react"
import { toast } from "react-toastify"


const Navber = () => {
    let user = JSON.parse(localStorage.getItem("user"))
    const [profileMenu, setProfileMenu] = useState(false)


    const handleLogOut = () => {
        localStorage.removeItem("user")
        setProfileMenu(false)
        toast.success("LogOut Sucess")
    }
    return (
        <>
            <nav>
                <div className="nav-left">
                    <Link to={"/"} className="link">
                        <h2 className="logo"><span>Crowd</span> Funding</h2>
                    </Link>
                </div>
                <div className="nav-right">
                    <div className="add-btns">
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
                            <div className="profile-menu" onMouseLeave={()=> setProfileMenu(false)}>
                                <ul>
                                    <Link to={`/profile/${user._id}`} className="link">
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
            </nav>
        </>
    )
}

export default Navber