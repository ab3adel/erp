import {
  DialogProps,
  DialogActions,
  DialogContent,
  Dialog,
  ButtonProps as MuiButtonProps,
  Button,
  DialogTitle,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const GenericDialog = ({
  onClose,
  onSubmit,
  dialog,
  children,
  hideCloseButton = true,
  color,
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
      <DialogTitle
        variant="h3"
        textAlign="center"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: hideCloseButton ? "center" : "space-between",
          ...(color && {
            bgcolor: `${color} !important`,
            color: (theme) => `${theme.palette.common.black} !important`,
          }),
          ...dialog.dialogTitleSx,
        }}
      >
        {title}
        {!hideCloseButton && (
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "common.black" }} />
          </IconButton>
        )}
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
          <Button variant="text" onClick={onSubmit} {...submitButtonProps}>
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
    dialogTitleSx?: SxProps<Theme>;
  };
  onClose: () => void;
  onSubmit?: () => void;
  hideCloseButton?: boolean;
  color?: string;
};
