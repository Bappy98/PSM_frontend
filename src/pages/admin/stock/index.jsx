import DataGrid from '@/components/shared/dataTable/DataGrid';
import Loading from '@/components/shared/Loading';
import TextInput from '@/components/ui/TextInput';
import { selectCurrentUser } from '@/store/api/auth/authSlice';
import { getStock } from '@/store/api/stock/stockSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";

const schema = yup.object({
  quantity:yup.number().required().label("Number")
}).required()
function Stock() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(null);
  const userId = useSelector(selectCurrentUser); 
  const { stock,loading} = useSelector((state) => state.stock);
  const {register,formState:{errors},handleSubmit,reset} = useForm({
    mode:'all',
    resolver:yupResolver(schema)
  })
  
  

  useEffect(() => {
    if (userId ||isModalOpen === null) {
      dispatch(getStock({ userId }));
    }
    
  }, [dispatch, userId,isModalOpen]);

  

  const COLUMN = [
    {
      Header: 'No.',
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
      Header: 'Quantity',
      accessor: 'quantity',
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <button
          onClick={() => setIsModalOpen({
            id:row.original.medicine._id,
            name:row.original.medicine.name
          })}  // Store the medicine ID in isModalOpen
          className="text-blue-600 hover:text-blue-800"
        >
          Add
        </button>
      )
    }
  ];

  const onSubmit = async (data) => {
    //console.log(data);
    
    try {
      const res = await fetchWrapper.post(`/stock/add/${userId}/${isModalOpen.id}`,data)
      setIsModalOpen(null)
      reset()
    } catch (error) {
      
    }
  }
  if(loading) {
    return <Loading/>
  }


  return (
    <div className='relative'>
      <DataGrid data={stock} column={COLUMN} />

      {isModalOpen && (
       <div>
       <div className='min-h-screen w-full bg-blue-500 opacity-30 absolute inset-0'></div>
       <div className='absolute bg-blue-500 rounded-lg  h-36 w-96 top-6 mx-auto right-0 left-0'>
       <form className='flex justify-center items-center my-auto h-32 flex-col' onSubmit={handleSubmit(onSubmit)}>
       <TextInput
       type={'number'}
       label={`Add ${isModalOpen.name}`}
       placeholder='Enter a Number'
       className='px-2'
       register={register}
       name='quantity'
       error={errors.quantity}

       />
       <div className='flex px-2'>
       <button className='btn hover:bg-blue-700'>submit</button>
       <button className='btn hover:bg-red-500' onClick={()=>setIsModalOpen(null)}>cancel</button>
       </div>
       </form>
      </div>
      </div>
      )}
    </div>
  );
}

export default Stock;
