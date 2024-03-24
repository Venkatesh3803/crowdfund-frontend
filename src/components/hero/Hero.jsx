import "./Hero.css"
import heroImg from "../../images/hero.jpg";
import { LiaDonateSolid } from "react-icons/lia";
import { BiDonateHeart } from "react-icons/bi";

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-container">
                <div className="content">
                    <h1>Donation That Change The World</h1>
                    <p>It is a long established fact that a reader will be distracted by the readable contant of a page</p>

                    <button>
                        <a href="#projects" style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>
                            Donate Now
                        </a>
                    </button>
                </div>
                <div className="hero-img">
                    <img src={heroImg} alt="" />
                    <div className="hero-img-text">
                        <p>150 million People in the World Are Still Homeless</p>
                    </div>
                    <div className="hero-img-icon">
                        <LiaDonateSolid />
                    </div>
                    <div className="hero-img-icon2">
                        <BiDonateHeart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
