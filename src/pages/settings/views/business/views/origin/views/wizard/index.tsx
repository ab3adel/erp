import { useState } from "react";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { KeyboardArrowRight } from "@mui/icons-material";
import { WizardTab, tabNames, firstTabName, getNextTab } from "./tabs";


const OriginWizard = () => {
  const [value, setValue] = useState(firstTabName);
  return (
    <Box display="flex" flexDirection="column">
      <Box flexGrow={1} p={1} pt={7} display="flex">
        <TabContext value={value}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            sx={{
              position: "relative",
              height: "min-content",
              minWidth: 260,
              "&::before": {
                content: '""',
                right: 0,
                position: "absolute",
                bgcolor: "primary.light",
                borderRadius: 3,
                width: 9,
                height: "100%",
              },
            }}
            TabIndicatorProps={{
              sx: { width: "8px", borderRadius: 3 },
            }}
          >
            {tabNames.map((tab) => (
              <Tab
                key={tab.key}
                label={tab.name}
                value={tab.key}
                sx={{
                  alignItems: "start",
                  width: 228,
                  marginRight: 2,
                  fontSize: 16,
                  fontWeight: 400,
                  color: "common.black",
                  textTransform: "none"
                }}
              />
            ))}
          </Tabs>
          {tabNames.map((tab) => (
            <TabPanel
              key={tab.key}
              value={tab.key}
              sx={{
                flexGrow: 1,
                minWidth: 0,
                paddingTop: 0,
                marginTop: -1,
                paddingLeft: 8,
              }}
            >
              <WizardTab tabKey={tab.key} />
            </TabPanel>
          ))}
        </TabContext>
      </Box>
      <Box
        borderTop="1px solid #0000001F"
        width="100%"
        flexShrink={0}
        p={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button variant="text" sx={{ color: "text.secondary" }}>
          Cancel
        </Button>
        <Button
          disableElevation={false}
          endIcon={<KeyboardArrowRight />}
          onClick={() => setValue(getNextTab)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default OriginWizard;
