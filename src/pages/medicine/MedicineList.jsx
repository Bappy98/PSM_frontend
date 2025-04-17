import Button from "@/components/Button/Button";
import DataGrid from "@/components/shared/dataTable/DataGrid";
import Loading from "@/components/shared/Loading";
import { useGetMedicineQuery } from "@/store/api/medicine/medicineApiSlice";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { set } from "react-hook-form";

function MedicineList() {
  const [medicines,setMedicines] = useState(null)
  const { data } = useGetMedicineQuery();
  const navigate = useNavigate()
  
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
        <div className="cursor-pointer" onClick={()=>navigate(`/medicine-edit/${row.original._id}`)}>
          <Icon icon={'heroicons:pencil-square'}/>
        </div>
      )
    }
  ];
;
if(!data) {
  return <Loading/>
}
  

  return (
    <div>
      <Button link={'/medicine-create'}>Create Medicine</Button>
      <DataGrid data={data} column={COLUMN} />
    </div>
  );
}

export default MedicineList;
