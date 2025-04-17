import { Link, Outlet, useNavigate } from "react-router-dom";
import { branchNav, ProfileNav } from "../../data/data";
import { logo } from "../../assets";
import * as React from "react";
import Profile from "../../components/shared/Profile";
import { logOut, selectCurrentToken, selectCurrentUser, selectCurrentUserType } from "../../store/api/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/store/api/user/userSlice";

function BranchUserLayout() {
  const [open,setOpen] = React.useState(false)
  const navigate = useNavigate()
  // Replace with dynamic user name
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.clear();
    dispatch(
      logOut({
        accessToken: null,
        user_id: null,
      })
    );
    navigate('/')
  };
  const userId = useSelector(selectCurrentUser)
  const { user, loading, error } = useSelector((state) => state.user);
 // console.log(user);
  
  React.useEffect(()=>{
    if(userId) {
      dispatch(getUser({user_id:userId}))
    }
  },[dispatch,userId])
  return (
    <div>
      <div className="bg-[#a98ae2]">
        <div className="container mx-auto flex justify-between h-24 w-full">
          <div className="items-center flex h-full">
            <img src={logo} alt="" className="h-16 w-16" />
          </div>
          <div className="flex">
            {branchNav.map((item, i) => (
              <Link
                to={item.link}
                key={i}
                className="text-2xl flex items-center hover:bg-black-500 my-6 text-white mx-2 rounded-xl px-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="h-full flex items-center justify-center ">
           <div className="flex text-white items-center relative">
           <button className="flex justify-center items-center" onClick={()=>setOpen(!open)}> <Profile/> <div>{user?.name}</div></button>
           <div className={`absolute bg-black-100  px-4 py-4 text-black-500 rounded-lg top-12 z-50 ${open?'block':'hidden'}`}>
            <Link>Profile</Link>
            <button onClick={()=>{
              handleLogOut()
            }}>LogOut</button>
           </div>
           </div>
          </div>
          
          <div>

          </div>
        </div>
      </div>
       <Outlet/>
    </div>
  );
}

export default BranchUserLayout;
