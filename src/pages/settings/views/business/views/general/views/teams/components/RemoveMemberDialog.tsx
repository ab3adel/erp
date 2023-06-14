import { DialogActionsProps } from "@/shared/components/General-Dialog/DialogActions";
import GeneralDialog, {
  GeneralDialogProps,
} from "@/shared/components/General-Dialog/GeneralDialog";
import { Typography, Box } from "@mui/material";
import { FunctionComponent } from "react";

interface RemoveMemberDialogProps
  extends Pick<GeneralDialogProps, "open">,
    Pick<DialogActionsProps, "onCancelClick" | "onConfirmClick"> {}

const RemoveMemberDialog: FunctionComponent<RemoveMemberDialogProps> = (
  props
) => {
  const { open, onCancelClick, onConfirmClick } = props;

  return (
    <GeneralDialog
      open={open}
      headerProps={{ color: "danger", label: "Remove Member?" }}
      actionsProps={{
        confirmColor: "danger",
        confirmLabel: "Remove",
        onCancelClick,
        onConfirmClick,
      }}
    >
      <Box maxWidth={420}>
        <Typography variant="body1" fontWeight={400} fontSize={16}>
          You are about to remove{" "}
          <Typography display="inline-block" fontWeight={700}>
            Olivia Roe
          </Typography>{" "}
          from the "
          <Typography display="inline-block" fontWeight={700}>
            Long Miles Burundi
          </Typography>
          " organization. This action is irreversible.{" "}
          <Typography sx={{ mt: 3 }}>
            <Typography display="inline" fontWeight={700}>
              olivia@longmiles.com
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
