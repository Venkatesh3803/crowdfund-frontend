import Navber from '../../components/navber/Navber'
import Hero from '../../components/hero/Hero'
import ProjectList from '../../components/projectList/ProjectList'
import Footer from '../../components/footer/Footer'
import Banner from '../../components/banner/Banner'

const HomePage = () => {
    return (
        <div>
            <Navber />
            <Hero />
            <ProjectList />
            <Banner />
            <Footer />
        </div>
    )
}

export default HomePage
