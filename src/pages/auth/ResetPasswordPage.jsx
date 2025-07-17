// src/pages/ResetPasswordPage.jsx

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);
    // Handle reset password API logic here
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center px-4 py-10 loginpage">
      <div className="w-full max-w-md p-6 rounded-xl shadow-md backdrop-blur-3xl outline outline-amber-50 bg-[#ffffff] /80">
        {/* Header */}
        <div className="flex flex-col items-center space-y-1 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">CraftConnect</h1>
          <p className="text-gray-600">Reset your password</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
         

          {/* New Password & Confirm Password */}
          <div className="grid grid-cols-1  gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                })}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#4b158d] text-white font-medium hover:bg-[#aa47bc] transition"
          >
            Reset Password
          </button>

          {/* Link to login */}
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
