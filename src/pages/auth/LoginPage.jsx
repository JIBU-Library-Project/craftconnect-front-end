// src/pages/Login.jsx

import React from "react";
import { useForm } from "react-hook-form";

 function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Add your API call or authentication logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0c0c0c] px-4">
      <div className="w-full max-w-md bg-[#181818] rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col items-center space-y-2 mb-8">
          <div className="text-3xl font-bold text-white">CraftConnect</div>
          <div className="text-gray-400">Login with your credentials</div>
          <div className="text-sm text-gray-600">Glad to have you back!</div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-gray-400 text-sm" htmlFor="password">
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-[#4ade80] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-yellow-400 text-black font-semibold hover:opacity-90 transition"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Don’t have an account?{' '}
            <a href="/signup" className="text-[#4ade80] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}


export default LoginPage