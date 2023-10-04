import React, { useEffect, useState } from 'react'
import Navber from '../../components/navber/Navber'
import Project from '../../components/project/Project'
import { useParams } from 'react-router-dom'
import { publicRequest } from '../../requestMethods'
import Footer from '../../components/footer/Footer'

const ProjectPage = () => {
    const { id } = useParams()
    const [inputs, setInputs] = useState({})
    useEffect(() => {
        const fetchingProjects = async () => {
            const res = await publicRequest.get(`/project/single/${id}`)
            setInputs(res.data)
        }
        fetchingProjects()
    }, [id])
    return (
        <div>
            <Navber />
            <Project inputs={inputs} setInputs={setInputs} />
            <Footer />
        </div>
    )
}

export default ProjectPage
