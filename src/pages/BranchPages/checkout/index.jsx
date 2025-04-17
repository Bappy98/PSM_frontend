import CashTable from '@/components/shared/dataTable/CashTable';
import TextInput from '@/components/ui/TextInput';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/api/auth/authSlice';
import fetchWrapper from '@/util/fetchWrapper';

const schema = yup.object({
  customer:yup.string().required().label("Name")
}).required()

function Checkout() {
    const location = useLocation()
    //console.log(location);
    const {medicines} = location.state
    //console.log(medicines);
    const navigate = useNavigate()
    const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm({
      mode: "all",
      resolver: yupResolver(schema),
    });
    const COLUMN = [
      {
        Header:'No.',
        accessor:(row,i) =>i+1
      },
      {
        Header:'Name',
        accessor:'name'
      },
      {
        Header:'quantity',
        accessor:'quantity'
      },
      {
        Header:'unitPrice',
        accessor:'unitPrice'
      },
      {
        Header:'Total price',
        accessor: (row) => {
          const totalPrice = row.quantity * row.unitPrice;
          return totalPrice ? totalPrice.toFixed(2) : '0.00'; // Return '0.00' if undefined or NaN
        },
      }
    ]

    const grandTotal = medicines.reduce((acc, item) => {
      const totalPrice = item.quantity * item.unitPrice;
      return acc + (totalPrice || 0); // Accumulate total price, ignore if undefined
    }, 0);
    const user = useSelector(selectCurrentUser)

    const onSubmit = async (data) => {
      const sellInfo = {
        ...data,
        medicines,
        totalPrice: grandTotal,
        user
      };
      console.log("Submitting sellInfo:", sellInfo); // Debugging log
    
      try {
        const res = await fetchWrapper.post('/product-sell', sellInfo);
        console.log("Response from /product-sell:", res); // Debugging log
        navigate('/cash-memo', { state: sellInfo });
        console.log("Navigation to /cash-memo successful"); // Debugging log
      } catch (error) {
        console.error("Error during sellProduct submission:", error); // Log the error
        // Optionally, display an error message to the user
      }
    };
    
    
  return (
    <div className='flex mx-12 justify-center bg-blue-50 '>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className='text-center font-bold text-3xl'>brk Medicine Shop</div>
      <TextInput
        label={'Customer Name :'}
        register={register}
        type={'text'}
        name={'customer'}
        error={errors.customer}
        className="max-w-96 w-full "
        placeholder='Enter customer name'
      />
        <CashTable data={medicines} column={COLUMN}/>
        <div className='flex justify-end mx-4 font-bold text-xl'>Total price : {grandTotal.toFixed(2)} </div>
        <div className='btnDiv justify-end'>
          <button className='button'>Checkout</button>
        </div>
      </form>
    </div>
  )
}

export default Checkout