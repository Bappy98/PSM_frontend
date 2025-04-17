import MedicineCard from "@/components/card/MedicineCard";
import Loading from "@/components/shared/Loading";
import { addItem, removeItem } from "@/store/api/myProduct/myProductSlice";
import { useGetMedicineForOrderQuery } from "@/store/api/userOrder/userOrderApiSlice";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useDispatch,} from "react-redux";

function AllMedicine() {
  const { data,loading } = useGetMedicineForOrderQuery();
  const medicineType = [
    {
      value:'',
      option:"none"
    },
    {
      value:'Tablet',
      option:"Tablet"
    },
    {
      value:"Syrup",
      option:"Syrup"
    },
    {
      value:"Capsules",
      option:"Capsules"
    },
    {
      value:"Drops",
      option:"Drops"
    },
    {
      value:"Inhalers",
      option:"Inhalers"
    },
    {
      value:"Implants or patches",
      option:"Implants or patches"
    },
    {
      value:"Injections",
      option:"Injections"
    },
  ]
 const [name,setName] = useState('')
  const [type,setType] = useState('')
 const handleChange = (e) =>{
    setName(e.target.name=e.target.value)
 }

  //console.log(product);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
  };

 if(loading) {
  return <Loading/>
 }

  return (
    <div className=" ">
      <div className="flex items-center justify-evenly mt-8">
     <div className="flex">
     <input type="text" onChange={handleChange} className="border-4 rounded-md" />
     <div className="text-xl p-[5px] rounded-md  bg-gray-300">
     <Icon icon={'heroicons:magnifying-glass'}/>
     </div>
     </div>
     <div>
     <label for="Type" className="font-bold mx-4">Type:</label>
  <select value={type} onChange={(e)=>setType(e.target.value)}>
    {medicineType.map((item,i)=>(
      <option value={item.value}>{item.option}</option>

    ))}
  </select>
     </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-center my-1">All Medicine</div>
        <div className="grid gap-4 grid-cols-1 container mx-auto justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.filter(item=>item.medicine.name?.toLowerCase().includes(name.toLowerCase())).
          filter(item=>item.medicine.type.includes(type)).map(
            (
              item,
              i 
            ) => (
              <MedicineCard
                item={item}
                key={item.id}
                onAddToCart={handleAddToCart}
                onRemoveFormCart={handleRemoveFromCart}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default AllMedicine;
