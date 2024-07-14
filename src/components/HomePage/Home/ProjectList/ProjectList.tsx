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
    </ul>
  )
}

export default ProjectList
