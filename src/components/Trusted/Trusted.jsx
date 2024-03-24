import "./Trusted.css"
import trustedImg from "../../images/trusted.jpg";

const Trusted = () => {
    return (
        <div className='trusted'>
            <div className="trusted-container">
                <p className="trusted-heading">Trusted By 500+ Non-Profitable and 12 Countries</p>
                <div className="trusted-wrapper">
                    <div className="trusted-img">
                        <div className="rounded"></div>
                        <img src={trustedImg} alt="" />
                        <div className="trusted-img-text">
                            <p>150 million People in the World Are Still Homeless</p>
                        </div>
                    </div>
                    <div className="trusted-content">
                        <h1>We Belive That we can Save More Lifes With You</h1>
                        <p>It is a long established fact that a reader will be distracted by the readable contant of a page</p>

                        <div className="stats">
                            <div className="stats-box">
                                <p>10K+</p>
                                <span>Childern Are Back To School</span>
                            </div>
                            <div className="stats-box">
                                <p>5K+</p>
                                <span>Childern Are Back To School</span>
                            </div>
                        </div>
                        <button>
                            <a href="#projects" style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>
                                Learn More
                            </a>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Trusted
