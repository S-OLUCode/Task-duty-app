import React, { useEffect, useState } from "react"; // Added useState
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSingleTask, updateTask } from "../../api/task.js"; 
import { useAuth } from "../../hooks/useAuth.js";
import { toast } from "react-toastify";
import Lazyspinner from "../../Components/Lazyspinner.jsx";

export default function Alltask() {
  // 1. ALL HOOKS MUST BE AT THE TOP
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  
  // Custom timer state
  const [timerLoading, setTimerLoading] = useState(true);

  // API loading state from React Query
  const { data: response, isLoading: apiLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getSingleTask(id, accessToken),
    enabled: !!id && !!accessToken,
  });

  const mutation = useMutation({
    mutationFn: (formData) => updateTask(id, formData, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); 
      toast.success("Task updated!");
      navigate("/auth/gotomytasks"); 
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Update failed");
    }
  });

  // Timer Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Form Reset Effect
  useEffect(() => {
    if (response?.data?.data) {
      reset(response.data.data);
    }
  }, [response, reset]);

  const onUpdate = (data) => {
    mutation.mutate(data);
  };

  // 2. CONDITIONAL RETURNS GO AFTER ALL HOOKS
  // Show spinner if either the 1.2s timer is running OR the API is still fetching
  if (timerLoading || apiLoading) return <Lazyspinner />;

  return (
    <div className="max-w-[1268px] mx-auto w-full lg:px-0 md:px-12 px-3" id="top">
      <div className="flex items-center gap-1 md:my-7 my-6">
        <Link to="/auth/gotomytasks">
          <img
            src="/69036dac6c6467000c309eaf (1).png"
            alt="back"
            className="w-[30px]"
          />
        </Link>
        <h1 className="text-2xl font-semibold">Edit Task</h1>
      </div>
      
      <form onSubmit={handleSubmit(onUpdate)} className="flex flex-col gap-6 w-full space-y-4">
        <div className="flex flex-col relative md:mt-4 mt-3">
          <label className="absolute -top-3 left-8 md:pl-0 text-gray-400 bg-white text-md px-1">
            Task Title
          </label>
          <input
            type="text"
            {...register("title")} 
            placeholder="Project Completion ..."
            className="py-4 px-2 outline-none w-full border border-gray-300 pl-8 pt-4"
          />
        </div>

        <div className="relative mt-6">
          <label className="absolute -top-4 left-8 md:pl-0 text-gray-400 bg-white text-xl px-1">
            Description
          </label>
          <textarea
            {...register("description")} 
            placeholder="Briefly describe your task..."
            className="border border-gray-300 outline-none resize-none w-full pl-8 pt-6"
            rows={5}
          ></textarea>
        </div>

        <div className="flex relative justify-end py-4 border border-gray-200 mb-8">
          <label className="absolute -top-5 left-8 bg-white text-xl text-gray-400 md:pl-0 pt-1 px-1">
            Tags
          </label>
          <select
            {...register("tags")}
            className="border border-purple-500 text-purple-500 outline-none px-1 py-1 mx-2"
          >
            <option value="">Select options</option>
            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
          </select>
        </div>

        <div className="md:mt-10 mt-5 md:pt-8 space-y-3">
          <button 
            type="submit" 
            disabled={mutation.isPending}
            className="bg-purple-500 text-white w-full rounded py-3 font-bold hover:bg-purple-600 transition-colors"
          >
            {mutation.isPending ? "Updating..." : "Done"}
          </button>
          <a
            href="#top"
            className="underline text-purple-500 my-2 md:mt-4 text-center w-full block"
          >
            Back To Top
          </a>
        </div>
      </form>
    </div>
  );
}