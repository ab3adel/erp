import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ReceiptionsTable } from "./components/ReceiptionsTable";
import { useGridApiRef } from "@mui/x-data-grid";
import { useAddReceiption } from "./hooks";

export const Receiptions = () => {
  const apiRef = useGridApiRef();
  const { dispatch, isRowAdded } = useAddReceiption(apiRef);

  return (
    <Box>
      <Button
        startIcon={<AddIcon />}
        sx={{ position: "absolute", top: "10px", right: 0 }}
        onClick={() => {
          dispatch({ type: "ADD_RECEIPTION" });
        }}
      >
        NEW RECEIPTION
      </Button>
      <ReceiptionsTable
        apiRef={apiRef}
        dispatch={dispatch}
        isRowAdded={isRowAdded}
      />
    </Box>
  );
};
