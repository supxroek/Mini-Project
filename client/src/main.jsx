import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./components/centrals/hero-sections/Hero";
import SignIn from "./components/centrals/application-sections/SignIn";
import SignUp from "./components/centrals/application-sections/SignUp";
import Booking from "./components/user-sections/Booking";
import Dashboard from "./components/user-sections/Dashboard";
import ForgotPass from "./components/user-sections/ForgotPass";
import QRcode from "./components/user-sections/QRcode";
import Rooms from "./components/user-sections/Rooms";
import Approve from "./components/admin-sections/Approve";
import Employees from "./components/admin-sections/Employees";
import Reports from "./components/admin-sections/Reports";
import Roles from "./components/admin-sections/Roles";
import Roommanage from "./components/admin-sections/Roommanage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/Booking",
    element: <Booking />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/ForgotPass",
    element: <ForgotPass />,
  },
  {
    path: "/QRcode",
    element: <QRcode />,
  },
  {
    path: "/Rooms",
    element: <Rooms />,
  },
  {
    path: "/Approve",
    element: <Approve />,
  },
  {
    path: "/Employees",
    element: <Employees />,
  },
  {
    path: "/Reports",
    element: <Reports />,
  },
  {
    path: "/Roles",
    element: <Roles />,
  },
  {
    path: "/Roommanage",
    element: <Roommanage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
