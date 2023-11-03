import "./Hero.css"
import crowdfunding from "../../images/crowdfunding.png"

const Hero = () => {
    return (

        <div className="hero">
            <img src={crowdfunding} alt="" />
            <div className="content">
                <h1>Crowdfunding ecosystem</h1>
                <p>We make digital professions accessible and help you
                    master new services</p>

                <button>
                    <a href="#projects" className="link">
                        Get Started
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Hero
