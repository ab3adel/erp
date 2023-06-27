import { DialogActionsProps } from "@/shared/components/General-Dialog/DialogActions";
import GeneralDialog from "@/shared/components/General-Dialog/GeneralDialog";
import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface DeleteReceiptionsProps
  extends Pick<DialogActionsProps, "confirmButtonProps" | "onCancelClick"> {
  open?: boolean;
  numberToDelete?: number;
}

const DeleteReceiptions: FunctionComponent<DeleteReceiptionsProps> = (
  props
) => {
  const { confirmButtonProps, onCancelClick, open, numberToDelete } = props;

  return (
    <GeneralDialog
      open={!!open}
      headerProps={{ label: "Delete Receiptions?", color: "danger" }}
      actionsProps={{
        confirmButtonProps: {
          children: "Approve",
          color: "error",
          ...confirmButtonProps,
        },
        onCancelClick,
      }}
    >
      <Typography sx={{ maxWidth: 400 }}>
        Are you sure you want to delete {numberToDelete ?? 0} receptions? You
        will not be able to undo this action after a few seconds.
      </Typography>
    </GeneralDialog>
  );
};

export default DeleteReceiptions;
