import { CurvedTabs } from "@/shared/components/curvedTabs/CurvedTabs";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { Box, Paper } from "@mui/material";

const Bussiness: FunctionComponent = () => {
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <CurvedTabs
        localStorageKey="generalTab"
        canDelete={false}
        canDrag={false}
        tabs={[
          {
            label: "Organization",
            value: "/settings/business/general/organization",
          },
          {
            label: "TEAM",
            value: "/settings/business/general/teams",
          },
          {
            label: "Branding",
            value: "/settings/business/general/branding",
          },
          {
            label: "Download Data",
            value: "/settings/business/general/download-data",
          },
        ]}
      />
      <Paper
        elevation={0}
        sx={{ borderRadius: "0px 0px 12px 12px", flexGrow: 1 }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};

export default Bussiness;
