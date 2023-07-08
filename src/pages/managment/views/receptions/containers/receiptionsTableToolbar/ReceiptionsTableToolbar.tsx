import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarProps,
} from "@mui/x-data-grid-pro";
import { Box, Button, Divider } from "@mui/material";

import { Action } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import DeleteAction from "./deleteAction/DeleteAction";

export const ReceiptionsTableToolbar = (
  props: ReceiptionsTableToolbarProps
) => {
  const { rowsSelection, dispatch, isRowAdded } = props;

  return (
    <GridToolbarContainer sx={{ justifyContent: "end", m: 2 }}>
      {rowsSelection.length > 0 && !isRowAdded && (
        <>
          <DeleteAction />
          <Divider orientation="vertical" />
        </>
      )}

      {isRowAdded ? (
        <>
          <Box display="flex" columnGap={2}>
            <Button
              variant="text"
              startIcon={<SaveIcon />}
              onClick={() => {
                dispatch({ type: "SAVE_RECEIPTION" });
              }}
            >
              Save row
            </Button>
            <Button
              variant="text"
              startIcon={<DeleteIcon />}
              onClick={() => {
                dispatch({ type: "CANCEL_RECEIPTION" });
              }}
            >
              Cancel
            </Button>
          </Box>
          <Divider orientation="vertical" />
        </>
      ) : (
        <></>
      )}
      <GridToolbarExport variant="text" />
      <GridToolbarColumnsButton variant="text" />
    </GridToolbarContainer>
  );
};

type ReceiptionsTableToolbarProps = GridToolbarProps & {
  rowsSelection: string[];
  dispatch: (action: Action) => void;
  isRowAdded: boolean;
};
