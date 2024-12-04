import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-between w-full mx-auto px-6 py-12 sm:px-10 sm:max-w-[45%] max-w-[85%] bg-white rounded-lg shadow-xl border">
      <div className="flex flex-col gap-4">
        <h1 className="mb-[80px] text-heading-3 text-gray-900">Login</h1>
        <form className="flex flex-col gap-[40px]">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-lg text-black border"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="p-3 rounded-lg text-black border"
          />
        </form>
      </div>
      <button className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-700">
        Login
      </button>    
    </div>
  );
};

export default LoginPage;

