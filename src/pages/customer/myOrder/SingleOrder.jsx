import React from "react";
import { useLocation } from "react-router-dom";

function SingleOrder() {
  //console.log(data);
  
  const location = useLocation();
  //console.log(location.state);
  console.log(location);
  
 
  
  const { address, invoice, medicines, phone, total, status,user } =
    location.state.data;
  return (
    <div className="grid grid-cols-2 container mx-auto bg-gray-300 text-xl p-3 rounded-lg shadow-xl mt-8">
      <div>
        <p>Invoice Number:{invoice}</p>
            <p>Status : <span className="font-semibold text-blue-500">{status}</span></p>
        <p>Total Price:{total}</p>
        <p>Item: {medicines.length}</p>
        <p>Medicines: </p>
        {medicines.map((item, i) => {
            const { medicine } = item;
          return (
            <div>
             <div> <span className="font-semibold">{medicine.name}</span>  {medicine.dosages} Quantity : {item.quantity}</div>
             <div>Type : {medicine.type}  unitPrice : {medicine.unitPrice}</div>
            </div>
          );
        })}
       
      </div>
      <div>
        <p>Customer Name: <span className="uppercase">{user.name}</span></p>
        <p>Phone: {phone}</p>
        <p>Address: {address}</p>
        <p>Payment Status:Paid</p>
      </div>
    </div>
  );
}

export default SingleOrder;
