import React from "react";
import { useForm } from "react-hook-form";

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0c0c0c] px-4">
      <div className="w-full max-w-md bg-[#181818] rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col items-center space-y-2 mb-6">
          <div className="text-3xl font-bold text-white">CraftConnect</div>
          <div className="text-gray-400">Forgot your password?</div>
          <p className="text-gray-500 text-sm text-center">
            Enter your email address below and we will send you a link to reset
            your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-yellow-400 text-black font-semibold hover:opacity-90 transition"
          >
            Send Reset Link
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Remember your password?{" "}
              <a href="/login" className="text-[#4ade80] hover:underline">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
