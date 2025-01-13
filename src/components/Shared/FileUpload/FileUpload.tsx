import { ReactComponent as FileUploadIcon } from './images/file-upload.svg'
import cn from 'classnames'

import './FileUpload.scss'

interface IFileUploadProps {
  name?: string
  value?: any
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  accept?: '.jpeg, .png, .jpg' | '.pdf'
}

const FileUpload = ({
  value,
  name,
  onChange,
  className,
  accept,
}: IFileUploadProps) => {
  return (
    <label className={cn('file-upload', className)}>
      <FileUploadIcon className='file-upload__icon' />
      <input
        onChange={onChange}
        value={value}
        type='file'
        multiple
        accept={accept}
        className='file-upload__input'
      />
      <span className='file-upload__title'>Upload media files</span>
      <span className='file-upload__file-name'>{name}</span>
    </label>
  )
}

export default FileUpload
