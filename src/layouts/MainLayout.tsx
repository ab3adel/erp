import { Box, Toolbar } from "@mui/material";
import { AppBar } from "./components/AppBar";
import { Outlet, redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { Drawer } from "./components/Drawer";

const loader = () => {
  const token = Cookies.get("token");
  if (!token) {
    return redirect("/login");
  }
  return null;
};

export const MainLayout = () => {
  return (
    <Box display="flex">
      <AppBar />
      <Drawer />
      <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

MainLayout.loader = loader;
