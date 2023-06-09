import { Dialog, DialogContent, Typography, Box } from "@mui/material";
import { FunctionComponent } from "react";
import Header from "./Header";
import DialogActions from "./DialogActions";

interface GeneralDialogProps {}

const GeneralDialog: FunctionComponent<GeneralDialogProps> = () => {
  return (
    <Dialog
      open={true}
      PaperProps={{
        elevation: 4,

        style: { borderRadius: 4, paddingBottom: 0, width: "auto" },
      }}
    >
      <Header />

      <DialogContent style={{ marginTop: 20, minWidth: "none" }}>
        <Box maxWidth={450}>
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
      </DialogContent>

      <DialogActions />
    </Dialog>
  );
};

export default GeneralDialog;
