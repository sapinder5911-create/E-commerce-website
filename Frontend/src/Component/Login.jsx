

import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const hello = async (data) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/login",
                data,
                { withCredentials: true }
            );

            setMessage(res.data.message);
            const role = res.data.role;
            const token = res.data.token;

            localStorage.setItem("role", role);
            localStorage.setItem("token", token);

            reset();
            navigate("/shop");
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="h-160 w-full flex flex-col md:flex-row bg-cover bg-center bg-no-repeat bg-[url('https://images.pexels.com/photos/1931143/pexels-photo-1931143.jpeg')]">

            {/* LEFT TEXT SECTION */}
            <motion.div className="md:w-1/2 flex  p-10 text-black "
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            
            >
                <div className="h-10 w-200">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight ml-60  mt-30 flex">
                        Make Your Home a  Greener Place
                    </h1>
                   
                </div>
            </motion.div>

            {/* RIGHT FORM SECTION */}
            <motion.div className="md:w-1/2 flex items-center justify-center p-6"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            
            >
                <form
                    onSubmit={handleSubmit(hello)}
                    className="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-5"
                >
                    <h2 className="text-2xl font-semibold text-center mb-2">
                        Login
                    </h2>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium">
                            Enter Your Email Address
                        </label>
                        <input
                            className="p-3 border rounded-lg focus:outline-none focus:ring-1 "
                            {...register("Email", {
                                required: "Email is required",
                                pattern: {
                                    message: "Invalid email format",
                                },
                            })}
                            placeholder="Enter your Email"
                            type="email"
                            autoComplete="email"
                        />
                        {errors.Email && (
                            <p className="text-red-500 text-sm">
                                {errors.Email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium">
                            Enter Your Password
                        </label>
                        <input
                            className="p-3 border rounded-lg focus:outline-none focus:ring-1 "
                            {...register("Password", {
                                required: "Password is required",
                            })}
                            placeholder="Enter your password"
                            type="password"
                            disabled={isSubmitting}
                        />
                        {errors.Password && (
                            <p className="text-red-500 text-sm">
                                {errors.Password.message}
                            </p>
                        )}
                    </div>

                    {/* Message */}
                    {message && (
                        <p className="text-center text-sm text-blue-600">
                            {message}
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-between gap-4 mt-3">
                        <Link
                            to="/"
                            className="flex-1 text-center focus:outline-none   text-white py-2 rounded-xl focus:ring-pink-600 transition"
                        >
                            Back
                        </Link>

                        <button
                            type="submit"
                            className="flex-1 bg-pink-700 text-black py-2 rounded-xl hover:border-pink-800 transition border border-black"
                        >
                            {isSubmitting ? "Joining..." : "Join"}
                        </button>
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-sm mt-2">
                        Not registered?{" "}
                        <Link
                            to="/register"
                            className="text-pink-700 font-semibold hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}

export default Login;