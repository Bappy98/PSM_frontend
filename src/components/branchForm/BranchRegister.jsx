import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Title from "@/components/title/Title";
import TextInput from "@/components/ui/TextInput";
import fetchWrapper from "@/util/fetchWrapper";
import { Navigate, useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email id Required"),
    name: yup.string().required().label("Name"),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match!"),
    userType: yup.string().required(),
  })
  .required();
function Register() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetchWrapper.post("/branch/register", data);
      navigate("/users");
      reset();
      successToast("successful");
    } catch (error) {
      errorToast("failed");
    }
  };

  return (
    <div className="max-w-[900px] bg-blue-200 rounded-xl shadow-lg shadow-black-400">
      <Title>Branch Register</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 grid-cols-1 mx-5 gap-5">
          <TextInput
            label={"Name :"}
            register={register}
            type={"text"}
            name="name"
            className="max-w-96 w-full"
            error={errors.name}
            placeholder="Enter Your Name"
          />
          <TextInput
            label={"Email :"}
            register={register}
            placeholder="email"
            className="max-w-96 w-full"
            type={"email"}
            name="email"
            error={errors.email}
          />
          <TextInput
            label={"Password :"}
            register={register}
            type={"password"}
            placeholder="password"
            className="max-w-96 w-full"
            name="password"
            error={errors.password}
          />
          <TextInput
            label={"Confirm Password :"}
            register={register}
            type={"password"}
            className="max-w-96 w-full"
            placeholder="password"
            name="confirmPassword"
            error={errors.confirmPassword}
          />
          <TextInput
            label={""}
            className="hidden"
            register={register}
            name="userType"
            defaultValue={"branch"}
          />
        </div>
        <div className="btnDiv justify-end">
          <button className="button" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
