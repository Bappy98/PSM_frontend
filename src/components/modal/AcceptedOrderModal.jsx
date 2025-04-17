import SingleOrder from "@/pages/customer/myOrder/SingleOrder";
import { selectCurrentUser } from "@/store/api/auth/authSlice";
import fetchWrapper from "@/util/fetchWrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function AcceptedOrderModal() {
  const location = useLocation();
  const navigate = useNavigate()
   const [lode,setLode] = useState(false)
  const requestId = location.state.data._id;
  const {  status } =
    location.state.data;
  const userId = useSelector(selectCurrentUser)
  const handleStatus = async (requestId, status) =>{
   const info = {
    status,
    userId
   }
   try {
    const res = await fetchWrapper.post(`/accepted-order/${requestId}`,info)

    if(res) {
      setLode(true)
      navigate('/order-list')
    }
   } catch (error) {
    
   }
   
}
const [data,setData] = useState(null)
useEffect(()=>{
    setLode(false)
    setData(location.state)
},[lode,data])
  
  return (
   <div className="bg-blue-300">
    <SingleOrder/>
    <div>
    <div className="flex justify-center px-4">
      <div>{status}</div>
          <button className="btn1 bg-red-600 " disabled={status === 'rejected' || status ==='accepted'}  onClick={()=>handleStatus(requestId,'rejected')}>Reject</button>
          <button className="btn1 bg-green-600" disabled={status === 'rejected' || status ==='accepted'} onClick={()=>handleStatus(requestId,'accepted')}>Accepted</button>
        </div>  
    </div>
   </div>
  );
}

export default AcceptedOrderModal;
