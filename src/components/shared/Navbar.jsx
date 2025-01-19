import React from "react";
import { Link } from "react-router-dom";
import logo from "/logo.png";
const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 max-w-6xl mx-auto px-4 py-2 shadow-md w-full bg-navBg border border-gray-200 rounded-lg flex flex-row items-center justify-between">
      <div className="flex justify-center items-center">
        <Link to="/">
          <img src={logo} alt='logo' className='w-25 h-10' />
         
        </Link>
      </div>
      <div>
        <ul className="flex flex-row items-center text-gray-700">
          <li className="text-base px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer">
            <Link to="/login">Login</Link>
          </li>
          <li className=" text-base px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer">
            <Link to="/register">Register</Link>
          </li>
          <li className="text-base px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer">
            <a href="https://github.com/alpha-154" target="_blank">
              Join As Developer
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
