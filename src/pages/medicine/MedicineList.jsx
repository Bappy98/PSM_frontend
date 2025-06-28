import Button from "@/components/Button/Button";
import DataGrid from "@/components/shared/dataTable/DataGrid";
import Loading from "@/components/shared/Loading";
import { useGetMedicineQuery } from "@/store/api/medicine/medicineApiSlice";
import fetchWrapper from "@/util/fetchWrapper";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { set } from "react-hook-form";

function MedicineList() {
  const [medicines,setMedicines] = useState(null)
  const { data } = useGetMedicineQuery();
  const navigate = useNavigate()
   const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const openDeleteModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };
  useEffect(() => {
    if (data) {
      setMedicines(data)
    }
  }, [data])
  console.log(showModal);
  const handleDelete = async () => {
    if (selectedId) {
      try {
        await fetchWrapper.delete(`/medicine/${selectedId}`);
        setShowModal(false);
        setSelectedId(null);
        setMedicines(medicines.filter((medicine) => medicine._id !== selectedId));
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };
  
  
  const COLUMN = [
    {
      Header: "No.",
      accessor: (row, i) => i + 1,
    },
    {
      Header: "Name",
      accessor:'name'
    },
    {
      Header: "Dosages",
      accessor:'dosages'
    },
    // {
    //   Header:"Generic",
    //   accessor:'generic'
    // },
    {
      Header: "Company",
      accessor:'company.name'
    },
    {
      Header: "Type",
      accessor:'type'
    },
    
    {
      Header: "Unit Price",
      accessor:'unitPrice'
    },
    {
      Header:"Actions",
      Cell:({row})=>(
       <div className=" flex gap-5">
         <div className="cursor-pointer" onClick={()=>navigate(`/medicine-edit/${row.original._id}`)}>
          <Icon icon={'heroicons:pencil-square'}/>
        </div>
        <div className="cursor-pointer" >
          <Icon icon={'heroicons:trash'} onClick={()=>openDeleteModal(row.original._id)}/>
        </div>
       </div>

      )
    }
  ];
;
if(!data) {
  return <Loading/>
}
  

  return (
    <div className="relative">
      <Button link={'/medicine-create'}>Create Medicine</Button>
      <DataGrid data={medicines} column={COLUMN} />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this medicine?
            </h3>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicineList;
