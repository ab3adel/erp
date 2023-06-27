import { DialogActionsProps } from "@/shared/components/General-Dialog/DialogActions";
import GeneralDialog from "@/shared/components/General-Dialog/GeneralDialog";
import {
  Box,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import MergeSharpIcon from "@mui/icons-material/MergeSharp";

interface ApproveReceiptionsProps
  extends Pick<DialogActionsProps, "confirmButtonProps" | "onCancelClick"> {
  open?: boolean;
  type: "single" | "selection";
  withCombine?: boolean;
  totalWeight?: number;
  approveAndCombineProps?: CheckboxProps;
  textfieldProps?: TextFieldProps;
}

const ApproveReceiptions: FunctionComponent<ApproveReceiptionsProps> = (
  props
) => {
  const {
    confirmButtonProps,
    onCancelClick,
    open,
    type,
    withCombine,
    totalWeight,
    approveAndCombineProps,
    textfieldProps,
  } = props;

  return (
    <GeneralDialog
      open={!!open}
      headerProps={{ label: "Approve?" }}
      actionsProps={{
        confirmButtonProps: {
          children: withCombine ? "approve & Combine" : "Approve",
          ...confirmButtonProps,
        },
        onCancelClick,
      }}
    >
      <Typography sx={{ maxWidth: 400 }}>
        {type === "single" &&
          `Are you sure you want to approve this reception? Once approved, further
        changes cannot be made.`}

        {type === "selection" &&
          `Are you sure you want to approve this selection? Once approved, further changes cannot be made. `}
      </Typography>
      {type === "selection" && (
        <Box m={2} mb={0}>
          <FormControlLabel
            control={<Checkbox {...approveAndCombineProps} />}
            label="I want to approve and combine"
          />
        </Box>
      )}

      {withCombine && (
        <>
          <Stack spacing={1}>
            <List>
              <ListItem
                sx={(theme) => ({
                  bgcolor: theme.palette.action.hover,
                  borderRadius: 1,
                  border: `solid 1.5px ${theme.palette.primary.main}`,
                })}
              >
                <ListItemIcon>
                  <MergeSharpIcon />
                </ListItemIcon>
                <ListItemText
                  primary={totalWeight?.toLocaleString("en-us")}
                  secondary="Combined Total Weight (Kg)"
                />
              </ListItem>
            </List>
            <TextField
              variant="filled"
              label="Enter New Lot Name"
              {...textfieldProps}
            />
          </Stack>
        </>
      )}
    </GeneralDialog>
  );
};

export default ApproveReceiptions;
