import Navber from '../../components/navber/Navber'
import Hero from '../../components/hero/Hero'
import ProjectList from '../../components/projectList/ProjectList'
import Footer from '../../components/footer/Footer'
import Banner from '../../components/banner/Banner'
import Trusted from '../../components/Trusted/Trusted'
import Mission from '../../components/Mission/Mission'
import AskedQuestion from '../../components/AskedQuestions/AskedQuestion'

const HomePage = () => {
    return (
        <div>
            <Navber />
            <Hero />
            <Trusted/>
            <Mission/>
            <ProjectList />
            <Banner />
            <AskedQuestion/>
            <Footer />
        </div>
    )
}

export default HomePage
