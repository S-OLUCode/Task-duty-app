import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateregisterSchema } from "../../utils/dataSchema.js";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/auth.js";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth.js";

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateregisterSchema),
  });

  const { setAccessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Registration successful");
      setAccessToken(res.data.data);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.response?.data?.message || "Registration failed");
    },
  });

  const onSubmitForm = async (data) => {
    console.log(data); // check submitted data
    mutation.mutate(data);
  };

  return (
    <div className="max-w-115.25 mx-auto px-8">
      <div className="flex justify-center mt-35">
        <Link to="/" className="w-[300px] pl-15">
          <img
            src="https://task-duty-proj-client.vercel.app/assets/logo-cQYmEuE8.svg"
            alt="Logo"
          />
        </Link>
      </div>

      <div className="py-4">
        <div className="text-black mt-4 flex flex-col justify-center">
          <div className="pb-2 mb-2 px-8 py-2">
            <h1 className="text-md text-2xl font-bold">Register</h1>
            <p className="py-2 text-sm">
              Enter Your Information To Register An Account!
            </p>
          </div>

          <form className="" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="w-75% px-8">
              {/* Email */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="input input-md input-primary px-4 py-4 bg-white text-black w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Username */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                  className="input input-md input-primary px-4 py-4 bg-white text-black w-full"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className="input input-md input-primary px-4 py-4 bg-white text-black w-full"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full rounded-lg py-3 mt-7 bg-purple-500 text-white flex items-center justify-center text-md"
              >
                {mutation.isPending ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin stroke-white" />
                    <span>Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>

          <p className="text-center px-8 pt-6 text-sm">
            Have an account?{" "}
            <Link to="/auth/login" className="font-semibold text-purple-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}