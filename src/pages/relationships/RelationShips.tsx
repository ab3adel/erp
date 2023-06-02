import { Box, Typography, Paper } from "@mui/material";
import { CurvedTabs } from "@/shared/components/curvedTabs/CurvedTabs";
import { Outlet } from "react-router-dom";
import { CurvedTabsContainer } from "@/shared/components/curvedTabs/CurvedTabsContainer";

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
      <CurvedTabsContainer>
        <Outlet />
      </CurvedTabsContainer>
    </Box>
  );
};
