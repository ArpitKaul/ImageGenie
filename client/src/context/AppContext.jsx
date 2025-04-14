import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AppContextProvider = (props) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [credit, setCredit] = useState(false);

    const navigate = useNavigate()

    const gradients = [
        { bg: "bg-[radial-gradient(circle_at_top,#25094a,#05000b)]", text: "text-white", border: "border-gray-40" },
        { bg: "bg-gradient-to-r from-blue-500 to-purple-500", text: "text-white", border: "border-blue-300" }, 
        { bg: "bg-gradient-to-r from-red-500 to-orange-500", text: "text-white", border: "border-red-300" }, 
        { bg: "bg-gradient-to-r from-green-500 to-teal-500", text: "text-black", border: "border-green-400" }, 
        { bg: "bg-gradient-to-r from-yellow-400 to-orange-600", text: "text-black", border: "border-yellow-500" } 
    ];

    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("selectedTheme");
        return storedTheme ? JSON.parse(storedTheme) : gradients[0];
    });

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("selectedTheme", JSON.stringify(newTheme));
    };

    useEffect(() => {
        document.body.className = theme.bg;
    }, [theme]);

    const loadCreditData = async ()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/user/credits', {headers: {token}})

            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch(error){
            console.log(error)
             toast.error(error.message)
        }
    }

    const generateImage = async (prompt)=>{
        try{
            const {data} = await axios.post(backendUrl + '/api/image/generate-image' , {prompt} , {headers: {token}})

            if(data.success){
                loadCreditData()
                return data.resultImage
            }else{
                toast.error(data.message)
                loadCreditData()
                if(data.creditBalance === 0 ){
                    navigate('/buy')
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = ()=>{
        // console.log('logout');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    }

    useEffect(()=>{
        if(token){
            loadCreditData()
        }
    },[token])

    

    const value = {
        user, setUser,
        showLogin, setShowLogin,
        theme, changeTheme, gradients, backendUrl, token, setToken, credit, setCredit , loadCreditData , logout , generateImage
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
