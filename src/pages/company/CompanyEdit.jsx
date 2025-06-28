import CreateCompany from '@/components/companyForm/CreateCompany'
import fetchWrapper from '@/util/fetchWrapper';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom'

function CompanyEdit() {
  const {id} = useParams()
  console.log(id);
  

  const [data,setData] = useState({})
  useEffect(async() => {
    try {
      const responce = await fetchWrapper.get(`/company/${id}`)
      setData(responce.data)
    } catch (error) {
      
    }
  },[id])
  
  console.log(data);
  

  return <CreateCompany initialData={data} isEdit={true}/>
}

export default CompanyEdit