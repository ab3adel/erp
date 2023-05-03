import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ReceiptionsTable } from "./components/ReceiptionsTable";
import { TabContext, TabPanel } from "@mui/lab";
import { CurvedTabs } from "@/shared/components/curvedTabs/CurvedTabs";

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
      <TabContext value={value}>
        <CurvedTabs
          value={value}
          onChange={handleChange}
          tabs={[
            {
              label: "Reception",
              value: "0",
            },
            {
              label: "Approved inventory",
              value: "1",
            },
          ]}
        />
        <Paper elevation={0}>
          <TabPanel value="0" sx={{ p: 0, borderRadius: "0px 0px 12px 12px" }}>
            <ReceiptionsTable />
          </TabPanel>
        </Paper>
      </TabContext>
    </Box>
  );
};
