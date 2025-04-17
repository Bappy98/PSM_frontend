import { selectCurrentToken } from "@/store/api/auth/authSlice";
import { removeItem } from "@/store/api/myProduct/myProductSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Product() {
  const { cartItems } = useSelector((state) => state.myProduct);
  const [addMedicine, setAddMedicine] = useState([]);
  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const result = cartItems.map((cur) => ({
      medicine: cur.medicine._id,
      name: cur.medicine.name,
      type: cur.medicine.type,
      stock: cur.quantity,
      image:cur.medicine.image,
      company:cur.medicine.company.name,
      quantity: 0,
      dosages:cur.medicine.dosages,
      unitPrice: cur.medicine.unitPrice || 0,
    }));
    setAddMedicine(result);
  },[cartItems]);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newValue = Number(value);

    setAddMedicine(prev =>
        prev.map((item, i) =>
            i === index ? { ...item, [name]: newValue } : item
        )
    );
};

const removeProduct = (id) =>{
  setAddMedicine((prevMedicine) =>
    prevMedicine.filter((item) => item.medicine !== id)
);
dispatch(removeItem(id))
}

const handleSubmit = (e) => {
  e.preventDefault();
  const orderProduct = {
    medicines: addMedicine,
  };

  if (!token) {
    navigate('/login');
    return; 
  }
  navigate('/order-product', { state: orderProduct  });
};
console.log(addMedicine);


  return (
    <form onSubmit={handleSubmit}>
      {addMedicine?.map((item, i) => (
        <div className="grid grid-cols-12 items-center container mx-auto bg-gray-200 shadow-md" key={i}>
          <div>{}</div>
          <div className="h-28 w-28 items-center flex col-span-2 m-2">
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-fill"
            />
          </div>
          <div className="col-span-3">
            <div className="flex gap-2 ">
              <div>{item.name}</div>
              <div>{item.dosages}</div>
            </div>
            <div>{item.type}</div>
            <div>{item.company}</div>
            <div>{item.unitPrice}</div>
          </div>
          <div className="col-span-2">
            <div>Stock: {item.stock}</div>
            <input type="number"
            name="quantity"
            min={1}
            max={item.quantity}
            value={item.quantity}
            onChange={(e) => handleChange(e, i)}
             className="h-8 w-24" />
          </div>
          <div className="bg-red-500 cursor-pointer  rounded-lg text-center" onClick={()=>removeProduct(item.medicine)} >Remove</div>
        </div>
      ))}
      <div className="flex justify-center">
      <button type="submit" className="button">Next</button>
      </div>
    </form>
  );
}

export default Product;
