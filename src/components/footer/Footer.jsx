import "./Footer.css"
const Footer = () => {
    return (
        <div className='footer'>
            <div className="logo">CrowdFunding</div>
            <div className="footer-container">
                <div className="footer-list">
                    <h2 className="heading">Fundraise for</h2>
                    <ul>
                        <li>Medical</li>
                        <li>Emergency</li>
                        <li>Education</li>
                        <li>NonProfit</li>
                        <li>Crisis Relief</li>
                    </ul>
                </div>
                <div className="footer-list">
                    <h2 className="heading">Learn more</h2>
                    <ul>
                        <li>How CrowdFunding works</li>
                        <li>Why CrowdFunding</li>
                        <li>Sucess Stories</li>
                        <li>NonProfit</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div className="footer-list">
                    <h2 className="heading">Resources</h2>
                    <ul>
                        <li>Blogs</li>
                        <li>CrowdFunding Stories</li>
                        <li>Careers</li>
                        <li>About</li>
                        <li>Help Centre</li>
                    </ul>
                </div>
            </div>
            <span></span>
        </div>
    )
}

export default Footer