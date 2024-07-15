import './Loader.scss'

const Loader = ({ color }: { color?: string }) => {
  return (
    <div className='loader' style={color ? { borderTopColor: color } : {}} />
  )
}

export default Loader
