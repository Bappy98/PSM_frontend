import MedicineForm from "@/components/medicine/MedicineForm";
import { useGetSingleMedicineQuery } from "@/store/api/medicine/medicineApiSlice"
import { useParams } from "react-router-dom"


function MedicineEdit() {
    const {id} = useParams()
    console.log(id);
    
    const {data:medicine,isLoading,isError,error} = useGetSingleMedicineQuery(id)
   console.log(medicine);
   
  return <MedicineForm initialData={medicine} isEdit={true}/>
}

export default MedicineEdit