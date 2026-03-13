import { NavLink, Link } from "react-router-dom";
import Drawer from "./Drawer";
import { useAuth } from "../hooks/useAuth";
import UserAvatar from "./UserAvatar";

export default function Nav() {
  const links = [
    { id: 1, path: "/auth/newtask", name: "New Task" },
    { id: 2, path: "/auth/gotomytasks", name: "All Tasks" },
  ];

  const { user, handleLogout } = useAuth();

  return (
    <div className="max-w-[1268px] mx-auto p-4 lg:py-3 md:py-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <NavLink to="/">
        <img
          src="https://task-duty-proj-client.vercel.app/assets/logo-cQYmEuE8.svg"
          alt="Logo"
        />
      </NavLink>

      <div className="flex items-center space-x-6">
        {/* Desktop Links */}
        {user ? (
          <>
            {" "}
            <div className="hidden md:flex items-center space-x-6">
              {" "}
              {links.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "text-purple-500 font-semibold" : "text-black"
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </>
        ) : null}

        <div className="md:flex md:items-center md:gap-4">
          {user ? (
            <>
              <UserAvatar />
            </>
          ) : (
            <>
              {" "}
              <div className="">
                <Link
                  to="/auth/login"
                  className="text-gray-700 font-medium text-lg hidden md:block"
                >
                  {" "}
                  Login
                </Link>
              </div>
              <div>
                <Link
                  to="/auth/register"
                  className="text-gray-700 font-medium text-lg hidden md:block"
                >
                  {" "}
                  Register
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Mobile Drawer */}
        <div className="md:hidden">
          <Drawer handleLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
}
