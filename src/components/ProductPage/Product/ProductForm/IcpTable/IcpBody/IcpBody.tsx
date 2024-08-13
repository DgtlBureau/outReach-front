import { useState } from "react"
import { IProduct } from "../IcpTable"
import './IcpBody.scss'

const IcpBody = ({product, className}:any) => {

    const [formData, setFormData] = useState(product)

     const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>, id:number) => {
         const { name, value } = e.target;
         setFormData({...formData, [name]:value})
    
    // setFormData(prevFormData=>prevFormData.map(product=>product.id ===id ? {...product, [name]:value } : product))

    console.log(formData);
  }

    return (
        <>
            <input className={className} name='client_name' value={formData.client_name} onChange={(e)=>handleInputChange(e, product.id)}/>
              <input className={className} name='industry_name' value={formData.industry_name} onChange={(e)=>handleInputChange(e, product.id)}/>
            <input name='common_problems' value={product.common_problems} className={className} />
              <input name='location' value={product.location} className='icp-table__cell'/>
              <input name='' value={product.business_model} className='icp-table__cell' style={{ textAlign: 'center' }}/>
              <input name='' value={product.company_type} className='icp-table__cell'/>
              <input name='' value={product.buying_behaviour} className='icp-table__cell'/>

              <input name='' value={product.product_usage} className='icp-table__cell'/>
              <input name='' value={product.technology_stack} className='icp-table__cell'>
                {product?.technology_stack}
              </input>
              <input name='' value={product.integration_needs} className='icp-table__cell' />
        </>
    )
}

export default IcpBody