import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit , setCredit ] = useState(false)
    
   
    const gradients = [
        { bg: "bg-[radial-gradient(circle_at_top,#25094a,#05000b)]", text: "text-white", border: "border-gray-40" },
        { bg: "bg-gradient-to-r from-blue-500 to-purple-500", text: "text-white", border: "border-blue-300" }, 
        { bg: "bg-gradient-to-r from-red-500 to-orange-500", text: "text-white", border: "border-red-300" }, 
        { bg: "bg-gradient-to-r from-green-500 to-teal-500", text: "text-black", border: "border-green-400" }, 
        { bg: "bg-gradient-to-r from-yellow-400 to-orange-600", text: "text-black", border: "border-yellow-500" } 
    ];

    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("selectedTheme");
        console.log("Loaded theme from localStorage:", storedTheme);
        return storedTheme ? JSON.parse(storedTheme) : gradients[0]; 
    });

    const changeTheme = (newTheme) => {
        console.log("Changing theme to:", newTheme);
        setTheme(newTheme);
        localStorage.setItem("selectedTheme", JSON.stringify(newTheme)); 
    };

    useEffect(() => {
        console.log("Applying theme:", theme);
        document.body.className = theme.bg;
        console.log("Applied class:", document.body.className);
    }, [theme]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const value = {
        user, setUser,
        showLogin, setShowLogin,
        theme, changeTheme, gradients , backendUrl, token , setToken, credit , setCredit
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
