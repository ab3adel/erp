import { FunctionComponent } from "react";
import MUIDialogActions from "@mui/material/DialogActions";
import { Button, ButtonProps } from "@mui/material";

export interface DialogActionsProps {
  cancelLabel?: string;
  onCancelClick?: () => void;
  confirmButtonProps?: ButtonProps;
}

const DialogActions: FunctionComponent<DialogActionsProps> = (props) => {
  const { cancelLabel, onCancelClick, confirmButtonProps } = props;

  return (
    <MUIDialogActions disableSpacing style={{ padding: 12, paddingBlock: 12 }}>
      <Button
        variant="text"
        sx={{ color: "rgba(36, 40, 40, 0.6)" }}
        onClick={onCancelClick}
      >
        {cancelLabel}
      </Button>
      <Button variant="contained" {...confirmButtonProps} />
    </MUIDialogActions>
  );
};

export default DialogActions;

DialogActions.defaultProps = {
  cancelLabel: "Cancel",
};
