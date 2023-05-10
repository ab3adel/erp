import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AccountsTable } from "./components/AccountsTable";
import { useAddAccount } from "./hooks/useAddAccount";
import { useGridApiRef } from "@mui/x-data-grid";

export const Accounts = () => {
  const apiRef = useGridApiRef();
  const { dispatch, isRowAdded } = useAddAccount(apiRef);
  return (
    <Box>
      <Button
        startIcon={<AddIcon />}
        sx={{ position: "absolute", top: "10px", right: 0 }}
        onClick={() => {
          dispatch({ type: "ADD_ACCOUNT" });
        }}
      >
        NEW ACCOUNT
      </Button>
      <AccountsTable
        dispatch={dispatch}
        isRowAdded={isRowAdded}
        apiRef={apiRef}
      />
    </Box>
  );
};
