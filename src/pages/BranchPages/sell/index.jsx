import SellTable from '@/components/shared/dataTable/SellTable';
import { selectCurrentUser } from '@/store/api/auth/authSlice';
import { getStock } from '@/store/api/stock/stockSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Sell() {
    const userId = useSelector(selectCurrentUser)
    const {stock } = useSelector((state)=> state.stock)
    const dispatch = useDispatch()
    const [open,setOpen] = useState(null)
    console.log(stock);
    
    useEffect(() => {
        if (userId) {
          dispatch(getStock({ userId }));
        }
      }, [dispatch, userId]);
      const COLUMN = [
        {
          Header: "No.",
          accessor: (row, i) => i + 1,
        },
        {
          Header: 'Medicine',
          accessor: row => row.medicine?.name,
        },
        {
          Header: 'Company',
          accessor: row => row.medicine?.company.name,
        },
        {
          Header:'UnitPrice',
          accessor: row => row.medicine?.unitPrice,
        },
        {
          Header: 'Quantity',
          accessor: 'quantity',
        },
        
      ];
  return (
    <div>
        <SellTable data={stock} column={COLUMN} open={open} setOpen={setOpen} />
    </div>
  )
}

export default Sell