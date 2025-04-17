import AcceptedModal from "@/components/modal/AcceptedModal";
import DataGrid from "@/components/shared/dataTable/DataGrid";
import Loading from "@/components/shared/Loading";
import { getRequest } from "@/store/api/request/requestSlice";
import fetchWrapper from "@/util/fetchWrapper";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MedicineRequest() {
  const dispatch = useDispatch();
  const { request,loading } = useSelector((state) => state.getAllRequest);
  const [medicine,setMedicine] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(null);
  

  useEffect(() => {
    dispatch(getRequest());
  },[dispatch]);
  useEffect(()=>{

  },[isModalOpen])

  const singleMedicine =async (id) =>{
   try {
    const data = await fetchWrapper.get(`/request/${id}`)
    setMedicine(data.data)
    setIsModalOpen(true)
   } catch (error) {   
   }  
  }
  const sortedRequest = request?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const COLUMN = [
    {
      Header: "No.",
      accessor: (row, i) => i + 1,
    },
    {
      Header:"User",
      accessor:row=>row.user?.name
    },
    {
      Header:"Item",
      accessor:row=>row.medicines.length
    },
    {
      Header:"Status",
      accessor:row=>row.status
    },
    {
      Header:"Time",
      accessor:row=>new Date(row.createdAt).toLocaleString()   
    },
      {
        Header: "View",
        Cell: ({ row }) => (
          <button className="text-xl flex justify-center text-center ml-2" onClick={()=>singleMedicine(row.original._id)}>
            <Icon icon="heroicons-eye" />
          </button>
        ),
        disableSortBy: true, // Disable sorting for this column
      },
  ];
if(loading) {
  return <Loading/>
}
  return (
    <div className="relative">
      <DataGrid data={sortedRequest} column={COLUMN} />
      {isModalOpen && <AcceptedModal data={medicine} setIsModalOpen={setIsModalOpen}/> }
    </div>
  );
}

export default MedicineRequest;
