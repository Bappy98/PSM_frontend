import DataGrid from "@/components/shared/dataTable/DataGrid";
import { selectCurrentUser } from "@/store/api/auth/authSlice";
import fetchWrapper from "@/util/fetchWrapper";
import { Icon } from "@iconify/react";
import React from "react";
import { useSelector } from "react-redux";

function AcceptedModal({ data,setIsModalOpen }) {
  const COLUMN = [
    {
      Header:'No.',
      accessor:(row,i) =>i+1
    },
    {
      Header:"Name",
      accessor:row => row.medicine?.name
    },
    {
      Header:"Dosages",
      accessor:row => row.medicine?.dosages
    },
    {
      Header:"Type",
      accessor:row => row.medicine?.type
    },
    {
      Header: 'Company',
      accessor: row => row.medicine?.company.name,
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
    },
  ]

  const userId = useSelector(selectCurrentUser)

  const handleStatus = async (requestId, status) =>{
      try {
        const data = {
          requestId,
          status,
          userId
        }
        const res = await fetchWrapper.post(`/accept-request/${requestId}`,data)
        setIsModalOpen(null)
      } catch (error) {
        
      }
  }

  return (
    <div>
      <div className="min-h-screen w-full bg-blue-500 opacity-30 absolute inset-0"></div>
      <div className="absolute bg-white rounded-lg  min-h-96 w-5/6 top-6 mx-auto right-0 left-0">
          <div className="text-2xl font-bold flex justify-end mx-4 p-4" onClick={()=>setIsModalOpen(null)}>
            <Icon icon='heroicons:x-mark'/>
          </div>
        <div className="flex justify-between text-xl text-blue-600 px-12">
          <div><span className="text-black-500">User Request By:</span>{data.user.name}</div>
          <div><span className="text-black-500">Status: </span>{data.status}</div>
        </div>
        <div>
            <DataGrid data={data.medicines} column={COLUMN}/>
        </div>
        <div className="flex justify-center px-4">
          <button className="btn1 bg-red-600 " disabled={data.status === 'rejected' || data.status ==='accepted'}  onClick={()=>handleStatus(data._id,'rejected')}>Reject</button>
          <button className="btn1 bg-green-600" disabled={data.status === 'rejected' || data.status ==='accepted'} onClick={()=>handleStatus(data._id,'accepted')}>Accepted</button>
        </div>
      </div>
    </div>
  );
}

export default AcceptedModal;
