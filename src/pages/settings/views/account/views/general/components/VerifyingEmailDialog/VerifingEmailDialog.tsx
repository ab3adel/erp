import GeneralDialog from "@/shared/components/General-Dialog/GeneralDialog";
import {
  Box,
  ButtonProps,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";

interface VerifingEmailDialogProps {
  textfieldProps?: TextFieldProps;
  confirmButtonProps?: ButtonProps;
  verifiyEmail?: string;
  onCancel?: () => void;
  open: boolean;
}

const VerifingEmailDialog: FunctionComponent<VerifingEmailDialogProps> = (
  props
) => {
  const { onCancel, textfieldProps, confirmButtonProps, verifiyEmail, open } =
    props;
  return (
    <GeneralDialog
      open={open}
      headerProps={{ label: "New Email Address" }}
      actionsProps={{
        onCancelClick: onCancel,
        confirmButtonProps: {
          children: "update email",
          color: "primary",
          ...confirmButtonProps,
        },
      }}
    >
      <Box maxWidth={400} display="flex" flexDirection="column" gap={2}>
        <Typography color="text.primary" variant="body1">
          We sent a verification code to{" "}
          <span style={{ fontWeight: 700 }}>{verifiyEmail}.</span> Please enter
          the verification code below.
        </Typography>
        <TextField
          variant="filled"
          fullWidth
          label="Enter Verification Code*"
          {...textfieldProps}
        />
      </Box>
    </GeneralDialog>
  );
};

export default VerifingEmailDialog;
