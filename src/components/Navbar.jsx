import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-black">
        <span className="font-extrabold text-3xl text-black">Trendigo</span>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["HOME", "COLLECTIONS", "CONTACT"].map((item, index) => (
          <NavLink
            key={index}
            to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? "text-black font-bold" : ""}`
            }
          >
            <p>{item}</p>
            {({ isActive }) =>
              isActive ? (
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />
              ) : null
            }
          </NavLink>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Orders Link (Text Only) */}
        <Link to="/orders" className="text-sm text-gray-700 hover:text-black">
          Orders
        </Link>

        {/* Profile Dropdown */}
        <div className="relative group">
          <Link to="/login">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="Profile"
            />
          </Link>
          <div className="hidden group-hover:block absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md z-50">
            <div className="flex flex-col gap-2 py-3 px-5 text-gray-500">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <Link to="/orders">
                <p className="cursor-pointer hover:text-black">Orders</p>
              </Link>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        {/* Cart Icon with Counter */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="Cart" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Button */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Mobile Sidebar */}
      {visible && (
        <div className="fixed inset-0 bg-white transition-transform w-full z-50">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="Back"
            />
            <p>Back</p>
          </div>

          {/* Mobile Menu Items */}
          <ul className="flex flex-col items-start pl-6 text-gray-600 text-lg gap-4">
            {["HOME", "COLLECTIONS", "CONTACT"].map((item, index) => (
              <NavLink
                key={index}
                to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-brown font-medium py-2 pl-6 border"
                    : "py-2 pl-6 border"
                }
              >
                {item}
              </NavLink>
            ))}
            {/* Orders Link in Mobile Menu */}
            <NavLink
              to="/orders"
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
            >
              Orders
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
