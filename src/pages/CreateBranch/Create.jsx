import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '../../components/ui/TextInput';
// Import any other necessary components and hooks

const schema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  phone: yup.string().required('Phone is required'),
  // Add validation schema for other fields as needed
}).required();

const Create = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Handle form submission, e.g., send data to backend
    console.log(data);
    setIsLoading(false);
    navigate('/'); // Redirect after successful submission
  };

  return (
    <div className="bg-white p-4 shadow-xl ">
        <h1 className='text-xl text-blue-500 py-2'>Company create</h1>
      
          <form className="space-y-4 mt-4"  onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="name"
              label="Name"
              type="text"
              className='w-3/4 border border-slate-500 px-6 py-1 rounded'
              placeholder="Enter name"
              register={register}
              error={errors.name}
            />
            <TextInput
              name="address"
              label="Address"
              className='w-3/4 border border-slate-500 px-6 py-1 rounded'
              type="text"
              placeholder="Enter address"
              register={register}
              error={errors.address}
            />
            <TextInput
              name="phone"
              label="Phone"
              type="text"
              className='w-3/4 border border-slate-500 px-6 py-1 rounded'
              placeholder="Enter phone number"
              register={register}
              error={errors.phone}
            />
           <TextInput
              name="log"
              label="logo"
              type="file"
              className='w-3/4 px-6 py-1 rounded'
              placeholder="Enter phone number"
              register={register}
              error={errors.phone}
            />
            <button
              type="submit"
              className="w-full bg-blue-900 text-white rounded-md mt-4 hover:text-white py-2 hover:bg-blue-500 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
     
  );
};

export default Create;
