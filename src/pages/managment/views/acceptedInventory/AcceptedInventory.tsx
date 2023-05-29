import { Box, Tab, Tabs, Divider } from "@mui/material";
import React from "react";
import LotsGrid from "./components/LotsGrid";

export const AcceptedInventory = () => {
  const [type, setType] = React.useState<"cherry" | "pachment" | "green">(
    "cherry"
  );
  const tabs = [
    {
      label: "Cherry",
      type: "cherry",
    },
    {
      label: "Pachment",
      type: "pachment",
    },
    {
      label: "Green",
      type: "green",
    },
  ];

  return (
    <Box>
      <Tabs
        value={type}
        onChange={(_, type) => {
          setType(type);
        }}
        sx={{
          pt: 2,
          "& .MuiTabs-scroller .MuiTabs-flexContainer": {
            justifyContent: "center",
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.label} label={tab.label} value={tab.type} />
        ))}
      </Tabs>
      <Divider sx={{ mb: 2 }} />
      <LotsGrid />
    </Box>
  );
};
