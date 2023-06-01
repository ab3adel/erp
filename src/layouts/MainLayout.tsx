import { Box, Divider, Link, Toolbar, Typography } from "@mui/material";
import { AppBar } from "./components/AppBar";
import { Outlet, redirect, useLocation } from "react-router-dom";
import { Drawer } from "./components/Drawer";

const loader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  return null;
};

export const MainLayout = () => {
  const { pathname } = useLocation();
  return (
    <Box display="flex">
      <AppBar />
      <Drawer />
      <Box component="main" sx={{ flexGrow: 1, px: 3 }} width="20%">
        <Toolbar />
        <Box sx={{ zIndex: 1, position: "relative" }}>
          <Outlet />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "18px",
            right: "0px",
            width: "100%",
            justifyContent: "center",
            zIndex: 0,
            display: pathname === "/" ? "flex" : "none",
          }}
        >
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            © 2023 M·Cultivo
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Link variant="body1">Terms of Service</Link>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Link variant="body1">Privacy Policy</Link>
        </Box>
      </Box>
    </Box>
  );
};

MainLayout.loader = loader;
