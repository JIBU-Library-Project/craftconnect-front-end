import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "../../queries/authQueries";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useQueryState } from "nuqs";
import logo from "../../assets/logo.png"

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const password = watch("password");

  const [token] = useQueryState("token");

  const resetPasswordMutation = useResetPassword();

  const onSubmit = async (data) => {
    try {
      console.log("Submitting reset data:", data);
      const response = await resetPasswordMutation.mutateAsync({
        payload: data,
        token,
      });
      if (response) {
        toast.success("Password successfully reset");
        navigate("/login");
        reset();
      }
    } catch (error) {
      console.error("Error sending reset request", error);
      toast.error(
        error.response?.data?.error || "Reset request failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center px-4 py-10 loginpage">
      <div className="w-full max-w-md p-6 rounded-xl shadow-md backdrop-blur-3xl outline outline-amber-50 bg-[#ffffff] /80">
        {/* Header */}
        <div className="flex flex-col items-center space-y-1 mb-6">
            <img src={logo} alt={`CraftConnect`} className=" w-45 pb-5 pt-5 " />
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
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                })}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-[#292b2a]/15 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
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
            className="w-full py-3 rounded-lg bg-[#4b158d] flex justify-center text-white font-medium hover:bg-[#aa47bc] transition">
            {isSubmitting ? (
              <Loader2 className="animate-spin text-center" />
            ) : (
              "Reset Password"
            )}
          </button>

          {/* Link to login */}
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className=" text-[#4b158d] font-medium hover:underline">
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
