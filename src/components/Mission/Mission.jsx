import "./Mission.css";
import { FaClinicMedical,FaSchool } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";

const Mission = () => {
    return (
        <div className='mission'>
            <div className="mission-container">
                <h1>We Are In A Mission To Help The Helpless</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, deserunt. Provident, ratione!</p>
                <div className="mission-box-container">
                    <div className="mission-boxes">
                        <div className="box-icon">
                        <FaClinicMedical/>
                        </div>
                        <h2>Medical</h2>
                        <p>Heps in medical emergency and your donation can save lifes</p>
                    </div>
                    <div className="mission-boxes">
                        <div className="box-icon">
                        <PiStudentBold/>
                        </div>
                        <h2>Education</h2>
                        <p>Heps in medical emergency and your donation can save lifes</p>
                    </div>
                    <div className="mission-boxes">
                        <div className="box-icon">
                        <FaClinicMedical/>
                        </div>
                        <h2>Cancer free</h2>
                        <p>Heps in medical emergency and your donation can save lifes</p>
                    </div>
                    <div className="mission-boxes">
                        <div className="box-icon">
                        <FaClinicMedical/>
                        </div>
                        <h2>Start Ups</h2>
                        <p>Heps in medical emergency and your donation can save lifes</p>
                    </div>
                    <div className="mission-boxes">
                        <div className="box-icon">
                        <FaSchool/>
                        </div>
                        <h2>Schools</h2>
                        <p>Heps in medical emergency and your donation can save lifes</p>
                    </div>
                    <div className="mission-boxes">
                        <div className="box-icon">
                        <FaClinicMedical/>
                        </div>
                        <h2>Technology</h2>
                        <p>Heps in medical emergency and your donation can save lifes</p>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default Mission
