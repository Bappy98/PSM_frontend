// // pages/auth/Register.js
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Title from "@/components/title/Title";
import TextInput from "@/components/ui/TextInput";
import fetchWrapper from "@/util/fetchWrapper";
import image from './../../assets/psm-home.jpg'; // Optional: Use the same image as Login or a different one

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    name: yup.string().required("Name is Required").label("Name"),
    password: yup.string().required("Password is Required").min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match!")
      .required("Confirm Password is Required"),
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
      navigate("/login");
      reset();
    } catch (error) {
      console.error("Registration error:", error);
      // Optionally, handle and display error messages to the user
    }
  };

  return (
    <div className="bg-[#9dc9e7] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Image Section (Optional) */}
        <div className="hidden md:block md:w-1/2">
          <img src={image} alt="Register Illustration" className="object-cover h-full w-full" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-6 text-center">
            <Title>Branch Register</Title>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Form Inputs */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <TextInput
                label="Name"
                register={register}
                type="text"
                name="name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Name"
                error={errors.name}
              />
              <TextInput
                label="Email"
                register={register}
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Email"
                error={errors.email}
              />
              <TextInput
                label="Password"
                register={register}
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Password"
                error={errors.password}
              />
              <TextInput
                label="Confirm Password"
                register={register}
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Your Password"
                error={errors.confirmPassword}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300 w-full md:w-auto"
              >
                Register
              </button>
            </div>

            {/* Optional: Display Error Messages */}
            {/* {error && (
              <div className="text-red-500 text-center">
                {error.data?.message || "Registration failed. Please try again."}
              </div>
            )} */}
          </form>
          <div className="flex justify-between mt-2">
          <div className="text-lg">Already have an account?</div>
          <div onClick={()=>navigate('/login')} className="font-semibold text-lg cursor-pointer">logIn</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
