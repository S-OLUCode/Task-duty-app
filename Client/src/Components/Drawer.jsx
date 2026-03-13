import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // make sure these are installed
import { useAuth } from "../hooks/useAuth";


export default function Drawer({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();



  return (
    <>
      <Menu
        className="md:hidden text-purple-500 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <div
        className={`drawer fixed top-0 left-0 z-40 ${
          isOpen ? "drawer-open" : ""
        }`}
      >
        <input
          id="my-drawer-1"
          className="drawer-toggle"
          type="checkbox"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />

        <div className="drawer-side bg-white">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsOpen(false)}
          ></label>
          <div className="menu text-base-content min-h-full w-75 p-4 relative">
            <Link to="/" className="font-bold text-xl mt-3 inline-block">
              <img
                src="https://task-duty-proj-client.vercel.app/assets/logo-cQYmEuE8.svg"
                alt="Logo"
              />
            </Link>
            <button
              className="absolute right-4 top-7"
              onClick={() => setIsOpen(false)}
            >
              <X className="text-black font-medium" />
            </button>

            {user ? (
              <div className="mt-2 text-black">
                <p className="text-sm">Hi, {user.username}</p>
                <div className="mt-6 flex flex-col gap-4">
                  <Link
                    to="/auth/newtask"
                    onClick={() => setIsOpen(false)}
                    className="text-black font-medium text-2xl mt-4"
                  >
                    New Task
                  </Link>
                  <Link
                    to="/auth/gotomytasks"
                    onClick={() => setIsOpen(false)}
                    className="text-black font-medium text-2xl"
                  >
                    All Tasks
                  </Link>
                   <a
                    href="#"
                    onClick={handleLogout}
                    className="font-medium text-xl"
                  >
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  to="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="text-black font-medium text-xl mt-4"
                >
                 Register
                </Link>
                <Link
                  to="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="text-black font-medium text-xl"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}