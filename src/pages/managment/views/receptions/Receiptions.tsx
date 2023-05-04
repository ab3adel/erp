import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ReceiptionsTable } from "./components/ReceiptionsTable";

export const Receiptions = () => {
  return (
    <Box>
      <Button
        startIcon={<AddIcon />}
        sx={{ position: "absolute", top: "10px", right: 0 }}
      >
        NEW RECEIPTION
      </Button>
      <ReceiptionsTable />
    </Box>
  );
};
