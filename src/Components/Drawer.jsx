import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Menu
        className="md:hidden text-black cursor-pointer"
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
          <div className="menu  text-base-content min-h-full w-75 p-4">
            <Link to="/" className="font-bold text-xl mt-3">
              <img
                src="https://task-duty-proj-client.vercel.app/assets/logo-cQYmEuE8.svg"
                alt="Logo"
              />
            </Link>
            <button
              className="absolute right-4 top-7 "
              onClick={() => setIsOpen(false)}
            >
              <X className="text-black font-medium" />
            </button>
            <div className="mt-6  flex flex-col gap-4">
              <Link
                to="/auth/newtask"
                onClick={() => setIsOpen(false)}
                className="text-black font-medium text-2xl mt-4"
              >
                New Task
              </Link>

              <Link
                to="/auth/alltask"
                onClick={() => setIsOpen(false)}
                className="text-black font-medium text-2xl"
              >
                All Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
