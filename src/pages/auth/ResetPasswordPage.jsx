import React from "react";
import { useForm } from "react-hook-form";

 function ResetPasswordPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);
  const password = watch("password");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0c0c0c] px-4">
      <div className="w-full max-w-md bg-[#181818] rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col items-center space-y-2 mb-6">
          <div className="text-3xl font-bold text-white">CraftConnect</div>
          <div className="text-gray-400">Reset your password</div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Email</label>
            <input type="email" {...register("email", { required: "Email is required" })} placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-1  gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">New Password</label>
              <input type="password" {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum 8 characters" } })} placeholder="********" className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]" />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Confirm Password</label>
              <input type="password" {...register("confirmPassword", { required: "Please confirm your password", validate: (value) => value === password || "Passwords do not match" })} placeholder="********" className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]" />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-yellow-400 text-black font-semibold hover:opacity-90 transition">Reset Password</button>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">Remember your password? <a href="/login" className="text-[#4ade80] hover:underline">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}


export default ResetPasswordPage