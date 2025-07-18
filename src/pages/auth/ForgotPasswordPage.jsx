// src/pages/ForgotPasswordPage.jsx

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle forgot password API call here
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center px-4 py-10 loginpage">
      <div className="w-full max-w-md p-6 rounded-xl shadow-md backdrop-blur-3xl outline outline-amber-50 bg-[#ffffff] /80">
        {/* Header */}
        <div className="flex flex-col items-center space-y-1 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">CraftConnect</h1>
          <p className="text-gray-600">Forgot your password?</p>
          <p className="text-gray-600 text-sm text-center">
            Enter your email address below and we will send you a link to reset
            your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#4b158d] text-white font-medium hover:bg-[#aa47bc] transition"
          >
            Send Reset Link
          </button>

          {/* Back to login */}
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className=" text-[#4b158d] font-medium hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
