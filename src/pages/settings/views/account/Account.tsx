import { Outlet } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import { CurvedTabs } from "@/shared/components/curvedTabs/CurvedTabs";

export const Account = () => {
  return (
    <Box>
      <CurvedTabs
        localStorageKey="accountTab"
        canDelete={false}
        canDrag={false}
        tabs={[
          {
            label: "General",
            value: "/settings/account",
          },
          {
            label: "Notifications",
            value: "/settings/account/notifications",
          },
          {
            label: "Security",
            value: "/settings/account/security",
          },
        ]}
      />
      <Paper elevation={0} sx={{ borderRadius: "0px 0px 12px 12px" }}>
        <Outlet />
      </Paper>
    </Box>
  );
};
