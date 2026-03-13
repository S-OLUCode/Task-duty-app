import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateLogInSchema } from "../../utils/dataSchema.js";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/auth.js";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth.js";
import { Eye, EyeOff, Loader } from "lucide-react";

export default function Login() {
  const [revealPassword, setRevealPassword] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateLogInSchema),
  });

  const { setAccessToken } = useAuth();

  const togglePasswordReveal = (e) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Login successful");
      setAccessToken(res.data.data);
      navigate("/"); // redirect after login
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });

  const onSubmitForm = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="max-w-[400px] mt-10 lg:mt-25 mx-auto text-wash-white rounded-lg px-8 py-6">
      <div className="flex justify-center">
        <Link to="/" className="w-[300px] pl-4">
          <img
            src="https://task-duty-proj-client.vercel.app/assets/logo-cQYmEuE8.svg"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="text-3xl pb-4 py-10">
        <h1>Welcome Back!</h1>
        <p className="text-sm text-wash-white">Enter Your Details Here</p>
      </div>

      <form className="mt-2" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-4">
          <span className="text-sm">Email</span>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="input input-md input-primary px-4 py-2 rounded-lg bg-white text-black w-full"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <span className="text-sm">Password</span>
          <input
            type={revealPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="input input-md input-primary px-4 py-2 rounded-lg bg-white text-black w-full"
          />
          <button
            type="button"
            onClick={togglePasswordReveal}
            className="absolute right-2 top-8 text-gray-600 z-10"
          >
            {revealPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-3 mt-7 bg-purple-500 text-white rounded-lg flex items-center justify-center gap-2"
        >
          {mutation.isPending ? (
            <>
              <Loader className="w-5 h-5 animate-spin stroke-white" />
              <span>Loading...</span>
            </>
          ) : (
            "Log In"
          )}
        </button>
      </form>

      <p className="text-center pt-6 text-sm">
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-purple-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
