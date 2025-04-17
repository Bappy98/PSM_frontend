// // pages/auth/Login.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../components/ui/TextInput";
import { useLoginMutation } from "../../store/api/auth/authApiSlice";
import { setUser } from "../../store/api/auth/authSlice";
import { getUser } from "./../../store/api/user/userSlice";
import image from './../../assets/psm-home.jpg';

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const userData = await login(data).unwrap();
      console.log(data);
      
      dispatch(setUser({
        accessToken: userData?.token,
        user_id: userData?._id,
        userType: userData?.userType
      }));
      dispatch(getUser({ user_id: userData._id, userType: userData.userType }));
      localStorage.setItem("auth", JSON.stringify({
        accessToken: userData?.token,
        user_id: userData._id,
        userType: userData.userType
      }));
      
      // Redirect to the appropriate page after login
      navigate('/customerHome'); // Adjust this path as needed
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-[#9dc9e7] min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img src={image} alt="Login Illustration" className="object-cover h-full w-full" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold">Login</h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div>
              <TextInput
                name="email"
                label="Email"
                type="email"
                defaultValue=""
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                register={register}
                error={errors.email}
              />
            </div>

            {/* Password Input */}
            <div>
              <TextInput
                name="password"
                label="Password"
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
                placeholder="Enter your password"
                register={register}
                error={errors.password}
                autoComplete="current-password"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-center">
                {error.data?.message || "Login failed. Please try again."}
              </div>
            )}
          </form>
          <div className="flex justify-between mt-2">
          <div className="text-lg">Don't have an account?</div>
          <div onClick={()=>navigate('/register')} className="font-semibold text-lg cursor-pointer">Register</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
