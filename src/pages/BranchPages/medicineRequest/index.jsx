import React from 'react'
import { useSelector } from 'react-redux'

function MedicineReq() {

    const medicine = useSelector(state=>state.MedicineReq)
    console.log(medicine);
    
  return (
    <div>

    </div>
  )
}

export default MedicineReq