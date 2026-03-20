import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, deleteTask } from "./../../api/task.js";
import Modal from "../../Components/Modal.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import Lazyspinner from "../../Components/Lazyspinner.jsx";

export default function GotomyTasks() {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  // --- NEW STATE FOR SEARCH ---
  const [searchQuery, setSearchQuery] = useState("");
  const [taskToDelete, setTaskToDelete] = useState(null);

  // 1. Fetch Tasks
  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(accessToken),
    enabled: !!accessToken,
  });

  // 2. Delete Mutation Logic
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTask(id, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully");
      setTaskToDelete(null);
    },
    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  const tasks = data?.data?.data || [];

  const filteredTasks = tasks

    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteMutation.mutate(taskToDelete);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Lazyspinner />
      </div>
    );
  }

  return (
    <div className="max-w-[1268px] mx-auto space-y-10 lg:px-0 md:px-5 px-3">
      <div className="flex justify-between my-10">
        <h1 className="text-4xl">My Tasks</h1>
        <Link to="/auth/newtask">
          <p className="text-xl text-purple-600 pt-3 font-medium">
            + Add new task
          </p>
        </Link>
      </div>

      {/* --- SEARCH BAR UI --- */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search for a task by title or tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-4 pl-12 pr-4 border border-gray-300 rounded-lg outline-none focus:border-purple-600 transition-all shadow-sm"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {filteredTasks?.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          {searchQuery
            ? `No tasks found matching "${searchQuery}"`
            : "No tasks yet. Start by creating one!"}
        </p>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task._id}
            className="border border-gray-300 rounded-md px-3 mb-6"
          >
            <div className="flex justify-between py-4">
              <p
                className={`mt-3 text-[17px] font-semibold ${
                  task.tags === "Urgent" ? "text-red-500" : "text-green-500"
                }`}
              >
                {task.tags}
              </p>

              <div className="flex gap-2">
                <Link
                  to={`/auth/alltask/${task._id}`}
                  className="bg-purple-600 py-1 px-4 text-white rounded-sm flex items-center gap-2 hover:bg-purple-700 transition-colors"
                >
                  <img src="/clarity.png" alt="" className="w-4 h-4" />
                  Edit
                </Link>

                <button
                  className="py-1 px-4 border border-purple-600 text-purple-600 rounded-sm flex items-center gap-2 hover:bg-purple-50 transition-colors"
                  onClick={() => setTaskToDelete(task._id)}
                >
                  <img src="/trashIcon.jpg" alt="" className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>

            <hr className="text-gray-300" />
            <h2 className="py-3 text-3xl font-medium">{task.title}</h2>
            <p className="text-justify text-gray-700 pb-6">
              {task.description}
            </p>
          </div>
        ))
      )}

      <Modal
        id="Delete"
        isOpen={!!taskToDelete}
        className="bg-white max-w-[400px] mx-auto rounded-lg p-6 shadow-2xl"
      >
        <div className="flex flex-col items-center gap-4 w-full">
          <h1 className="text-2xl font-bold text-purple-500">Delete Task</h1>
          <p className="text-center text-gray-600">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
          <div className="mt-4 flex gap-4 w-full justify-center">
            <button
              onClick={() => setTaskToDelete(null)}
              className="px-6 py-2 border border-purple-500 rounded text-purple-500 hover:bg-purple-100 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-all font-bold disabled:opacity-50"
            >
              {deleteMutation.isPending ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      </Modal>

      <a
        href="#top"
        className="underline text-purple-500 pt-2 pb-10 text-center w-full block"
      >
        Back To Top
      </a>
    </div>
  );
}
