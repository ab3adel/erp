import { DialogActionsProps } from "@/shared/components/General-Dialog/DialogActions";
import GeneralDialog, {
  GeneralDialogProps,
} from "@/shared/components/General-Dialog/GeneralDialog";
import { Typography, Box } from "@mui/material";
import { FunctionComponent } from "react";

interface DeactivateMemberDialogProps
  extends Pick<GeneralDialogProps, "open">,
    Pick<DialogActionsProps, "onCancelClick" | "confirmButtonProps"> {
  name: string;
  organization: string;
}

const DeactivateMemberDialog: FunctionComponent<DeactivateMemberDialogProps> = (
  props
) => {
  const { open, onCancelClick, confirmButtonProps, name, organization } = props;

  return (
    <GeneralDialog
      open={open}
      headerProps={{ label: "Deactivate Member?" }}
      actionsProps={{
        confirmButtonProps: { children: "deactivate", ...confirmButtonProps },
        onCancelClick: onCancelClick,
      }}
    >
      <Box maxWidth={420}>
        <Typography variant="body1" fontWeight={400} fontSize={16}>
          You are about to deactivate{" "}
          <Typography display="inline-block" fontWeight={700}>
            {name}
          </Typography>{" "}
          from the "{" "}
          <Typography display="inline-block" fontWeight={700}>
            {organization}
          </Typography>
          " organization. You can reactivate this user in the future.
          <Typography sx={{ mt: 3 }}>
            You will still have access to any content and important data created
            by this user.
          </Typography>
        </Typography>
      </Box>
    </GeneralDialog>
  );
};

export default DeactivateMemberDialog;
