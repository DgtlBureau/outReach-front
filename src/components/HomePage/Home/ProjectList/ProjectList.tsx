import { IProduct } from '../../../ProductPage/Product/ProductForm/IcpTable/IcpTable'
import ProjectItem from './ProjectItem/ProjectItem'

import './ProjectList.scss'

const ProjectList = ({ projects }: { projects: IProduct[] }) => {
  return (
    <ul className='project-list'>
      {projects.map((project: IProduct) => (
        <ProjectItem
          key={project.id}
          label={project.name}
          model={project.business_model}
          industry={project.industry}
          usage={project.product_usage}
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
