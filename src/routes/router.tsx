import { MainLayout } from "@/layouts/MainLayout";
import { Managment } from "@/pages/managment/Managment";
import { Login } from "@/pages/login/Login";
import { Signup } from "@/pages/signup/Signup";
import { createBrowserRouter } from "react-router-dom";
import { Receiptions } from "@/pages/managment/views/receptions";
import { AcceptedInventory } from "@/pages/managment/views/acceptedInventory/AcceptedInventory";
import { RelationShips } from "@/pages/relationships";
import { Accounts } from "@/pages/relationships/views/accounts";
import { SettingsNavs } from "@/pages/settings/components/SettingsNavs";
import { Settings } from "@/pages/settings/Settings";
import { Account } from "@/pages/settings/views/account/Account";
import { General } from "@/pages/settings/views/account/views/general/General";
import { Notificationts } from "@/pages/settings/views/account/views/notifications/Notificationts";
import { Security } from "@/pages/settings/views/account/views/security/Security";
import { AccountsCustomView } from "@/pages/relationships/views/custom-view";
import { AgentProfile } from "@/pages/agent-profile/AgentProfile";
import { AgentFarms } from "@/pages/agent-profile/views/farms/AgentFarms";
import { BuyerProfile } from "@/pages/buyer-profile/BuyerProfile";
import { FarmerProfle } from "@/pages/farmer-profile/FarmerProfle";
import { PlotProfile } from "@/pages/plot-profile/PlotProfile";
import { FarmerFarms } from "@/pages/farmer-profile/views/farms/FarmerFarms";

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
            path: "accounts",
            element: <Accounts />,
          },
          {
            path: "customview",
            element: <AccountsCustomView />,
          },
        ],
      },
      {
        path: "/settings",
        element: <Settings />,
        handle: {
          navs: <SettingsNavs />,
        },
        children: [
          {
            path: "account",
            element: <Account />,
            children: [
              {
                index: true,
                element: <General />,
              },
              {
                path: "notifications",
                element: <Notificationts />,
              },
              {
                path: "security",
                element: <Security />,
              },
            ],
          },
        ],
      },
      {
        path: ":id/agent-profile",
        element: <AgentProfile />,
        children: [
          {
            index: true,
            element: <AgentFarms />,
          },
        ],
      },
      {
        path: ":id/buyer-profile",
        element: <BuyerProfile />,
      },
      {
        path: ":id/farmer-profile",
        element: <FarmerProfle />,
        children: [
          {
            index: true,
            element: <FarmerFarms />,
          },
        ],
      },
      {
        path: ":id/plot-profile",
        element: <PlotProfile />,
      },
    ],
  },
]);
