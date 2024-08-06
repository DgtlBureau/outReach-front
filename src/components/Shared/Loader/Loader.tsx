import './Loader.scss'

const Loader = ({ color, size }: { color?: string; size?: number }) => {
  const style = {
    width: size ? `${size}px` : '24px',
    height: size ? `${size}px` : '24px',
    borderTopColor: color ? color : 'var(--main-color)',
  }
  return <div className='loader' style={style} />
}

export default Loader
