import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [state, setState] = useState("Login");
    const { setShowLogin, backendUrl, setToken, setUser ,token,showLogin} = useContext(AppContext);
    console.log(token)
    console.log(showLogin)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (state === "Login") {
                response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
            } else {
                response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
            }
            
            console.log()
            const { data } = response;
            console.log(data.success)

            if (data.success) {
                console.log("yes")
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setShowLogin(false);
                toast.success(`Welcome, ${data.user.name}!`);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-lg bg-black/40 flex justify-center items-center">
            <motion.form
                onSubmit={onSubmitHandler}
                className="relative bg-gradient-to-br from-purple-600 p-10 rounded-2xl text-white shadow-3xl border border-purple-600 w-[350px] backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-center text-3xl font-bold drop-shadow-lg">{state}</h1>
                <p className="text-sm text-center opacity-90">Welcome back! Please sign in to continue</p>

                {state !== "Login" && (
                    <div className="flex items-center gap-2 bg-white/20 rounded-full mt-5 px-4 py-2">
                        <img src={assets.user_icon} alt="" className="w-5 opacity-80" />
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="outline-none bg-transparent w-full text-white placeholder-white/70"
                            type="text"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                )}

                <div className="flex items-center gap-2 bg-white/20 rounded-full mt-5 px-4 py-2">
                    <img src={assets.email_icon} alt="" className="w-5 opacity-80" />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="outline-none bg-transparent w-full text-white placeholder-white/70"
                        type="email"
                        placeholder="Email ID"
                        required
                    />
                </div>

                <div className="flex items-center gap-2 bg-white/20 rounded-full mt-5 px-4 py-2">
                    <img src={assets.lock_icon} alt="" className="w-5 opacity-80" />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="outline-none bg-transparent w-full text-white placeholder-white/70"
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>

                <p className="text-sm text-white/80 mt-3 cursor-pointer text-center hover:text-white">Forgot password?</p>
                <button className="mt-5 bg-white/30 hover:bg-white/50 transition-all duration-300 w-full py-2 rounded-full font-semibold text-white">
                    {state === "Login" ? "Login" : "Create Account"}
                </button>

                {state === "Login" ? (
                    <p className="mt-5 text-center text-white/80">
                        Don't have an account?
                        <span className="text-white cursor-pointer hover:underline" onClick={() => setState("Sign Up")}> Sign up</span>
                    </p>
                ) : (
                    <p className="mt-5 text-center text-white/80">
                        Already have an account?
                        <span className="text-white cursor-pointer hover:underline" onClick={() => setState("Login")}> Login</span>
                    </p>
                )}

                <img
                    onClick={() => setShowLogin(false)}
                    className="absolute top-5 right-5 cursor-pointer w-6 opacity-80 hover:opacity-100 transition-opacity duration-200 text-white"
                    src={assets.cross_icon}
                    alt="Close"
                />
            </motion.form>
        </div>
    );
};

export default Login;