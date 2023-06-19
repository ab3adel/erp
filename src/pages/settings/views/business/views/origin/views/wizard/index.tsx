import { useState } from "react";
import { Box, Button, Divider, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { KeyboardArrowRight } from "@mui/icons-material";
import { WizardTab, tabNames, firstTabName, getNextTab } from "./tabs";
import { GenericDialog, useDialog } from "@/shared";

const OriginWizard = () => {
  const { openDialog, closeDialog, isDialogOpen } =
    useDialog<"discard-wizard-changes">();
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
                  textTransform: "none",
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
        <Button
          variant="text"
          sx={{ color: "text.secondary" }}
          onClick={() => openDialog("discard-wizard-changes")}
        >
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
      {/* FIXME: make the dialog styling more accurate */}
      <GenericDialog
        color="white"
        open={isDialogOpen("discard-wizard-changes")}
        onClose={closeDialog}
        maxWidth="xs"
        dialog={{
          title: "Discard Unsaved Changes?",
          submitButton: {
            label: "Discard",
            variant: "text",
          },
          closeButton: {
            label: "Cancel",
            color: "info"
          }
        }}
        // onSubmit={}
      >
        <Typography variant="body1" sx={{ color: "common.black" }}>
          You have made modifications on this page that will be lost if you
          proceed without saving. Are you sure you want to discard these
          changes?
        </Typography>
      </GenericDialog>
    </Box>
  );
};

export default OriginWizard;
