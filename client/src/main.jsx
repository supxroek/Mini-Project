import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/centrals/home";
import Register from "./components/centrals/register";
import Login from "./components/centrals/login";
import User_dashboard from "./components/users-sections/user_dashboard";
import Admin_dashboard from "./components/admin-sections/admin_dashboard";
import Employees from "./components/admin-sections/Employees";
import Roles from "./components/admin-sections/Roles";
import Rooms from "./components/admin-sections/Rooms";
import Reports from "./components/admin-sections/reports";
import Error_page from "./components/centrals/errorpage";
import Forgot_password from "./components/centrals/forgot_pass";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user_dashboard",
    element: <User_dashboard />,
  },
  {
    path: "/admin_dashboard",
    element: <Admin_dashboard />,
  },
  {
    path: "/employees",
    element: <Employees />,
  },
  {
    path: "/roles",
    element: <Roles />,
  },
  {
    path: "/rooms",
    element: <Rooms />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/404",
    element: <Error_page />,
  },
  {
    path: "/forgot_password",
    element: <Forgot_password />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
