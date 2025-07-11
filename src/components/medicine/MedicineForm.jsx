import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../ui/TextInput";
import Select from "../ui/Select";
import Title from "../title/Title";
import FileInput from "../ui/FileInput";
import * as yup from "yup";
import Button from "../Button/Button";
import fetchWrapper from "../../util/fetchWrapper";
import { useGetCompanyQuery } from "../../store/api/company/companyApiSlice";
import Textarea from "../ui/Textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMedicineQuery, useUpdateMedicineMutation } from "@/store/api/medicine/medicineApiSlice";
import { useDispatch } from "react-redux";

const schema = yup
  .object({
    name: yup.string().required().label("Name"),
    unitPrice: yup.number().required().label("Unit price"),
    type: yup.string().required().label("Type"),
    company: yup.string().required().label("Company"),
    generic: yup.string().required().label("Generic"),
    dosages: yup.string().required().label("Dosages"),
    description: yup.string().required(),
  })
  .required();

function MedicineForm({ initialData = null, isEdit = false }) {
  const {id} = useParams()
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues:initialData||{}
  });
 
  const { data: company, error, loading } = useGetCompanyQuery();
  const [companyOptions, setCompanyOptions] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
 console.log(company);
 
  useEffect(() => {
    if (company) {
      setCompanyOptions(company.map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      }));
    }
  }, [company]);
  console.log(companyOptions);
  

  useEffect(()=>{
    if(initialData) {
      reset({
        ...initialData,
        company:initialData.company._id,
      })
    
      //setBase64Logo(initialData.image)
    }
  },[initialData,reset])

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data
      };
      console.log("Submitting data:", formData);
      console.log(id);
      
  
      if(id ) {
        // Update an existing medicin
        
       const response = await fetchWrapper.put(`/medicine/${id}`, formData);
        console.log("Update response:", response);
        // const { data } = useGetMedicineQuery();
        navigate("/medicine-list");
      }
        // Create a new medicine
        const response = await fetchWrapper.post("/medicine/create", formData);
        console.log("Create response:", response);
        navigate("/medicine-list");
      
  
      
      reset();
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  

  return (
    <div className="max-w-[900px] bg-blue-300 rounded-xl shadow-lg shadow-black-400">
      <Title>{isEdit ? "Update" : "Add"} Medicine</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-5">
       
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 mx-5 gap-5">
          <TextInput
            label={"Name"}
            register={register}
            type={"text"}
            name="name"
            className="max-w-96 w-full"
            error={errors.name}
            placeholder="Enter Medicine Name"
          />
          <TextInput
            label={"Unit Price"}
            register={register}
            type={"number"}
            name="unitPrice"
            className="max-w-96 w-full"
            error={errors.unitPrice}
            placeholder="Unit Price"
          />
          <Select
            label={"Company"}
            defaultValue={companyOptions ? companyOptions?.value : ""}
            options={companyOptions}
            name="company"
            register={register}
            error={errors.company}
            placeholder="Select Company name"
            className="max-w-96 w-full mt-2"
          />
          <TextInput
            label={"Generic"}
            name="generic"
            register={register}
            error={errors.generic}
            placeholder="Generic name"
            className="max-w-96 w-full mt-2"
          />
          <TextInput
            label={"Dosages"}
            defaultValue={""}
            name="dosages"
            register={register}
            error={errors.dosages}
            placeholder="Select Dosages name"
            className="max-w-96 w-full mt-2"
          />
          <Select
            label={"Type"}
            defaultValue={""}
            options={[
              "Tablet",
              "Syrup",
              "Capsules",
              "Drops",
              "Inhalers",
              "Injections",
              "Implants or patches",
            ]}
            name="type"
            register={register}
            error={errors.type}
            placeholder="Select type"
            className="max-w-96 w-full mt-2"
          />
           <Textarea
            label={"Description :"}
            register={register}
            placeholder="description"
            className="max-w-96 mt-2 w-full"
            type={"text"}
            row={"5"}
            name="description"
            error={errors.description}
          />
        </div>
        <div className="btnDiv justify-end">
        <button className="button" type="submit">{id ? "Update" : "Create"}</button>
        </div>
      </form>
    </div>
  );
}

export default MedicineForm;
