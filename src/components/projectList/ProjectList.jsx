import "./ProjectList.css"
import ProjectCard from '../projectCard/ProjectCard'
import { AiOutlineSearch } from "react-icons/ai"
import { useEffect, useState } from "react"
import { publicRequest } from "../../requestMethods"
const ProjectList = ({ profile, id }) => {
    const [project, setProject] = useState([])
    const [category, setCategory] = useState("")
    const [search, setSearch] = useState("")


    useEffect(() => {
        const fetchingProjects = async () => {
            const res = await publicRequest.get(id ? `/project/all?userid=${id}` : `/project/all?cat=${category}&search=${search}`)
            setProject(res.data)
        }
        fetchingProjects()
    }, [id, category, search])

    return (
        <div className='project-list'>
            {!profile &&
                <>
                    <h1>Trending Fundraisers</h1>
                    <span>View the fundraisers that are most active right now</span>
                    {project.length === 0 && <span>NO Projects Found</span>}
                    <div className="filters">
                        <select name="" id="" onChange={(e) => setCategory(e.currentTarget.value)}>
                            <option value="">Category</option>
                            <option value="">All</option>
                            <option value="education">Education</option>
                            <option value="health">Health</option>
                        </select>
                        <div className="search">
                            <input type="text" placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
                            <AiOutlineSearch className="search-icon" />
                        </div>
                    </div>
                </>
            }


            {project.length === 0 && <span style={{marginTop:"2rem"}}>NO Projects Found</span>}
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
