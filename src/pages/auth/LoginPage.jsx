import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../queries/authQueries";
import { toast } from "react-toastify";
import { useAuth } from "../../services/hooks";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useLogin();

  const onSubmit = async (data) => {
    try {
      console.log("Submitting login data:", data);
      const response = await loginMutation.mutateAsync(data);
      if (response) {
        console.log("Login successful:", response);
        toast.success("Successfully logged in!");
        login(response.user.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        error.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center px-4 py-10 loginpage">
      <div className="w-full max-w-md p-6 rounded-xl shadow-md backdrop-blur-3xl outline outline-amber-50 bg-[#ffffff] /80">
        {/* Header */}
        <div className="flex flex-col items-center space-y-1 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">CraftConnect</h1>
          <p className="text-gray-600">Login with your credentials</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="email">
              Email
            </label>
            <input
              id="email"
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

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="password">
                Password
              </label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm  text-[#4b158d] hover:underline">
                Forgot password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#4b158d] text-white font-medium hover:bg-[#aa47bc] transition">
            Sign In
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              type="button"
              className=" text-[#4b158d] font-medium hover:underline">
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
