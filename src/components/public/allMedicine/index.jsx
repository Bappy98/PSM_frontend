import MedicineCard from '@/components/card/MedicineCard';
import { addItem } from '@/store/api/myProduct/myProductSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function AllMedicine({data}) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleAddToCart = (item) => {
      
      dispatch(addItem(item));
    }
  return (
    <div className='my-12'>
        <div className='text-2xl mx-12 my-8 text-center md:text-start md:flex md:justify-between font-bold'>
            <div>Medicine</div>
            <Link className='hidden md:block' onClick={navigate('/medicine')}>See all</Link>
        </div>
        <div className='flex flex-wrap gap-5 justify-evenly mx-auto items-center'>{
        data?.slice(0,6).map((item, i) => ( // Access  the nested data array
                        <MedicineCard item={item}
                        key={item.id}
                        onAddToCart={handleAddToCart}/>
                    ))}
        </div>
        <Link className='text-center my-4 block md:hidden bg-blue-500 rounded-lg mx-12'>See all</Link>
    </div>
  )
}

export default AllMedicine