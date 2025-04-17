import CashTable from '@/components/shared/dataTable/CashTable'
import { selectCurrentUser } from '@/store/api/auth/authSlice'
import { singleBranch } from '@/store/api/singleBranch/singleBranchSlice'
import { getUser } from '@/store/api/user/userSlice'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {ReactToPrint} from 'react-to-print'

function CashMemo() {
    const location = useLocation()
    const dispatch = useDispatch()
    const {medicines,totalPrice, customer} = location.state
    const componentRef = useRef(null);
    const userId = useSelector(selectCurrentUser)
    const { user, loading, error } = useSelector((state) => state.user);
   // console.log(user);
    
    React.useEffect(()=>{
      if(userId) {
        dispatch(getUser({user_id:userId}))
      }
    },[dispatch,userId])
    console.log(user);
    
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
    
  return (
    <div>
      <ReactToPrint
      trigger={()=>{
        return <div className='btnDiv justify-center'>
           <button className='button'>Print</button>
        </div>
      }}
      content={()=>componentRef.current}
      documentTitle='New Document'
      />
      <div className='mx-32' ref={componentRef}>
        <div className='text-center text-2xl font-bold'>BRK Medicine Shop</div>
      <div className='text-center text-xl'>{user?.name}</div>
        <div className='text-xl uppercase'>Customer : {customer}</div>
        <CashTable data={medicines} column={COLUMN}/>
        <div className='flex justify-end mx-12 font-bold text-xl'>Total price : {totalPrice.toFixed(2)} </div>
    </div>
    </div>
  )
}

export default CashMemo