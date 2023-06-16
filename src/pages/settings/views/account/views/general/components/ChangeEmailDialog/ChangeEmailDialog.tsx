import GeneralDialog from "@/shared/components/General-Dialog/GeneralDialog";
import {
  Box,
  ButtonProps,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface ChangeEmailDialogProps {
  textfieldProps?: TextFieldProps;
  confirmButtonProps?: ButtonProps;
  onCancel?: () => void;
  open: boolean;
}

const ChangeEmailDialog: FunctionComponent<ChangeEmailDialogProps> = (
  props
) => {
  const { onCancel, textfieldProps, confirmButtonProps, open } = props;
  return (
    <GeneralDialog
      open={open}
      headerProps={{ label: "New Email Address" }}
      actionsProps={{
        onCancelClick: onCancel,
        confirmButtonProps: {
          children: "Verify email",
          color: "primary",
          endIcon: <ChevronRightIcon />,
          ...confirmButtonProps,
        },
      }}
    >
      <Box maxWidth={400} display="flex" flexDirection="column" gap={2}>
        <Typography color="text.primary" variant="body1">
          Enter your new email address. A verification code will be sent to your
          new email address.
        </Typography>
        <TextField
          variant="filled"
          fullWidth
          autoFocus
          label="Enter New Email*"
          {...textfieldProps}
        />
      </Box>
    </GeneralDialog>
  );
};

export default ChangeEmailDialog;
