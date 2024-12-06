"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FirebaseError } from "firebase/app";

interface SignUpFormInputs {
    username: string;
    email: string;
    password: string;
}

export default function SignUpPage() {
    const { register, handleSubmit } = useForm<SignUpFormInputs>();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);


    const handleSignUp = async (data: SignUpFormInputs) => {
        try {
            setError(null);
            await createUserWithEmailAndPassword(auth, data.email, data.password)
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("username",data.username)
            router.push("/homepage")
        }
        catch (err: unknown) {
            if (err instanceof FirebaseError) {
                setError(err.message); 
                console.error("Firebase Error:", err.message);
            }
            else {
                setError("Failed to create account. Email may already be in use.");
                console.error("Sign-Up Error:", err);
            }  
        }
    };

  return (
    <div className="flex flex-col gap-4 w-full m-auto px-6 py-12 sm:px-10 sm:max-w-[45%] max-w-[85%] bg-gray-30 rounded-lg shadow-xl border">
        <form
            onSubmit={handleSubmit(handleSignUp)}
            className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md flex flex-col m-auto"
        >
            <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">User Name</label>
                <input 
                    type="username"
                    {...register("username", { required: true })}
                    placeholder="Enter your username"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                    onClick={() => setPasswordVisible(!passwordVisible)} 
                    className="absolute bottom-2 right-3 transform -translate-y-1/2 cursor-pointer"
                >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />} 
                </span>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Sign Up
            </button>
            <p className="text-gray-700 mt-4 text-center">
                Have an account?{" "}
                <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => router.push("/auth/login")}
                >
                    Log in
                </span>
            </p>
      </form>
    </div>
  );
}
