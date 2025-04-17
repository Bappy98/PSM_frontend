// hooks/useRole.js
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { selectCurrentToken } from "@/store/api/auth/authSlice";

const useRole = () => {
  const token = useSelector(selectCurrentToken);
  const userType = token ? jwtDecode(token).user?.userType : null;

  const isLoading = false; // You may adjust this based on your actual loading state logic
  const error = null; // You may adjust this based on your actual error handling logic

  return {
    userType,
    isLoading,
    error,
  };
};

export default useRole;