import { CurvedTabs } from "@/shared/components/curvedTabs/CurvedTabs";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { Box, Paper } from "@mui/material";

const Origin: FunctionComponent = () => {
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <CurvedTabs
        localStorageKey="originTab"
        canDelete={false}
        canDrag={false}
        tabs={[
          {
            label: "Origin Details",
            value: "/settings/business/origin-customization",
          },
        ]}
      />
      <Paper
        elevation={4}
        sx={{ flexGrow: 1, borderRadius: "0px 12px 12px 12px" }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};

export default Origin;
