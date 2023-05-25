import { Box, Typography, Paper } from "@mui/material";
import { CurvedTabs } from "@/shared/components/curvedTabs/CurvedTabs";
import { Outlet } from "react-router-dom";

export const RelationShips = () => {
  return (
    <Box position="relative">
      <Typography
        fontSize={34}
        fontWeight={700}
        sx={{ color: "common.black", mb: 4 }}
      >
        RelationShips
      </Typography>
      <CurvedTabs
        tabs={[
          {
            label: "Accounts",
            value: "/relationships/accounts",
          },
        ]}
        localStorageKey="relationships"
      />
      <Paper elevation={0} sx={{ borderRadius: "0px 0px 12px 12px" }}>
        <Outlet />
      </Paper>
    </Box>
  );
};
