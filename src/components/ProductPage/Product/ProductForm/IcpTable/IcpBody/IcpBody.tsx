import { useEffect, useRef, useState } from 'react'
import { IProduct } from '../IcpTable'

import { ReactComponent as CloseIcon } from '../../images/put-icon.svg'
import './IcpBody.scss'

interface IIcpBody {
  product: IProduct
  isModal: boolean
  changeGptAnswer: ({
    e,
    idx,
  }: {
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    idx: number | null | undefined
  }) => void
  idx?: number | null | undefined
  inputBoxClass: string
  onSubmit: (data: IProduct) => void
}

const IcpBody = ({
  product,
  inputBoxClass,
  onSubmit,
  changeGptAnswer,
  isModal,
  idx,
}: IIcpBody) => {
  const [formData, setFormData] = useState(product)
  const [projectFocesId, setProjectFocusId] = useState<number | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const textareaScopeRef = useRef<HTMLTextAreaElement>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number | null | undefined
  ) => {
    if (isModal) {
      changeGptAnswer({ e, idx })
    }
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const isOnFocus = (id: number) => {
    setTimeout(() => {
      setProjectFocusId(id)
    }, 100)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setProjectFocusId(null)
    }, 100)
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [formData.project_description || formData.Project])

  useEffect(() => {
    if (textareaScopeRef.current) {
      textareaScopeRef.current.style.height = 'fit-content'
      textareaScopeRef.current.style.height = `${textareaScopeRef.current.scrollHeight}px`
    }
  }, [formData.scope_of_work || formData.ScopeOfWork])

  return (
    <>
      <div className={inputBoxClass}>
        <input
          className='icp-input'
          name={!isModal ? 'client_name' : 'ClientName'}
          value={formData.client_name || formData.ClientName}
          onChange={(e) => handleInputChange(e, idx)}
          onFocus={() => isOnFocus(formData.id)}
          onBlur={() => handleBlur()}
        />
      </div>
      <div className={inputBoxClass}>
        <input
          className='icp-input'
          name={!isModal ? 'industry_name' : 'IndustryName'}
          value={formData.industry_name || formData.IndustryName}
          onChange={(e) => handleInputChange(e, idx)}
          onFocus={() => isOnFocus(formData.id)}
          onBlur={() => handleBlur()}
        />
      </div>
      <div className={inputBoxClass}>
        <input
          name={
            !isModal ? 'direction_of_application' : 'DirectionOfApplication'
          }
          value={
            formData.direction_of_application || formData.DirectionOfApplication
          }
          className='icp-input'
          onChange={(e) => handleInputChange(e, idx)}
          onFocus={() => isOnFocus(formData.id)}
          onBlur={() => handleBlur()}
        />
      </div>
      <div className={inputBoxClass}>
        <textarea
          ref={textareaRef}
          name={!isModal ? 'project_description' : 'Project'}
          value={formData.project_description || formData.Project}
          className='text-area'
          onChange={(e) => handleInputChange(e, idx)}
          onFocus={() => isOnFocus(formData.id)}
          onBlur={() => handleBlur()}
        />
      </div>
      <div className={inputBoxClass}>
        <textarea
          ref={textareaScopeRef}
          name={!isModal ? 'scope_of_work' : 'ScopeOfWork'}
          value={formData.scope_of_work || formData.ScopeOfWork}
          className='text-area'
          onChange={(e) => handleInputChange(e, idx)}
          onFocus={() => isOnFocus(formData.id)}
          onBlur={() => handleBlur()}
        />
      </div>
      {!isModal &&
        (formData.id === projectFocesId ? (
          <div className={inputBoxClass}>
            <button
              type='button'
              className='changeBtn'
              onClick={() => onSubmit(formData)}
            >
              <CloseIcon className='changeBtn-icon' />
            </button>
          </div>
        ) : (
          <div className={inputBoxClass}></div>
        ))}
    </>
  )
}

export default IcpBody
