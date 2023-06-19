import { Box, Divider, Link, Toolbar, Typography } from "@mui/material";
import { AppBar } from "./components/app-bar/AppBar";
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
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box display="flex">
        <AppBar />
        <Drawer />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            px: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar />
          <Box sx={{ zIndex: 1, position: "relative", flexGrow: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          height: "88px",
          display: "grid",
          placeContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            zIndex: 0,
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
