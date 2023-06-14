import { FunctionComponent } from "react";
import MUIDialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";

export interface DialogActionsProps {
  confirmLabel?: string;
  confirmColor?: "danger" | "default";
  cancelLabel?: string;
  onCancelClick?: () => void;
  onConfirmClick?: () => void;
}

const DialogActions: FunctionComponent<DialogActionsProps> = (props) => {
  const {
    confirmColor,
    confirmLabel,
    cancelLabel,
    onCancelClick,
    onConfirmClick,
  } = props;

  const confirmTextColor = confirmColor === "danger" ? "#BB2118" : "#008E8F";

  return (
    <MUIDialogActions disableSpacing style={{ padding: 4, paddingBlock: 12 }}>
      <Button
        variant="text"
        sx={{ color: "#24282899" }}
        onClick={onCancelClick}
      >
        {cancelLabel}
      </Button>
      <Button
        variant="text"
        sx={{ color: confirmTextColor }}
        onClick={onConfirmClick}
      >
        {confirmLabel}
      </Button>
    </MUIDialogActions>
  );
};

export default DialogActions;

DialogActions.defaultProps = {
  cancelLabel: "Cancel",
  confirmColor: "default",
};
