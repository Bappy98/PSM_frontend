import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from '../Navbar/navlink';

const Sidebar = ({ showSidebar, closeSidebar }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div>
      {showSidebar && (
        <div className="fixed top-0 right-0 bottom-0 w-64 bg-gray-800 text-white p-4">
          {/* Close Icon */}
          <div className="flex justify-end">
            <button className="text-green-500" onClick={closeSidebar}>
         close
            </button>
          </div>
          {/* Sidebar Content */}
          <ul>
            {navLinks.map((link, index) => (
              <li
                key={index}
                
                className="my-4 hover:text-green-700 p-2 relative"
              >
                {link.showDropdown ? (
                  <div>
                    <span onClick={() => handleDropdownToggle(index)}>{link.text}</span>
                    <ul
                      className={
                        activeDropdown === index
                          ? "block bg-gray-800 text-white p-2"
                          : "hidden"
                      }
                    >
                      {link.dropdownLinks.map((subLink, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subLink.to}
                            className="block py-1 px-2 hover:bg-gray-700"
                          >
                            {subLink.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link to={link.to} className="block">
                    {link.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
