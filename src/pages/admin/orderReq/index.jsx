import AcceptedOrderModal from '@/components/modal/AcceptedOrderModal';
import DataGrid from '@/components/shared/dataTable/DataGrid'
import Loading from '@/components/shared/Loading';
import { orderRequest } from '@/store/api/order/orderSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OrderList() {
    const dispatch = useDispatch();
    const {order,loading} = useSelector((state)=>state.order)
    const navigate = useNavigate()
    
    const singleOrder = async ( id ) => {
      try {
        const  {data}  = await fetchWrapper.get(`/order/${id}`);
        navigate("/order-status",{state:{data}})
      } catch (error) {}
    };

    useEffect(()=>{
        dispatch(orderRequest())
    },[dispatch])
    const order1 = order?.slice().sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
    const COLUMN = [
        {
          Header: "No.",
          accessor: (row, i) => i + 1,
        },
        {
          Header:"User",
          accessor:row=>row.user?.name
        },
        {
          Header:"Item",
          accessor:row=>row.medicines.length
        },
        {
          Header:"Status",
          accessor:row=>row.status
        },
        {
          Header:"Time",
          accessor:row=>new Date(row.createdAt).toLocaleString()   
        },
        {
            Header: "View",
            Cell: ({ row }) => (
              <button className="z-50" onClick={()=>singleOrder(row.original._id)}>
                <Icon icon="heroicons-eye" />
              </button>
            ),
            disableSortBy: true, // Disable sorting for this column
          },
          
      ];
      if(loading) {
        return <Loading/>
      }
  return (
    
        <div className='relative'>
          {order1 && <DataGrid data={order1} column={COLUMN} />}
        </div>
      
  )
}

export default OrderList