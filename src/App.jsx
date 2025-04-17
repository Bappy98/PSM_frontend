import AcceptedOrderModal from "@/components/modal/AcceptedOrderModal"
import RequireAuth from "@/components/RequireAuth"
import Loading from "@/components/shared/Loading"
import { ROLES } from "@/data/data"
import CustomerLayout from "@/layouts/customer/customerLayout"
import Layout from "@/layouts/dashboard/Layout"
import UserLayout from "@/layouts/user/UserLayout"
import Dashboard from "@/pages/admin/dashboard/Dashboard"
import MedicineRequest from "@/pages/admin/medicineReq"
import OrderList from "@/pages/admin/orderReq"
import Stock from "@/pages/admin/stock"
import Users from "@/pages/admin/users"
import Login from "@/pages/auth/Login"
import Register from "@/pages/auth/Register"
import BranchList from "@/pages/branch/BranchList"
import Checkout from "@/pages/BranchPages/checkout"
import BranchHome from "@/pages/BranchPages/home"
import Sell from "@/pages/BranchPages/sell"
import BranchStore from "@/pages/BranchPages/store"
import BranchRegister from "@/pages/branchRegister"
import CashMemo from "@/pages/cashMemo"
import CompanyCreate from "@/pages/company"
import CompanyList from "@/pages/company/CompanyList"
import BranchCreate from "@/pages/CreateBranch"
import MyOrder from "@/pages/customer/myOrder"
import SingleOrder from "@/pages/customer/myOrder/SingleOrder"
import Product from "@/pages/customer/myProducs"
import OrderProduct from "@/pages/customer/orderProduct"
import MedicineCreate from "@/pages/medicine"
import MedicineEdit from "@/pages/medicine/MedicineEdit"
import MedicineList from "@/pages/medicine/MedicineList"
import Payment from "@/pages/payment"
import AllMedicine from "@/pages/public/medicine"
import Home from "@/pages/user/home"
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {
  return (
   <div className="font-sans">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserLayout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/medicine' element={<AllMedicine/>}/>
        <Route path="/product" element={<Product/>}/>
        {/* <Route path="/contact" element={}/> */}
        <Route path="*" element={<Home />} />
      </Route>
      <Route path='/' element={<Layout/>}>
      <Route
        element={
          <RequireAuth allowedRoles={[ROLES.BRANCH]}/>
        }
      />
        <Route path='/branch' element={<Dashboard/>}/>
        <Route path='/branchStore' element={<BranchStore/>}/>
        <Route path='/sell' element={<Sell/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/cash-memo' element={<CashMemo/>}/>
      </Route>
      <Route path='/' element={<Layout/>}>
      <Route
      element={
        <RequireAuth allowedRoles={[ROLES.SUPER_ADMIN]}/>
      }
      />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/stock-dashboard' element={<Stock/>}/>
      <Route path='/branch-register' element={<BranchRegister/>}/>
      <Route path='/branch-create' element={<BranchCreate/>}/>
      <Route path='/company-create' element={<CompanyCreate/>}/>
      <Route path='/company-list' element={<CompanyList/>}/>
      <Route path='/medicine-edit/:id' element={<MedicineEdit/>}/>
      <Route path='/medicine-create' element={<MedicineCreate/>}/>
      <Route path='/medicine-list' element={<MedicineList/>}/>
      <Route path='/branches' element={<BranchList/>}/>
      <Route path='/medicine-req' element={<MedicineRequest/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/order-list' element={<OrderList/>}/>
      {/* <Route path='/loading' element={<Loading/>} /> */}
      <Route path='/order-status' element={<AcceptedOrderModal/>} />
      
      </Route>
      <Route path="/" element={<CustomerLayout/>}>
        <Route
        element={
          <RequireAuth allowedRoles={[ROLES.USER]}/>
        }
        />
        <Route path="/customerHome" element={<Home/>}/>
        <Route path="/allMedicine" element={<AllMedicine/>}/>
        
        <Route path="/myProduct" element={<Product/>}/>
        <Route path="/order-product" element={<OrderProduct/>}/>
        <Route path="/payment" element=<Payment/> />
        <Route path='/my-order' element={<MyOrder/>}/>
        <Route path="/single-order" element={<SingleOrder/>} />
      </Route>
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App