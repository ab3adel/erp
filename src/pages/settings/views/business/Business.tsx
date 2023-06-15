import { CurvedTabs } from "@/shared/components/curvedTabs/CurvedTabs";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { Box, Paper } from "@mui/material";

const Bussiness: FunctionComponent = () => {
  return (
    <Box>
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
          // {
          //   label: "Branding",
          //   value: "/settings/account/security",
          // },
          // {
          //   label: "Branding",
          //   value: "/settings/account/security",
          // },
        ]}
      />
      <Paper elevation={0} sx={{ borderRadius: "0px 0px 12px 12px" }}>
        <Outlet />
      </Paper>
    </Box>
  );
};

export default Bussiness;
