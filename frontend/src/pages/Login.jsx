import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.svg";
import {loginAPICall} from "../api";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const token = localStorage.getItem("token")
    useEffect(() => {
        if (token !== null) {
            navigate("/home")
        }
    }, [navigate, token]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value) setEmailError("");
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value) setPasswordError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;

        if (!email) {
            setEmailError("Can't be empty");
            valid = false;
        }

        if (!password) {
            setPasswordError("Can't be empty");
            valid = false;
        }

        if (valid) {
            // Perform your login logic here
            // For demonstration, navigate to home
            loginAPICall({username: email, password: password}).then(
                res => {
                    localStorage.setItem("token", res.token)
                    navigate("/home");
                }
            ).catch(e => {
                console.log(e)
            })
        }
    };

    return (
        <main className="flex h-screen w-full flex-col items-center justify-center gap-20 ">
            <img src={logo} alt="logo" className="h-10 w-12"/>
            <div className="w-72 rounded-lg bg-col-light p-6 sm:w-96">
                <h2 className="mb-6 text-2xl text-white">Login</h2>
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    {/* Email field */}
                    <div className="relative flex flex-row-reverse">
                        <input
                            className={`w-full text-white/75 bg-transparent outline-none border-b-2 pb-2 border-opacity-20 focus:border-opacity-70 placeholder:text-col-icons focus:placeholder:text-white focus:placeholder:text-opacity-60 placeholder:pl-2 ${
                                emailError
                                    ? "border-b-col-red border-opacity-80"
                                    : " border-b-white"
                            }`}
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Email"
                        />
                        {emailError && (
                            <span className="absolute text-red-500 text-sm">
                {emailError}
              </span>
                        )}
                    </div>

                    {/* Password field */}
                    <div className="relative flex flex-row-reverse">
                        <input
                            className={`w-full text-white/75 bg-transparent outline-none border-b-2 pb-2 border-opacity-20 focus:border-opacity-70 placeholder:text-col-icons focus:placeholder:text-white focus:placeholder:text-opacity-60 placeholder:pl-2 ${
                                passwordError
                                    ? "border-b-col-red border-opacity-80"
                                    : " border-b-white"
                            }`}
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                        />
                        {passwordError && (
                            <span className="absolute text-red-500 text-sm">
                {passwordError}
              </span>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full  cursor-pointer rounded-lg bg-col-red px-4 py-2 text-white outline-none hover:bg-white hover:text-black"
                    >
                        Login to your account
                    </button>

                    {/* Sign up link */}
                    <h3 className="mx-auto text-base text-white text-opacity-75">
                        Don't have an account?{" "}
                        <span
                            className="cursor-pointer text-col-red"
                            onClick={() => navigate("/register")}
                        >
              Sign Up
            </span>
                    </h3>
                </form>
            </div>
        </main>
    );
};

export default Login;
