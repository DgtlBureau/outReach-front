import CustomButton from '../../Shared/CustomButton/CustomButton'
import FileUpload from '../../Shared/FileUpload/FileUpload'
import { Dialog, DialogTitle } from '@mui/material'
import LeadPreview from './LeadPreview/LeadPreview'
import Loader from '../../Shared/Loader/Loader'
import { enqueueSnackbar } from 'notistack'
import instance from '../../../utils/api'
import { useState } from 'react'

import './LeadForm.scss'

interface ILeadFormProps {
  files: any
  setFiles: any
  leadUrl: string
  setLeadUrl: any
  onSubmit: (event: any) => void
  onCancelPress: () => void
}

const LeadForm = ({
  files,
  setFiles,
  leadUrl,
  setLeadUrl,
  onSubmit,
  onCancelPress,
}: ILeadFormProps) => {
  return (
    <form className='lead-form' onSubmit={(event) => onSubmit(event)}>
      <span className='lead-form__title'>Add new lead</span>
      <div className='lead-form__content'>
        <div className='lead-form__input-wrapper'>
          <span className='lead-form__input-label'>LinkedIn URL</span>
          <input
            value={leadUrl}
            onChange={(e: any) => setLeadUrl(e.target.value)}
            required
            className='lead-form__input'
            placeholder='https://www.linkedin.com/in/john-doe/'
          />
          <div className='lead-form__file-upload'>
            <span className='lead-form__upload-label'>Upload</span>
            <FileUpload
              accept='.jpeg, .png, .jpg'
              value={files[0]?.filename}
              onChange={setFiles}
            />
          </div>
        </div>
        <div className='lead-form__images-preview'>
          {files.length > 0 &&
            Array.from(files).map((file: any) => {
              return (
                <div
                  key={file.name}
                  className='lead-form__image-preview-wrapper'
                >
                  <img
                    className='lead-form__image-preview'
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                </div>
              )
            })}
        </div>
        <div className='lead-form__controls'>
          <CustomButton
            type='button'
            onClick={onCancelPress}
            className='lead-form__cancel'
            style='empty'
          >
            Cancel
          </CustomButton>
          <CustomButton type='submit' className='lead-form__confirm'>
            Submit
          </CustomButton>
        </div>
      </div>
    </form>
  )
}

export default LeadForm
