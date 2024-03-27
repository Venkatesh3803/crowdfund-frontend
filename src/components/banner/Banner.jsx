import "./Banner.css"

const Banner = () => {
    return (
        <div className='banner'>
            <h1 className="banner-heading">What is Crowdfunding</h1>
            <div className="banner-container">
                <div className="explantion">
                   <p>Crowdfunding is the process of raising funds with the help of people across the country, using donation-based fundraising platforms as the medium. Crowdfunding on Wethepeople helps fund your emergency medical treatment or chosen cause with free 24*7 support & expert assistance. Anyone can raise funds on donation platforms - from a newborn child, senior citizens to NGOs & more!</p>

                   <p>With donation-based crowdfunding, getting financial help for patients in India is convenient and reliable. Unlike medical loans and insurance, fundraising via online crowdfunding platforms requires no liability to pay back the funds raised. So, all the amount generated can be used to cover the cost of emergency medical treatment.</p>
                </div>
                <div className="banner-img">
                    <img src="https://www.gofundme.com/en-gb/c/wp-content/uploads/sites/11/2021/06/2020-Figures-3.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Banner
