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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [revealPassword, setRevealPassword] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateregisterSchema),
  });

  const { setAccessToken } = useAuth();

  const togglePasswordReveal = (e) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Account Registered successfully! Please log in.");
      navigate("/auth/login"); // redirect to login after successful registration
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
      <div className="flex justify-center md:mt-35 lg:mt-25 mt-20">
        <Link to="/" className="w-[300px] pl-13 lg:pl-13 md:pl-12">
          <img
            src="https://task-duty-proj-client.vercel.app/assets/logo-cQYmEuE8.svg"
            alt="Logo"
          />
        </Link>
      </div>

      <div className="py-4">
        <div className="text-black mt-2 flex flex-col justify-center">
          <div className="lg:pb-0 md:pb-8 mb-2 px-8 py-2">
            <h1 className="text-md text-2xl md:text-3xl font-bold mb-2 mt-0 md:mt-0 lg:mt-0 md:mb-0 lg:mb-0">
              Register
            </h1>
            <p className="lg:py-2 lg:text-sm md:text-sm text-xs">
              Enter Your Information To Register An Account!
            </p>
          </div>

          <form className="" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="w-75% px-2 lg:mt-0 md:mt-0">
              {/* Email */}
              <div className="mb-2 md:mb-0 lg:mb-1 md:py-4">
                <span className="text-sm">Email</span>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="input input-md input-primary px-4 bg-white text-black w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Username */}
              <div className="mb-2 lg:mb-2 md:mb-2 md:py-2">
                <span className="text-sm">Username</span>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                  className="input input-md input-primary px-4 py-4 bg-white text-black w-full"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password */}

              <div className="relative mb-2 lg:mb-1 md:mb-3 md:py-2">
                <span className="text-sm">Password</span>
                <input
                  type={revealPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="input input-md input-primary px-4 py-4 rounded-lg bg-white text-black w-full"
                />
                <button
                  type="button"
                  onClick={togglePasswordReveal}
                  className="absolute right-2 md:top-8 lg:top-10 top-8 text-gray-500 z-10"
                >
                  {revealPassword ? <EyeOff size={30} /> : <Eye size={25} />}
                </button>

                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full rounded-md py-3 lg:mt-5 md:mt-5 mt-7 bg-purple-500 text-white flex items-center justify-center text-md"
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
