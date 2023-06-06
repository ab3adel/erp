import { Dialog } from "@material-ui/core";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import closeIcon from "@/assets/images/close.svg";
import multiOrganizationActivateScreenshot from "@/assets/images/multi-organization-activate-screenshot.png";
import BuldingIcon from "@/assets/images/building-icon.svg";

const MultiOrganizationManagmentDialog = () => {
  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth="lg"
      PaperProps={{ style: { maxHeight: "none" } }}
    >
      <Box px={3} py={2}>
        <Box textAlign="right">
          <IconButton size="small">
            <img src={closeIcon} />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" my={2}>
          <Box width="100%">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 24,
                color: "rgba(36, 40, 40, 0.87)",
              }}
            >
              Unlock the Power of Multi-Organization Management
            </Typography>

            <Typography
              sx={{ fontWeight: "500", color: "rgba(36, 40, 40, 0.6)" }}
            >
              Contact our customer success team today to learn more and unlock
              this exclusive feature!
            </Typography>
          </Box>

          <Box flexShrink={0}>
            <Button sx={{ fontSize: 15 }} disableElevation={false}>
              contact us
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box mt={2} display="flex" gap={5} alignItems="center">
          <img
            src={multiOrganizationActivateScreenshot}
            alt="multi-organiztion activating screenshot"
          />

          <Box display="flex" flexDirection="column" gap={2}>
            <img src={BuldingIcon} alt="building icon" width={47} />

            <Typography
              variant="h6"
              fontWeight={500}
              color="rgba(36, 40, 40, 0.87);
"
            >
              Effortlessly manage multiple organizations
            </Typography>

            <Typography
              variant="body1"
              fontWeight={500}
              color="rgba(36, 40, 40, 0.6)"
              fontSize={16}
            >
              Access each organization's data separately and together,
              streamline collaboration, and simplify administration.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MultiOrganizationManagmentDialog;
