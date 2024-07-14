import ProjectList from './ProjectList/ProjectList'
import { useFetch } from '../../../utils/loadData'

import './Home.scss'
import LeadsList from './LeadsList/LeadsList'
import LoaderList from './ProjectList/LoaderList/LoaderList'

const Home = () => {
  const projectsFetch = useFetch(
    'projects',
    'Failed to load projects. Please, try again later'
  )
  const leadsFetch = useFetch(
    'lead',
    'Failed to load leads. Please, try again later'
  )

  return (
    <main className='home'>
      <div className='home__projects'>
        <span className='home__title'>Projects</span>
        <div className='home__list-wrapper'>
          {projectsFetch.isLoading ? (
            <LoaderList />
          ) : (
            <ProjectList projects={projectsFetch.data} />
          )}
        </div>
      </div>
      <div className='home__leads'>
        <span className='home__title'>Leads</span>
        <div className='home__list-wrapper'>
          {leadsFetch.isLoading ? (
            <LoaderList />
          ) : (
            <LeadsList leads={leadsFetch.data} />
          )}
        </div>
      </div>
    </main>
  )
}

export default Home
