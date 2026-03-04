import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../Pages/Home/Home";
import Alltask from "../Pages/Task/Alltask";
import Newtask from "../Pages/Task/Newtask";
import GotomyTasks from "../Pages/Task/GotomyTasks";
import Rootlayout from "../Layout/Rootlayout";
import AuthLayout from "../Layout/AuthLayout";
import Signup from "../Pages/auth/Signup";
import Login from "../Pages/auth/Login";



export default function AppRoutes() {
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
          element: <Newtask />,
        },
        {
          path: "auth/alltask",
          element: <Alltask />,
        },
        {
          path: "auth/gotomytasks",
          element: <GotomyTasks/>,
        },
      ],
    },
  ];

  const router = createBrowserRouter(route);

  return <RouterProvider router={router} />;
}
