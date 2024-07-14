import LoaderBlock from './LoaderBlock/LoaderBlock'

import './LoaderList.scss'

const LoaderList = () => {
  return (
    <ul className='loader-list'>
      <LoaderBlock />
      <LoaderBlock />
      <LoaderBlock />
      <LoaderBlock />
      <LoaderBlock />
      <LoaderBlock />
    </ul>
  )
}

export default LoaderList
