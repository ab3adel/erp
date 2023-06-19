import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const Settings = () => {
  const { pathname } = useLocation();
  const [, , child] = pathname.split("/");
  const navigate = useNavigate();

  useEffect(() => {
    if (!child) {
      navigate("/settings/account");
    }
  }, [child, navigate]);

  return (
    <Box position="relative" height="100%" display="flex" flexDirection="column">
      <Typography
        fontSize={34}
        fontWeight={700}
        sx={{ color: "common.black", mb: 4 }}
      >
        Settings
      </Typography>
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Box>
  );
};
