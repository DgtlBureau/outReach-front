import { useEffect, useRef, useState } from "react"
import { IProduct } from "../IcpTable"

import { ReactComponent as CloseIcon } from '../../images/put-icon.svg'
import './IcpBody.scss'

interface IIcpBody {
  product: IProduct
  inputBoxClass: string
  onSubmit: (data: IProduct) => void
}

const IcpBody = ({ product, inputBoxClass, onSubmit }: IIcpBody) => {

  const [formData, setFormData] = useState(product)
  const [projectFocesId, setProjectFocusId] = useState<number | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const textareaScopeRef = useRef<HTMLTextAreaElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const isOnFocus = (id: number) => {
    setTimeout(() => {
      setProjectFocusId(id)
    }, 100)
  }

  const handleBlur = (id: number) => {
    setTimeout(() => {
      setProjectFocusId(null)
    }, 100)
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [formData.project_description])

  useEffect(() => {
    if (textareaScopeRef.current) {
      textareaScopeRef.current.style.height = 'fit-content';
      textareaScopeRef.current.style.height = `${textareaScopeRef.current.scrollHeight}px`
    }
  }, [formData.scope_of_work])

  return (
    <>
      <div className={inputBoxClass}>
        <input className='icp-input' name='client_name' value={formData.client_name} onChange={(e) => handleInputChange(e, formData.id)} onFocus={() => isOnFocus(formData.id)} onBlur={() => handleBlur(formData.id)} />
      </div>
      <div className={inputBoxClass}>
        <input className='icp-input' name='industry_name' value={formData.industry_name} onChange={(e) => handleInputChange(e, formData.id)} onFocus={() => isOnFocus(formData.id)} onBlur={() => handleBlur(formData.id)} />
      </div>
      <div className={inputBoxClass}><input name='direction_of_application' value={formData.direction_of_application} className='icp-input' onChange={(e) => handleInputChange(e, formData.id)} onFocus={() => isOnFocus(formData.id)} onBlur={() => handleBlur(formData.id)} /></div>
      <div className={inputBoxClass}><textarea ref={textareaRef} name='project_description' value={formData.project_description} className='text-area' onChange={(e) => handleInputChange(e, formData.id)} onFocus={() => isOnFocus(formData.id)} onBlur={() => handleBlur(formData.id)} /></div>
      <div className={inputBoxClass}><textarea ref={textareaScopeRef} name='scope_of_work' value={formData.scope_of_work} className='text-area' onChange={(e) => handleInputChange(e, formData.id)} onFocus={() => isOnFocus(formData.id)} onBlur={() => handleBlur(formData.id)} /></div>
      {formData.id === projectFocesId ? (<div className={inputBoxClass}><button type="button" className="changeBtn" onClick={() => onSubmit(formData)}><CloseIcon className='changeBtn-icon' /></button></div>) : (<div className={inputBoxClass}></div>)}
    </>
  )
}

export default IcpBody