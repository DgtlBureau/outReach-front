import { ReactComponent as FileUploadIcon } from './images/file-upload.svg'
import cn from 'classnames'

import './FileUpload.scss'

interface IFileUploadProps {
  label: string
  value?: any
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  accept?: '.jpeg, .png, .jpg' | '.pdf'
}

const FileUpload = ({
  label,
  value,
  onChange,
  className,
  accept,
}: IFileUploadProps) => {
  return (
    <label className={cn('file-upload', className)}>
      <span className='file-upload__label'>
        {label} <FileUploadIcon className='file-upload__icon' />
      </span>
      <input
        onChange={onChange}
        value={value}
        type='file'
        multiple
        accept={accept}
        className='file-upload__input'
      />
    </label>
  )
}

export default FileUpload
