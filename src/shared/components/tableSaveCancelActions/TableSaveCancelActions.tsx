import { Button, ButtonProps } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { FunctionComponent } from "react";

interface TableSaveCancelActionsProps {
  cancelProps?: ButtonProps;
  ConfirmProps?: ButtonProps;
}

const TableSaveCancelActions: FunctionComponent<TableSaveCancelActionsProps> = (
  props
) => {
  const { ConfirmProps, cancelProps } = props;

  return (
    <>
      <Button variant="text" startIcon={<SaveIcon />} {...ConfirmProps}>
        Save row
      </Button>

      <Button variant="text" startIcon={<DeleteIcon />} {...cancelProps}>
        Cancel
      </Button>
    </>
  );
};

export default TableSaveCancelActions;
