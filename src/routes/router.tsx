import { MainLayout } from "@/layouts/MainLayout";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { Login } from "@/pages/login/Login";
import { Signup } from "@/pages/signup/Signup";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
