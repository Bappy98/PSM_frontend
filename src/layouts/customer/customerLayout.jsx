import { logo } from '@/assets'
import Profile from '@/components/shared/Profile'
import { branchNav, customerNav } from '@/data/data'
import { logOut, selectCurrentToken, selectCurrentUser } from '@/store/api/auth/authSlice'
import { getUser } from '@/store/api/user/userSlice'
import { Icon } from '@iconify/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

function CustomerLayout() {
    const [open,setOpen] = React.useState(false)
    const location = useLocation();
    const navigate = useNavigate()
    // Replace with dynamic user name
    const dispatch = useDispatch();
    const userId = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)
    const { user, loading, error } = useSelector((state) => state.user);
   // console.log(user);
    const clickHandle = () =>{
      if(token){
        navigate('/myProduct')
      }
      else {
        navigate("/product")
      }
    }
    React.useEffect(()=>{
      if(userId) {
        dispatch(getUser({user_id:userId}))
      }
    },[dispatch,userId])
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
  const { cartItems } = useSelector((state) => state.myProduct);
  return (
    <div>
      <nav className="bg-blue-200">
      <header className="h-24  flex justify-items-center items-center justify-between container mx-auto">
      <div className="">
        <img src={logo} alt="Logo" className="h-16 w-16" />
      </div>
      <div>
        {customerNav.map((item, i) => (
          <Link
            key={i}
            className={`bg-black-400 px-4 py-2 mx-2 rounded-lg hover:bg-blue-600 hover:text-white ${
              location.pathname === item.to ? "text-white bg-black-500" : ""
            }`}
            to={item.link}
          >
            {item.name}
          </Link>
        ))}
      </div>
              <div className="flex text-white items-center relative">
           <button onClick={clickHandle} className='relative'>
             <div  className='absolute text-xl -top-4 left-2' >{cartItems?.length}</div>
             <Icon className='h-8 w-8 mx-4' icon={'heroicons:shopping-cart'}/>
      </button>
            <button className="flex justify-center items-center" onClick={()=>setOpen(!open)}> <Profile/> <div>{user?.name}</div></button>
            <div className={`absolute bg-black-100 right-2  px-4 py-4 text-black-500 rounded-lg top-12 z-50 ${open?'block':'hidden'}`}>
            <div className='grid '>
            <Link>Profile</Link>
             <button onClick={()=>{
               handleLogOut()
             }}>LogOut</button>
            </div>
            </div>
            </div>
           
    </header>
    </nav>
    <div className=''>
    <Outlet/>
    </div>
    </div>
    
  )
}

export default CustomerLayout