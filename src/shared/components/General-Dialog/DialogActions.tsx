import { FunctionComponent } from "react";
import MUIDialogActions from "@mui/material/DialogActions";
import { Button, ButtonBase } from "@mui/material";

interface DialogActionsProps {}

const DialogActions: FunctionComponent<DialogActionsProps> = () => {
  return (
    <MUIDialogActions style={{ padding: 4, paddingBlock: 12 }}>
      <Button variant="text" sx={{ color: "#24282899" }}>
        Cancel
      </Button>
      <Button variant="text" sx={{ color: "#BB2118" }}>
        Remove
      </Button>
    </MUIDialogActions>
  );
};

export default DialogActions;
