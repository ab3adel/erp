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
import {
  AccountCosts,
  AccountFarms,
  AccountHistory,
  AccountNotes,
  AccountTransactions,
  AgentProfile,
  BuyerProfile,
  FarmerProfile,
  PlotProfile,
} from "@/pages/profile";
import { AccountsCustomView } from "@/pages/relationships/views/accounts/AccountsCustomView";
import Business from "@/pages/settings/views/business/Business";
import Organization from "@/pages/settings/views/business/views/general/views/organization/Organization";
import Edit from "@/pages/settings/views/business/views/general/views/organization/views/edit/Edit";
import Teams from "@/pages/settings/views/business/views/general/views/teams/Teams";
import Create from "@/pages/settings/views/business/views/general/views/teams/view/create/Create";

const ProfileChildrenRoutes = [
  {
    index: true,
    element: <AccountFarms />,
  },
  {
    path: "costs",
    element: <AccountCosts />,
  },
  {
    path: "transactions",
    element: <AccountTransactions />,
  },
  {
    path: "notes",
    element: <AccountNotes />,
  },
];

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
          {
            path: "business",
            element: <Business />,
            children: [
              {
                path: "general",
                children: [
                  {
                    path: "organization",
                    children: [
                      { element: <Organization />, index: true },
                      { element: <Edit />, path: "edit" },
                    ],
                  },
                  {
                    path: "teams",

                    children: [
                      { element: <Teams />, index: true },
                      { element: <Create />, path: "add" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: ":id/agent-profile",
        element: <AgentProfile />,
        children: ProfileChildrenRoutes,
      },
      {
        path: ":id/buyer-profile",
        element: <BuyerProfile />,
        children: [
          {
            index: true,
            element: <AccountTransactions />,
          },
          {
            path: "notes",
            element: <AccountNotes />,
          },
        ],
      },
      {
        path: ":id/farmer-profile",
        element: <FarmerProfile />,
        children: ProfileChildrenRoutes,
      },
      {
        path: ":id/plot-profile",
        element: <PlotProfile />,
        children: [
          {
            ...ProfileChildrenRoutes,
            path: "history",
            element: <AccountHistory />,
          },
        ],
      },
    ],
  },
]);
