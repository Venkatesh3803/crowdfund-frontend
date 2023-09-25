import "./ProjectList.css"
import ProjectCard from '../projectCard/ProjectCard'
import { AiOutlineSearch } from "react-icons/ai"
import { useEffect, useState } from "react"
import { publicRequest } from "../../requestMethods"
const ProjectList = () => {
    const [project, setProject] = useState([])

    useEffect(() => {
        const fetchingProjects = async () => {
            const res = await publicRequest.get("/project")
            setProject(res.data)
        }
        fetchingProjects()
    }, [])

    return (
        <div className='project-list'>
            <h1>Trending Fundraisers</h1>
            <span>View the fundraisers that are most active right now</span>

            <div className="filters">
                <select name="" id="">
                    <option value="">Category</option>
                    <option value="">Education</option>
                    <option value="">Health</option>
                </select>
                <div className="search">
                    <input type="text" placeholder='Search' />
                    <AiOutlineSearch className="search-icon" />
                </div>
            </div>
            <div className="project-list-container">
                {project.map((p) => {
                    return (

                        <ProjectCard key={p._id} data={p} />
                    )
                })}

            </div>

        </div>
    )
}

export default ProjectList
