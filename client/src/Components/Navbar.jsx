import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
    const { user, setUser, setToken, setShowLogin, changeTheme, gradients, logout, credit  } = useContext(AppContext);
    const navigate = useNavigate();
    
    const [showColors, setShowColors] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const colorPickerRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColors(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="flex items-center justify-between py-4 px-4">
            <div className="flex cursor-pointer">
                <img src={assets.logo_icon} alt="" />
            <Link to="/">
                <h1 className="text-white text-lg font-semibold ml-3">Img.AI</h1>
            </Link>
            </div>

            <div className="relative flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => navigate("/buy")} 
                            className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full hover:scale-105 transition-transform"
                        >
                            <img className="w-5" src={assets.credit_star} alt="Credit" />
                            <p className="text-sm font-medium text-black">
                                Credit left: {credit}
                            </p>
                        </button>

                        <p className="text-gray-100 hidden sm:block cursor-pointer">Hi, {user.name}</p>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <img 
                                src={assets.profile_icon} 
                                className="w-10 cursor-pointer" 
                                alt="Profile"
                                onClick={() => setShowDropdown((prev) => !prev)} 
                            />
                            {showDropdown && (
                                <div className="absolute top-12 right-0 z-10 bg-white rounded-md shadow-lg border text-sm">
                                    <ul className="list-none m-0 p-2">
                                        <li 
                                            className="py-2 px-4 cursor-pointer hover:bg-gray-100" 
                                            onClick={logout}
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <p className="text-white cursor-pointer">About</p>

                        {/* Theme Picker */}
                        <div className="relative" ref={colorPickerRef}>
                            <img 
                                className="w-6 cursor-pointer" 
                                src={assets.color} 
                                alt="Color Palette" 
                                onClick={() => setShowColors((prev) => !prev)} 
                            />
                            {showColors && (
                                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 p-2 bg-white rounded-lg shadow-md flex gap-2">
                                    {gradients.map((gradient, index) => (
                                        <div 
                                            key={index} 
                                            className={`w-8 h-8 rounded-full cursor-pointer border ${gradient.bg}`}
                                            onClick={() => changeTheme(gradient)}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <p 
                            onClick={() => navigate("/buy")} 
                            className="cursor-pointer text-white"
                        >
                            Pricing
                        </p>
                        <button 
                            onClick={() => setShowLogin(true)} 
                            className="bg-purple-600 text-white px-6 py-2 text-sm rounded-full cursor-pointer"
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
