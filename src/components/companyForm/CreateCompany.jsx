//import React from 'react'
import * as yup from "yup";
import Title from "../title/Title";
import FileInput from "../ui/FileInput";
import TextInput from "../ui/TextInput";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchWrapper from "@/util/fetchWrapper";

const schema = yup
  .object()
  .shape({
    name: yup.string().required().label("Name"),
    address: yup.string().required().label("Address"),
    phone: yup.string().required().label("Phone"),
    //image: yup.mixed().required("A Image is required"),
  })
  .required();
function CreateCompany({ initialData = null, isEdit = false }) {
 // const [base64Logo, setBase64Logo] = useState(null);
  const navigate = useNavigate()
  const {id} = useParams()
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
     // logo: base64Logo,
    };
  
    try {
      let url;
      if (isEdit && id) {
        url = `/company/${id}`;
       await fetchWrapper.put(url, formData);
       reset();  
      navigate('/company-list');
      } else {
        url = "/company/create";
         await fetchWrapper.post(url, formData);
         reset();  
      navigate('/company-list');
      }
      
      
       
      
    } catch (error) {
      console.error('Error creating company:', error);
      // Handle error state or show error message to user
    }
  };
  

  return (
    <div className="max-w-[900px] bg-blue-300 p-5 rounded-xl shadow-lg shadow-black-400">
      <Title>Create Company</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
        {/* <FileInput
            label="Image"
            name="image"
            register={register}
            control={control}
            error={errors.image}
            setBase64Logo={setBase64Logo}
            base64Logo={base64Logo}
            id="image"
            required={true}
          /> */}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <TextInput
            label="Name"
            register={register}
            error={errors.name}
            className="max-w-96 w-full px-2"
            type="text"
            name={'name'}
            placeholder="Company name"
          />
          <TextInput
            label={"Address :"}
            register={register}
            placeholder="address"
            type={"text"}
            name="address"
            className="max-w-96 w-full"
            error={errors.address}
          />
          <TextInput
            label={"Phone"}
            register={register}
            type={"phone"}
            placeholder="Phone Number"
            className="max-w-96 w-full"
            name="phone"
            error={errors.phone}
          />
        </div>
        <div className="btnDiv justify-end">
        <button className="button" type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreateCompany;
