import { selectCurrentUser } from "@/store/api/auth/authSlice";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function ProductSell({ data, setOpen }) {
  const userId = useSelector(selectCurrentUser);
  const [addMedicine, setAddMedicine] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const result = data.map((cur) => ({
      medicine: cur.original.medicine._id,
      name: cur.original.medicine.name,
      type: cur.original.medicine.type,
      stock: cur.original.quantity,
      unitPrice: cur.original.medicine?.unitPrice || 0,
      quantity: 0,
    }));
    setAddMedicine(result);
  }, [data]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newValue = Number(value);

    setAddMedicine((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [name]: newValue } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sellData = {
      userId, 
      medicines: addMedicine, 
    };
    
    navigate("/checkout", { state: sellData });
  };
  return (
    <div>
      <div className="min-h-screen w-full bg-blue-500 opacity-30 absolute inset-0"></div>
      <div className="absolute bg-white rounded-lg  min-h-96 w-5/6 top-6 mx-auto right-0 left-0">
        <div
          className="text-2xl font-bold flex justify-end mx-4 p-4"
          onClick={() => setOpen(null)}
        >
          <Icon icon="heroicons:x-mark" />
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            {addMedicine.map((item, index) => (
              <div key={index} className="">
                <div className="grid md:grid-cols-5 grid-cols-2 mx-12 justify-items-stretch">
                  <div>Name : {item.name}</div>
                  <div> Type : {item.type} </div>
                  <div>Stock : {item.stock}</div>
                  <div>UnitPrice: {item.unitPrice}</div>
                  <div className="col-span-2">
                    <label htmlFor="">Enter Number</label>
                    <input
                      className="bg-green-100 border-black-500 border-solid border-2 m-1 px-2"
                      type="number"
                      name="quantity"
                      min={0} // Minimum value
                      max={item.stock} // Maximum value, representing available stock
                      placeholder="Enter Medicine Request"
                      value={item.quantity}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex  py-5 mx-5 justify-center">
              <>
                {" "}
                <button
                  type="submit"
                  className="relative flex items-center justify-center p-3 bg-blue-500 text-white rounded"
                >
                  Next
                </button>
              </>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductSell;
