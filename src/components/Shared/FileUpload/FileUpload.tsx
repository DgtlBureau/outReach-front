import { ReactComponent as FileUploadIcon } from './images/file-upload.svg'
import cn from 'classnames'

import './FileUpload.scss'

interface IFileUploadProps {
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const FileUpload = ({ value, onChange, className }: IFileUploadProps) => {
  return (
    <label className={cn('file-upload', className)}>
      <span className='file-upload__label'>
        Upload screenshots <FileUploadIcon className='file-upload__icon' />
      </span>
      <input type='file' multiple className='file-upload__input' />
    </label>
  )
}

export default FileUpload
