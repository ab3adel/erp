import { MainLayout } from "@/layouts/MainLayout";
import { Managment } from "@/pages/managment/Managment";
import { Login } from "@/pages/login/Login";
import { Signup } from "@/pages/signup/Signup";
import { createBrowserRouter } from "react-router-dom";
import { Receiptions } from "@/pages/managment/views/receptions";
import { AcceptedInventory } from "@/pages/managment/views/acceptedInventory/AcceptedInventory";
import { RelationShips } from "@/pages/relationships";
import { Accounts } from "@/pages/relationships/views/accounts";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: Login.loader,
  },
  {
    path: "/signup",
    element: <Signup />,
    loader: Signup.loader,
  },
  {
    path: "/",
    element: <MainLayout />,
    loader: MainLayout.loader,
    children: [
      {
        path: "management",
        element: <Managment />,
        children: [
          {
            index: true,
            element: <Receiptions />,
          },
          {
            path: "approved-inventory",
            element: <AcceptedInventory />,
          },
        ],
      },
      {
        path: "/relationships",
        element: <RelationShips />,
        children: [
          {
            path : "accounts",
            element: <Accounts />,
          },
        ],
      },
    ],
  },
]);
