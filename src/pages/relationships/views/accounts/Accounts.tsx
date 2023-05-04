import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AccountsTable } from "./components/AccountsTable";

export const Accounts = () => {
  return (
    <Box>
      <Button
        startIcon={<AddIcon />}
        sx={{ position: "absolute", top: "10px", right: 0 }}
      >
        NEW ACCOUNT
      </Button>
      <AccountsTable />
    </Box>
  );
};
