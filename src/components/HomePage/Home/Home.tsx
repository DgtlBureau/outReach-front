import ProjectList from './ProjectList/ProjectList'
import { useFetch, useQueryFetch } from '../../../utils/loadData'

import './Home.scss'
import LeadsList from './LeadsList/LeadsList'
import LoaderList from './ProjectList/LoaderList/LoaderList'

const Home = () => {
  const projectsFetch = useQueryFetch('projects', ['projects'])
  const leadsFetch = useQueryFetch('lead', ['leads'])

  return (
    <main className='home'>
      <div className='home__wrapper'>
        <div className='home__projects'>
          <span className='home__title'>Projects</span>
          <div className='home__list-wrapper'>
            {projectsFetch.isLoading ? (
              <LoaderList />
            ) : (
              <ProjectList
                projects={projectsFetch.data}
                refetch={projectsFetch.refetch}
              />
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
      </div>
    </main>
  )
}

export default Home
