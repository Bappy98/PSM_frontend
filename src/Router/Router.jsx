//import BranchRoute from "@/authGard/BranchRoute";
//import PrivateRoute from "@/authGard/PrivateRoute";
//import PublicRoute from "@/authGard/PublicRoute";
//import BranchUserLayout from "@/layouts/branch/BranchUserLayout";
import Layout from "@/layouts/dashboard/Layout";
import UserLayout from "@/layouts/user/UserLayout";
import Dashboard from "@/pages/admin/dashboard/Dashboard";
import MedicineRequest from "@/pages/admin/medicineReq";
import Stock from "@/pages/admin/stock";
import Users from "@/pages/admin/users";
import Login from "@/pages/auth/Login";
import BranchList from "@/pages/branch/BranchList";
import Checkout from "@/pages/BranchPages/checkout";
import BranchHome from "@/pages/BranchPages/home";
import MedicineReq from "@/pages/BranchPages/medicineRequest";
import Sell from "@/pages/BranchPages/sell";
import BranchStore from "@/pages/BranchPages/store";
import BranchRegister from "@/pages/branchRegister";
import CashMemo from "@/pages/cashMemo";
import CompanyCreate from "@/pages/company";
import CompanyList from "@/pages/company/CompanyList";
import BranchCreate from "@/pages/CreateBranch";
import CreateDosages from "@/pages/dosages";
import CreateGeneric from "@/pages/generices";
import Homepage from "@/pages/home/Homepage";
import MedicineCreate from "@/pages/medicine";
import MedicineList from "@/pages/medicine/MedicineList";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    element: (
      <PublicRoute>
        <UserLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/stock-dashboard",
        element: <Stock />,
      },
      {
        path: "/branch-register",
        element: <BranchRegister />,
      },
      {
        path: "/branch-create",
        element: <BranchCreate />,
      },
      {
        path: "/company-create",
        element: <CompanyCreate />,
      },
      {
        path:'/company-list',
        element:<CompanyList/>
      },
      {
        path: "/medicine-create",
        element: <MedicineCreate />,
      },
      {
        path:"/medicine-list",
        element:<MedicineList/>
      },
      {
        path: "/branches",
        element: <BranchList />,
      },
      {
        path:"/medicine-req",
        element:<MedicineRequest/>
      },
      {
        path:"/users",
        element:<Users/>
      }
    ],
  },
  {
    element: (
      <PrivateRoute>
        <BranchUserLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/branch",
        element: <BranchHome />,
      },
      {
        path:"/branchStore",
        element:<BranchStore/>
      },
      // {
      //   path:'/checkout',
      //   element:<MedicineReq/>
      // },
      {
        path:'/sell',
        element:<Sell/>
      },
      {
        path:"/checkout",
        element:<Checkout/>
      },
      {
        path:'/cash-memo',
        element:<CashMemo/>
      }
    ],
  },
]);
