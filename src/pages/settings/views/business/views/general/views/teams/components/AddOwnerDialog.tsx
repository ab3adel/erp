import GeneralDialog, {
  GeneralDialogProps,
} from "@/shared/components/General-Dialog/GeneralDialog";
import {
  Typography,
  Box,
  TextField,
  Alert,
  TextFieldProps,
} from "@mui/material";
import { FunctionComponent } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { DialogActionsProps } from "@/shared/components/General-Dialog/DialogActions";

interface AddOwnerDialogProps
  extends Pick<GeneralDialogProps, "open">,
    Pick<DialogActionsProps, "onCancelClick" | "confirmButtonProps"> {
  emailFieldProps: TextFieldProps;
}

const AddOwnerDialog: FunctionComponent<AddOwnerDialogProps> = (props) => {
  const { open, onCancelClick, confirmButtonProps, emailFieldProps } = props;

  return (
    <GeneralDialog
      open={open}
      headerProps={{ label: "Add Owner" }}
      actionsProps={{
        confirmButtonProps: {
          children: "send invite",
          ...confirmButtonProps,
        },
        onCancelClick: onCancelClick,
      }}
    >
      <Box maxWidth={600}>
        <Alert
          sx={{
            background: "rgba(237, 108, 2, 0.3)",
            color: "#E65100",
            border: "1px solid #E65100",
            paddingBlock: 0,
          }}
          variant="filled"
          severity="warning"
          color="warning"
          icon={<WarningAmberIcon sx={{ color: "#E65100;" }} />}
        >
          <Typography variant="body2">
            You are about to grant “Owner” access to someone who will be able to
            edit, create, and delete data and organizations.
          </Typography>
        </Alert>

        <Box mt={2}>
          <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
            Enter a valid email address to send an “Owner” invite
          </Typography>
          <TextField
            variant="filled"
            fullWidth
            label="Email Address"
            {...emailFieldProps}
          />
        </Box>
      </Box>
    </GeneralDialog>
  );
};

export default AddOwnerDialog;
