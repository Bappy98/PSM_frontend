import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../ui/TextInput";
import FileInput from "../ui/FileInput";
import Button from "../Button/Button";
import Title from "../title/Title";
import fetchWrapper from "../../util/fetchWrapper";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  icon: yup.mixed().required("Logo is required"),
});

const DosagesForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const [base64Logo, setBase64Logo] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        icon: base64Logo,
      };
      console.log(formData);
      const res = await fetchWrapper.post("/dosages/create", formData);
      setBase64Logo(null);
      reset();
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  return (
    <div className="max-w-[900px] bg-blue-200">
      <Title>Dosage Create</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid  grid-cols-1 mx-5 gap-5">
          <FileInput
            label="icon"
            name="icon"
            register={register}
            control={control}
            error={errors}
            setBase64Logo={setBase64Logo}
            base64Logo={base64Logo}
            id="icon"
          />
          <TextInput
            label="Name"
            name="name"
            register={register}
            placeholder="Dosages name"
            error={errors.name}
            className="max-w-96 w-full"
          />
          <Button className="justify-start">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default DosagesForm;
