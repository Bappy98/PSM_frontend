import CashTable from '@/components/shared/dataTable/CashTable'
import Textarea from '@/components/ui/Textarea'

import { selectCurrentUser } from '@/store/api/auth/authSlice'
import fetchWrapper from '@/util/fetchWrapper'
import React from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {useStripe,useElements,CardElement} from '@stripe/react-stripe-js'
import TextInput from '@/components/ui/TextInput'
const schema = yup.object({
    address:yup.string().required().label("Address"),
    phone:yup.string().required().label("Phone")
}).required()
function OrderProduct() {
    const location = useLocation()
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
      resolver:yupResolver(schema)
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
      const orderInfo = {
        ...data,
        medicines,
        userId:user,
        total:grandTotal+100
      };
      navigate('/payment',{state:orderInfo})
     try {
      //await fetchWrapper.post('/order',orderInfo)
     } catch (error) {
      
     }
      

    };
    
    
  return (
    <div className='flex mx-12 justify-center bg-blue-50 '>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className='text-center font-bold text-3xl'>brk Medicine Shop</div>
        <CashTable data={medicines} column={COLUMN}/>
        <div className='flex justify-end mx-4 font-bold text-xl'>Total price : {grandTotal.toFixed(2)} </div>
          <div className='flex justify-between'>
           <div className='grid'>
           <TextInput 
            label={'Phone'} 
            register={register}
            type={'text'}
            name={'phone'}
            className='w-full'
            placeholder='Enter phone'
            error={errors.phone}
            />
          <Textarea
            label={'Delivery Address'}
            register={register}
            type={'text'}
            
            name={'address'}
            error={errors.address}
            row={5}
            cols={30}
            />
           </div>
            <div className='mt-6 mr-12 '>
              Status:  Cash on Delivery <br />
            Delivery Charge: 100 tk <br />
            <span className='font-bold'>
            Total charge: {grandTotal+100} taka
            </span>
            </div>
          </div>
         

        <div className='btnDiv justify-end'>
          <button className='button'>Checkout</button>
        </div>
      </form>
    </div>
  )
}

export default OrderProduct