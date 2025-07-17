import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const craftOptions = [
    "Plumber",
    "Electrician",
    "Tailor",
    "Carpenter",
    "Mason",
    "Painter",
    "Welder",
    "Hairdresser",
    "Shoe Maker",
    "Blacksmith",
    "Potter",
    "Weaver",
    "Jeweler",
    "Baker",
    "Mechanic",
    "Cooker",
  ];

  const onSubmit = (data) => {
    console.log(data);
    // Handle your API call here
  };

  return (
    <div className=" loginpage min-h-screen w-screen flex items-center justify-center px-4 py-10 bg-gray-700">
      <div className="w-full max-w-xl p-6 rounded-xl shadow-md backdrop-blur-3xl outline outline-amber-50 bg-[#fffffffe] /90">
        {/* Title */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">CraftConnect</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        {/* Role toggle */}
        <div className="flex justify-center space-x-4 mb-6">
          {["User", "Artisan"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-full hover:cursor-pointer font-medium transition ${
                role === r
                  ? "bg-[#4b158d] text-white hover:bg-[#aa47bc] "
                  : "bg-[#262722]/15 text-gray-700 hover:bg-[#ddddddda] "
              }`}
            >
              {r === "User" ? "User/HomeOwner" : "Artisan"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15  border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15  border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Artisan fields */}
          {role === "Artisan" && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Business Name
                </label>
                <input
                  {...register("businessName", {
                    required: "Business name is required",
                  })}
                  placeholder="Your business name"
                  className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15  border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.businessName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.businessName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Primary Craft
                </label>
                <select
                  {...register("craft", {
                    required: "Please select your primary craft",
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15  border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="">Select your craft</option>
                  {craftOptions.map((craft) => (
                    <option key={craft} value={craft}>
                      {craft}
                    </option>
                  ))}
                </select>
                {errors.craft && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.craft.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Phone and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone
              </label>
              <input
                {...register("phone", { required: "Phone is required" })}
                placeholder="+233XXXXXXXXX"
                className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15  border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Location
              </label>
              <input
                {...register("location", { required: "Location is required" })}
                placeholder="Your location"
                className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15  border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                })}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15  border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15  border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
            className="w-full bg-[#4b158d] text-white py-3 rounded-lg font-medium hover:bg-[#aa47bc] transition"
          >
            Sign Up
          </button>

          {/* Link to login */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className=" text-[#4b158d] font-medium "
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
