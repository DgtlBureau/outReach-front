import { useState } from 'react'
import ProjectItem from './ProjectItem/ProjectItem'
import './ProjectList.scss'

const mockProjects = [
  { id: 1, label: 'Organize a project' },
  { id: 2, label: 'Fill the form for lead' },
  { id: 3, label: 'Make unique offer' },
  { id: 4, label: 'Prepare a presentation' },
  { id: 5, label: 'Negotiate' },
  { id: 6, label: 'Get feedback' },
]

interface IProject {
  id: number
  label: string
}

const ProjectList = () => {
  const [projects, setProjects] = useState<IProject[]>(mockProjects)

  const handleRemoveItem = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  return (
    <ul className='project-list'>
      {projects.map(({ id, label }) => (
        <ProjectItem
          onCloseClick={() => handleRemoveItem(id)}
          key={id}
          label={label}
        />
      ))}
    </ul>
  )
}

export default ProjectList
