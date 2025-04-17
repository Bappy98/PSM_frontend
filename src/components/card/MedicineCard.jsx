import { addItem } from "@/store/api/myProduct/myProductSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MedicineCard({ item }) {

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.myProduct.cartItems);
  const isInCart = (itemId) => {
    const foundItem = cartItems.find((cartItem) => cartItem._id === itemId);
    return foundItem !== undefined;
  };

  // Handle adding item to cart
  const handleAddToCart = () => {
    if (!isInCart(item._id)) {
      dispatch(addItem(item));
    }
  };


  return (
    <div>
      <div className="border-2 min-w-[250px] p-4 shadow-2xl rounded-xl">
        <div className="h-32 w-52 flex justify-center items-center justify-items-center mx-auto">
          <img
            src={item.medicine.image}
            alt=""
            className="h-full w-full  object-contain"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            {}
            <div>
              {item.medicine.name}  {item.medicine.dosages}
            </div>
            <div>{item.medicine.type}</div>
            <div>Price:{item.medicine.unitPrice}</div>
            <div>Stock: {item.quantity}</div>
          </div>
          <div className="h-8 w-8">
            <img
              src={item.medicine.company.logo}
              alt=""
              className="h-full w-full"
            />
            
          </div>
        </div>
        <div className="flex justify-between">
    
           <button
          onClick={handleAddToCart}
          disabled={isInCart(item._id)}
          className={`px-4 py-2 bg-green-500 text-white rounded ${
            isInCart(item._id) ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isInCart(item._id) ? "In Cart" : "Add to Cart"}
        </button>


          {/* <div className="bg-orange-300 px-2 text-sm cursor-pointer">
            Red more
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default MedicineCard;
