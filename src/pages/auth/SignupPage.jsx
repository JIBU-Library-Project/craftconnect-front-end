// src/pages/SignUp.jsx

import { useState } from "react";
import { useForm } from "react-hook-form";

function SignupPage() {
  const [role, setRole] = useState("User");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle registration API call here
  };

  const password = watch("password");
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0c0c0c] px-4">
      <div className="w-full max-w-2xl bg-[#181818] rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col items-center space-y-2 mb-6">
          <div className="text-3xl font-bold text-white">CraftConnect</div>
          <div className="text-gray-400">Create your account</div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          {["User", "Artisan"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-full ${
                role === r
                  ? "bg-green-500 text-black"
                  : "bg-[#121212] text-white"
              }`}
            >
              {r === "User" ? "User/HomeOwner" : "Artisan"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Full Name
            </label>
            <input
              {...register("fullName", { required: "Full name is required" })}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {role === "User" && (
            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Username
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                placeholder="Your username"
                className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          )}

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

          {role === "Artisan" && (
            <>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Trade
                </label>
                <input
                  {...register("trade", { required: "Trade is required" })}
                  placeholder="e.g tailoring, plumbing"
                  className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]"
                />
                {errors.trade && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.trade.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Phone (Ghana)
                </label>
                <input
                  {...register("phone", { required: "Phone is required" })}
                  placeholder="+233XXXXXXXXX"
                  className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Years of Experience
                  </label>
                  <select
                    {...register("experience", {
                      required: "Experience is required",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]"
                  >
                    <option value="">Select experience</option>
                    {Array.from({ length: 15 }, (_, i) => (
                      <option key={i + 1} value={`${i + 1}`}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  {errors.experience && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.experience.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Location
                  </label>
                  <input
                    {...register("location", {
                      required: "Location is required",
                    })}
                    placeholder="Your location"
                    className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                })}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">
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
                className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#4ade80]"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-yellow-400 text-black font-semibold hover:opacity-90 transition"
          >
            Sign up
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
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

export default SignupPage;
