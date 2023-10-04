import { AiOutlineClockCircle } from "react-icons/ai"
import { FcLike } from "react-icons/fc"
import "./ProjectCard.css"
import { Link } from "react-router-dom"
import userImg from "../../images/user.png"
import { imageUrl } from "../../requestMethods"

const ProjectCard = ({ data }) => {
    const PF = `${imageUrl}/images/`

    return (
        <div className="project-card">
            <div className="card-top">
                <Link to={`/project/${data._id}`}>
                    <img src={data.image ? PF + data.image : PF + userImg} alt="" />
                </Link>
            </div>
            <div className="card-bottom">
                <Link to={`/project/${data._id}`} className="link">
                    <h3>{data.title}</h3>
                </Link>

                <div className="goal">
                    <h3>₹{data.risedAmount}</h3> <span>raised out of ₹{data.goal}</span>
                </div>
                <div className="progress-bar">
                    <div className="percent" style={{ width: `${Math.floor((data.risedAmount / data.goal) * 100)}%` }}></div>
                </div>
                <div className="supporter">
                    <div className="left-days">
                        <AiOutlineClockCircle />
                        <span>{data.numberOfDays}Days left</span>
                    </div>
                    <div className="left-days">
                        <FcLike />
                        <span>6 Supporter</span>
                    </div>
                </div>
                <Link to={`/project/${data._id}`}>
                    <button>Donate</button>
                </Link>
            </div>
        </div>
    )
}

export default ProjectCard
