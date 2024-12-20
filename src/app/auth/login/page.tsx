"use client"

import React from 'react';
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginFormInputs } from "@/types/forms";
import { FirebaseError } from "firebase/app";


export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);



  const handleLogin = async (data: { email: string; password: string }) => {
    const { email, password } = data
    try {
      setError(null);
      console.log("Sending data to API:", { email, password }); 
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const json = await response.json()
      if (!response.ok) throw new Error(json.message)

      const { token } = json

      localStorage.setItem("token", token)

      console.log("User successfully logged in. Navigating to homepage...");
      router.push("/homepage")
    }
    catch (err: unknown) {
      setError((err as unknown as { message: string }).message);
      console.error("Login Error:", err);
    }
  };


  const handleForgotPassword = async (email: string) => {
    try {
      setError(null);
      console.log(email);
      
      alert("Password reset email sent!");
    }
    catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };


  return (
    <div className="flex flex-col gap-4 w-full m-auto px-6 py-12 sm:px-10 sm:max-w-[45%] max-w-[85%] bg-gray-30 rounded-lg shadow-xl border">
      <h1 className="mb-[60px] text-heading-3 text-gray-900">Login</h1>
      <form
        className="flex flex-col gap-[35px]"
        onSubmit={handleSubmit(handleLogin)}
      >
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div>
          <label className="block text-gray-700 text-heading-5 mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="p-3 rounded-lg text-black border w-full"
          />
        </div>

        <div className="relative">
          <label className="block text-gray-700 text-heading-5 mb-2">Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            {...register("password", { required: true })}
            placeholder="Enter your password"
            className="p-3 rounded-lg text-black border w-full"
          />
          <span
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute bottom-2 right-3 transform -translate-y-1/2 cursor-pointer"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type='submit'
          className="p-3 bg-gray-400 text-white rounded-xl hover:bg-gray-900"
        >
          Login
        </button>
        <p className="text-blue-500 cursor-pointer text-center" onClick={() => handleForgotPassword("user_email@example.com")}>
          Forgot Password?
        </p>
      </form>
    </div>
  );
};


