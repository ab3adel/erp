import { Box, Typography, Paper } from "@mui/material";
import { CurvedTabs } from "@/shared/components/curvedTabs/CurvedTabs";
import { Outlet } from "react-router-dom";
import { CurvedTabsContainer } from "@/shared/components/curvedTabs/CurvedTabsContainer";

export const Managment = () => {
  return (
    <Box position="relative">
      <Typography
        fontSize={34}
        fontWeight={700}
        sx={{ color: "common.black", mb: 4 }}
      >
        Management
      </Typography>
      <CurvedTabs
        canDelete={false}
        canDrag={false}
        localStorageKey="managementTab"
        tabs={[
          {
            label: "Reception",
            value: "/management",
          },
          {
            label: "Approved inventory",
            value: "/management/approved-inventory",
          },
        ]}
      />
      <CurvedTabsContainer>
        <Outlet />
      </CurvedTabsContainer>
    </Box>
  );
};
