import { enqueueSnackbar } from 'notistack'
import { IProduct } from '../../../ProductPage/Product/ProductForm/IcpTable/IcpTable'
import ProjectItem from './ProjectItem/ProjectItem'

import './ProjectList.scss'
import instance from '../../../../utils/api'

const ProjectList = ({ projects, refetch }: { projects: IProduct[], refetch: () => void }) => {

  const removeProject = async (id:number) => {
    try {
      const response = await instance.delete(`/projects/${id}`)
      if (response.data.message!=='Success') {
        throw new Error(response.data.message)
      }
      enqueueSnackbar('Project was removed', { variant: 'success',})
      refetch()
    } catch (error) {
      enqueueSnackbar(String(error), { variant: 'error' })
    }
  }

  return (
     <ul className='project-list'>
      {projects.map((project: IProduct) => (
        <ProjectItem
          key={project.id}
          id={project.id}
          label={project.client_name}
          description={project.project_description}
          onCloseClick={() => removeProject(project.id)}
        />
      ))}
      {projects.length === 0 ? (
        <span className='project-list__placeholder'>Project list is empty</span>
      ) : (
        ''
      )}
    </ul>
  )
}

export default ProjectList
