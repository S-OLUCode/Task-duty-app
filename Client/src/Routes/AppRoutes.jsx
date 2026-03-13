import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../Pages/Home/Home";
import Alltask from "../Pages/Task/Alltask";
import Newtask from "../Pages/Task/Newtask";
import GotomyTasks from "../Pages/Task/GotomyTasks";
import Rootlayout from "../Layout/Rootlayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import { PrivateRoute, PublicRoute } from "../Routes/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";


export default function AppRoutes() {
  const { accessToken } = useAuth();
  const route = [
    {
      path: "/",
      element: <Rootlayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "auth/newtask",
          element: (
            <PrivateRoute accessToken={accessToken}>
              <Newtask />
            </PrivateRoute>
          ),
        },
        {
          path: "auth/alltask",
          element: (
            <PrivateRoute accessToken={accessToken}>
              <Alltask />
            </PrivateRoute>
          ),
        },
        {
          path: "auth/gotomytasks",
          element: (
            <PrivateRoute accessToken={accessToken}>
              <GotomyTasks />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      element: (
          <PublicRoute accessToken={accessToken}>
            <AuthLayout />
          </PublicRoute>
      ),
      children: [
        {
          path: "auth/register",
          element: <Register />,
        },
        {
          path: "auth/login",
          element: <Login />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(route);

  return <RouterProvider router={router} />;
}
