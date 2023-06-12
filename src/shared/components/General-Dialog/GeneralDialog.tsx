import { Dialog, DialogContent } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import Header, { DialogHeaderProps } from "./DialogHeader";
import DialogActions, { DialogActionsProps } from "./DialogActions";

export interface GeneralDialogProps {
  headerProps?: DialogHeaderProps;
  actionsProps?: DialogActionsProps;
  children?: ReactNode;
  open: boolean;
}

const GeneralDialog: FunctionComponent<GeneralDialogProps> = (props) => {
  const { actionsProps, headerProps, children, open } = props;

  return (
    <Dialog
      PaperProps={{
        elevation: 4,
        style: {
          borderRadius: 4,
          paddingBottom: 0,
          width: "auto",
          maxWidth: "none",
        },
      }}
      open={open}
    >
      {headerProps && <Header {...headerProps} />}

      <DialogContent dividers style={{ marginTop: 0, minWidth: "none" }}>
        {children}
      </DialogContent>

      {actionsProps && <DialogActions {...actionsProps} />}
    </Dialog>
  );
};

export default GeneralDialog;
