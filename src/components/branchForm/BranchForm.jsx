import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "@/store/api/users/usersSlice";
import fetchWrapper from "@/util/fetchWrapper";
import TextInput from "@/components/ui/TextInput";
import FileInput from "@/components/ui/FileInput";
import Title from "@/components/title/Title";
import Select from "@/components/ui/Select";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required().label("Name"),
    address: yup.string().required().label("Address"),
    phone: yup.string().required().label("Phone"),
    logo: yup.mixed().required("Logo is required"),
  })
  .required();

function BranchForm() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [base64Logo, setBase64Logo] = useState(null);
  const [name, setName] = useState([]);
  const navigate = useNavigate()

  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [dispatch]);
  // console.log(users.data);
  useEffect(() => {
    if (users) {
      setName(users.map((user) => user.name));
    }
  }, [users]);

   console.log(name);

  console.log(users);
  

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      logo: base64Logo,
    };
    console.log(formData);
    try {
      const res = await fetchWrapper.post("/branch/create", formData);
      navigate('/branches')
      reset();
      setBase64Logo(null);
    } catch (error) {}
  };

  return (
    <div className="max-w-[900px] bg-[#7acdee] p-5 rounded-xl shadow-lg shadow-black-400">
      <Title>Branch Create</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <FileInput
            label="Logo"
            name="logo"
            register={register}
            control={control}
            error={errors.logo}
            setBase64Logo={setBase64Logo}
            base64Logo={base64Logo}
            id="logo"
            required={true}
          />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <Select
            label="Name"
            defaultValue=""
            options={name}
            name="name"
            register={register}
            error={errors.name}
            placeholder="Select Branch name"
            className="max-w-96 w-full"
          />
          <TextInput
            label="Address"
            register={register}
            placeholder="Address"
            className="max-w-96 w-full"
            type="text"
            name="address"
            error={errors.address}
          />
          <TextInput
            label="Phone"
            register={register}
            type="text"
            placeholder="Phone Number"
            className="max-w-96 w-full"
            name="phone"
            error={errors.phone}
          />
        </div>
        <div className="btnDiv justify-end">
        <button className="button" type='submit'>Branch Create</button>
        </div>
      </form>
    </div>
  );
}

export default BranchForm;
