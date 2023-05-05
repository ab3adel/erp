import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarProps,
} from "@mui/x-data-grid";
import { Box, Button, Divider, Typography } from "@mui/material";
import { GenericDialog, useDialog, useGenericMutation } from "@/shared";
import { removeReceiption } from "../graphql/mutations";
import { Action } from "../types";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

export const ReceiptionsTableToolbar = (
  props: ReceiptionsTableToolbarProps
) => {
  const { rowsSelection, dispatch, isRowAdded } = props;
  const { openDialog, closeDialog, isDialogOpen } =
    useDialog<"deleteReceiption">();
  const [deleteReceiption] = useGenericMutation<
    { __typename: string },
    { id: string }
  >(removeReceiption, { refetchQueries: ["ReceptionsQuery"] });

  const handleDeleteReceiption = () => {
    const [id] = rowsSelection;
    deleteReceiption({
      variables: { id },
      onCompleted: () => {
        closeDialog();
      },
    });
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: "end", m: 2 }}>
      {rowsSelection.length && !isRowAdded ? (
        <>
          <Box display="flex" columnGap={2}>
            <Button
              variant="text"
              startIcon={<DeleteIcon />}
              disabled={rowsSelection.length !== 1}
              onClick={() => {
                openDialog("deleteReceiption");
              }}
            >
              Delete
            </Button>
          </Box>
          <Divider orientation="vertical" />
        </>
      ) : (
        <></>
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
      <GenericDialog
        open={isDialogOpen("deleteReceiption")}
        onClose={closeDialog}
        maxWidth="xs"
        dialog={{
          title: "Delete Receiption ? ",
          submitButton: {
            label: "Delete",
            variant: "text",
          },
        }}
        onSubmit={handleDeleteReceiption}
      >
        <Typography variant="body1" sx={{ color: "common.black" }}>
          Are you sure you want to delete this receiption ?
        </Typography>
      </GenericDialog>
    </GridToolbarContainer>
  );
};

type ReceiptionsTableToolbarProps = GridToolbarProps & {
  rowsSelection: string[];
  dispatch: (action: Action) => void;
  isRowAdded: boolean;
};
