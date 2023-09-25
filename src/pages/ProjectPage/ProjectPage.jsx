import React, { useEffect, useState } from 'react'
import Navber from '../../components/navber/Navber'
import Project from '../../components/project/Project'
import { useParams } from 'react-router-dom'
import { publicRequest } from '../../requestMethods'

const ProjectPage = () => {
    const [project, setProject] = useState("")
    const { id } = useParams()
    useEffect(() => {
        const fetchingProjects = async () => {
            const res = await publicRequest.get(`/project/single/${id}`)
            setProject(res.data)
        }
        fetchingProjects()
    }, [id])
    return (
        <div>
            <Navber />
            <Project data={project} />
        </div>
    )
}

export default ProjectPage
