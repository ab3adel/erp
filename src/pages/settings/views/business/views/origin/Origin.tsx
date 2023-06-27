import { CurvedTabs } from "@/shared/components/curvedTabs/CurvedTabs";
import { FunctionComponent, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import { useOriginSettingState } from "./hooks/states";
import { useAllOriginSettingsQuery } from "./hooks/queries";

const Origin: FunctionComponent = () => {
  const navigate = useNavigate();
  const { init } = useOriginSettingState();

  useAllOriginSettingsQuery((data) => {
    const empty = init(data);
    if (!empty) navigate("saved-settings");
  });


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
