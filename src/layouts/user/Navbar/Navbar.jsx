import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "./navlink";
import logo from "./../../../assets/BRKK.svg";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const location = useLocation();
  const { cartItems } = useSelector((state) => state.myProduct);
  const navigate = useNavigate()

  return (
    <nav className="shadow-md sticky top-0 z-[200] bg-white">
      <header className="h-24  flex justify-items-center items-center justify-between container mx-auto">
      <div className="">
        <img src={logo} alt="Logo" className="h-16 w-16" />
      </div>
      <div>
        {navLinks.map((item, i) => (
          <Link
            key={i}
            className={`bg-black-400 px-4 py-2 mx-2 rounded-lg hover:bg-blue-600 hover:text-white ${
              location.pathname === item.to ? "text-white bg-black-500" : ""
            }`}
            to={item.to}
          >
            {item.text}
          </Link>
        ))}
      </div>
      <div className="flex items-center ">
      <button onClick={()=>navigate('/product')} className='relative'>
             <div  className='absolute text-xl -top-4 left-2' >{cartItems?.length}</div>
             <Icon className='h-8 w-8 mx-4' icon={'heroicons:shopping-cart'}/>
      </button>
      <Link to={'/login'} className="bg-black-400 px-4 py-2 mx-2 rounded-lg hover:bg-blue-600 hover:text-white">
        logIn
      </Link>
      </div>
    </header>
    </nav>
  );
};

export default Navbar;
