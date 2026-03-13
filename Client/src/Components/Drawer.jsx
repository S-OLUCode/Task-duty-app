import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOutIcon, Menu, X } from "lucide-react"; // make sure these are installed
import { useAuth } from "../hooks/useAuth";
import { LogOut } from "lucide-react";


export default function Drawer({ handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();



  return (
    <>
      <Menu
        className="md:hidden text-purple-500 cursor-pointer mr-2"
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
          <div className="menu text-base-content min-h-full w-75 p-2 relative">
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
                <p className="text-2xl mt-4">Hi, {user.username}</p>
                <hr className="text-purple-500 font-bold mt-3"/>
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
                   <div className="flex items-center gap-2 mt-4 text-red-500 absolute bottom-0">
                    
                    <a
                    href="#"
                    onClick={handleLogout}
                    className=" font-medium text-2xl "
                  >
                    Logout
                  </a>
                  <LogOutIcon size={20} />
                   </div>
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