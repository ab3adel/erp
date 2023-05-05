import {
  DialogProps,
  DialogActions,
  DialogContent,
  Dialog,
  ButtonProps as MuiButtonProps,
  Button,
  DialogTitle,
} from "@mui/material";

export const GenericDialog = ({
  onClose,
  onSubmit,
  dialog,
  children,
  ...props
}: GenericDialogProps) => {
  const {
    title,
    closeButton = { label: "Cancel" },
    submitButton = { label: "Submit" },
  } = dialog;
  const { label: submitButtonLabel, ...submitButtonProps } = submitButton;
  const { label: closeButtonLabel, ...closeButtonProps } = closeButton;

  return (
    <Dialog onClose={onClose} fullWidth {...props}>
      <DialogTitle sx={{ pb: 3 }} variant="h3" textAlign="center">
        {title}
      </DialogTitle>
      <DialogContent sx={{ px: "8px", py: 3 }}>{children}</DialogContent>
      <DialogActions
        sx={{
          justifyContent: "end",
          columnGap: 1,
          rowGap: 1,
          flexWrap: "wrap",
        }}
      >
        {!!closeButton && (
          <Button
            variant="text"
            color="secondary"
            {...closeButtonProps}
            onClick={onClose}
            sx={{ m: "0px !important" }}
          >
            {closeButtonLabel}
          </Button>
        )}
        {!!submitButton && (
          <Button variant="text" {...submitButtonProps} onClick={onSubmit}>
            {submitButtonLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export type GenericDialogProps = Omit<DialogProps, "onClose" | "onSubmit"> & {
  dialog: {
    title: string;
    submitButton?: MuiButtonProps & {
      label: string;
    };
    closeButton?: MuiButtonProps & {
      label: string;
    };
  };
  onClose: () => void;
  onSubmit?: () => void;
};
