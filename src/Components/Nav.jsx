import { NavLink } from "react-router-dom";
import Drawer from "./Drawer";

export default function Nav() {
  const links = [
    { id: 1, path: "/auth/newtask", name: "New Task" },
    { id: 2, path: "/auth/alltask", name: "All Tasks" },
  ];

  return (
    <div className="max-w-[1268px] mx-auto p-4 flex justify-between items-center">
      {/* Logo */}
      <NavLink to="/">
        <img
          src="https://task-duty-proj-client.vercel.app/assets/logo-cQYmEuE8.svg"
          alt="Logo"
        />
      </NavLink>

      <div className="flex items-center space-x-6">
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-purple-500 font-semibold"
                  : "text-black"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Profile Image */}
        <img
          src="/WhatsApp Image 2025-10-30 at 07.53.07.jpeg"
          alt="Profile"
          className="w-8 h-8 rounded-full hidden md:block"
        />

        {/* Mobile Drawer */}
        <div className="md:hidden">
          <Drawer />
        </div>
      </div>
    </div>
  );
}