import React from "react";
import { Box, Button, Typography, Tab, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ReceiptionsTable } from "./components/ReceiptionsTable";
import { TabContext, TabPanel, TabList } from "@mui/lab";
export const Managment = () => {
  const [value, setValue] = React.useState("0");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography
          fontSize={34}
          fontWeight={700}
          sx={{ color: "common.black" }}
        >
          Management
        </Typography>
        <Button startIcon={<AddIcon />}>NEW RECEPTION</Button>
      </Box>
      <Paper elevation={3} sx={{ p: 2 }}>
        <TabContext value={value}>
          <TabList
            value={value}
            onChange={handleChange}
            sx={{
              "& .MuiTabs-scroller .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            <Tab label="Reception" value="0" />
            <Tab label="Approved inventory" value="1" />
          </TabList>
          <TabPanel value="0">
            <ReceiptionsTable />
          </TabPanel>
        </TabContext>
      </Paper>
    </Box>
  );
};
