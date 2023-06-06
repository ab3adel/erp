import { Box, Divider, Link, Toolbar, Typography } from "@mui/material";
import { AppBar } from "./components/AppBar";
import { Outlet, redirect } from "react-router-dom";
import { Drawer } from "./components/Drawer";

const loader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  return null;
};

export const MainLayout = () => {
  return (
    <Box display="flex" height="100%">
      <AppBar />
      <Drawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, px: 3 }}
        width="20%"
        height="100%"
      >
        <Toolbar />
        <Box sx={{ zIndex: 1, position: "relative", height: "85%" }}>
          <Outlet />
        </Box>
        <Box
          sx={{
            width: "100%",
            justifyContent: "center",
            zIndex: 0,
            display: "flex",
            mt: 1.5,
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
