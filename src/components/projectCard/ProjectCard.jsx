import { AiOutlineClockCircle } from "react-icons/ai"
import { FcLike } from "react-icons/fc"
import "./ProjectCard.css"
import { Link } from "react-router-dom"
import noImage from "../../images/noimage.avif"
import moment from "moment"


const ProjectCard = ({ data }) => {

    return (
        <div className="project-card">
            <div className="card-top">
                <Link to={`/project/${data._id}`}>
                    <img src={data.image ? data.image : noImage} alt="" />
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
                    <div className="percent" style={{ width: `${Math.floor((data.risedAmount / data.goal) * 100)}` < 100 ? `${Math.floor((data.risedAmount / data.goal) * 100)}%` : "100%" }}></div>
                </div>
                <div className="supporter">
                    <div className="left-days">
                        <AiOutlineClockCircle />
                        <span>{moment().endOf("days").fromNow()}</span>
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
