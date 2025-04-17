import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUserType } from "@/store/api/auth/authSlice";



const UserLayout = () => {
const token = useSelector(selectCurrentToken)
const role = useSelector(selectCurrentUserType)
let route;
  switch (role) {
    case 'superadmin':
      route = 'dashboard';
      break;
    case 'branch':
      route = 'branch';
      break;
    case 'user':
      route = 'customerHome'
      break;
    default:
      route = '/';
      break;
  }

  return (
    <div className="z-[100]">
    <Navbar/>
    <div className="min-h-screen">
    {token? <Navigate to={`/${route}`} replace/> : <Outlet/>}
    </div>
    </div>
  );
};

export default UserLayout;
