import { DialogActionsProps } from "@/shared/components/General-Dialog/DialogActions";
import GeneralDialog, {
  GeneralDialogProps,
} from "@/shared/components/General-Dialog/GeneralDialog";
import { Typography, Box } from "@mui/material";
import { FunctionComponent } from "react";

interface RemoveMemberDialogProps
  extends Pick<GeneralDialogProps, "open">,
    Pick<DialogActionsProps, "onCancelClick" | "confirmButtonProps"> {
  // onConfirmClick: () => void;
  name: string;
  organization: string;
  email: string;
}

const RemoveMemberDialog: FunctionComponent<RemoveMemberDialogProps> = (
  props
) => {
  const { open, onCancelClick, confirmButtonProps, email, name, organization } =
    props;

  return (
    <GeneralDialog
      open={open}
      headerProps={{ color: "danger", label: "Remove Member?" }}
      actionsProps={{
        confirmButtonProps: {
          children: "Remove",
          color: "error",
          ...confirmButtonProps,
        },
        onCancelClick,
      }}
    >
      <Box maxWidth={420}>
        <Typography variant="body1" fontWeight={400} fontSize={16}>
          You are about to remove{" "}
          <Typography display="inline-block" fontWeight={700}>
            {name}
          </Typography>{" "}
          from the "
          <Typography display="inline-block" fontWeight={700}>
            {organization}
          </Typography>
          " organization. This action is irreversible.{" "}
          <Typography sx={{ mt: 3 }}>
            <Typography display="inline" fontWeight={700}>
              {email}
            </Typography>{" "}
            will no longer have access to this organization, and any content
            created by this user will be permanently deleted.
          </Typography>
        </Typography>
      </Box>
    </GeneralDialog>
  );
};

export default RemoveMemberDialog;
