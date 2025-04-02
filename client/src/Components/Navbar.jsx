import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
    const { user, setUser, setToken, setShowLogin, changeTheme, gradients, theme } = useContext(AppContext);
    const navigate = useNavigate();
    
    const [showColors, setShowColors] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className={`flex items-center justify-between py-4`}>
            <Link to="/">
                <h1 className="text-white">Img.AI</h1>
            </Link>

            <div className="relative">
                {user ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button 
                            onClick={() => navigate("/buy")} 
                            className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
                        >
                            <img className="w-5" src={assets.credit_star} alt="Credit" />
                            <p className="text-xs sm:text-sm font-medium text-gray-600">
                                Credit left: {user.credits || 0}
                            </p>
                        </button>

                        <p className="text-gray-600 max-sm:hidden pl-4">Hi, {user.name}</p>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <img 
                                src={assets.profile_icon} 
                                className="w-10 drop-shadow-xl cursor-pointer" 
                                alt="Profile"
                                onClick={() => setShowDropdown(!showDropdown)} 
                            />
                            {showDropdown && (
                                <div className="absolute top-12 right-0 z-10 bg-white rounded-md shadow-lg border text-sm">
                                    <ul className="list-none m-0 p-2">
                                        <li className="py-2 px-4 cursor-pointer hover:bg-gray-100" onClick={handleLogout}>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 sm:gap-5">
                        <p className="text-white cursor-pointer">About</p>

                        {/* Theme Picker */}
                        <div className="relative">
                            <img 
                                className="w-6 cursor-pointer" 
                                src={assets.color} 
                                alt="Color Palette" 
                                onClick={() => setShowColors(!showColors)} 
                            />
                            {showColors && (
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 p-2 bg-white rounded-lg shadow-md flex gap-2">
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

                        <p onClick={() => navigate("/buy")} className="cursor-pointer text-white">
                            Pricing
                        </p>
                        <button 
                            onClick={() => setShowLogin(true)} 
                            className="bg-purple-600 text-white px-7 py-2 text-sm rounded-full cursor-pointer"
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
