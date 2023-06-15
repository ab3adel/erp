import {
  Dialog,
  Box,
  Button,
  ButtonProps,
  DialogProps,
  Divider,
  IconButton,
  Typography,
  TypographyProps,
} from "@mui/material";
import closeIcon from "@/assets/images/close.svg";
import multiOrganizationActivateScreenshot from "@/assets/images/multi-organization-activate-screenshot.png";
import BuldingIcon from "@/assets/images/building-icon.svg";
import { FunctionComponent } from "react";

export interface MultiOrganizationManagmentDialogProps {
  open?: boolean;
  contactButtonProps?: ButtonProps;
  closeButtonProps?: ButtonProps;
}

const MultiOrganizationManagmentDialog: FunctionComponent<
  MultiOrganizationManagmentDialogProps
> = (props) => {
  const { open, contactButtonProps, closeButtonProps } = props;

  const DialogProps: DialogProps = {
    open: !!open,
    fullWidth: true,
    maxWidth: "lg",
    PaperProps: { style: { maxHeight: "none" } },
  };

  const mainHeaderTypographyProps: TypographyProps = {
    sx: {
      fontWeight: 600,
      fontSize: 24,
      color: "rgba(36, 40, 40, 0.87)",
    },
  };

  const mainParagraphTypographyProps: TypographyProps = {
    sx: {
      fontWeight: "500",
      color: "rgba(36, 40, 40, 0.6)",
    },
  };

  const contactUsButtonProps: ButtonProps = {
    sx: {
      fontSize: 15,
      fontWeight: 500,
    },
    disableElevation: false,
    ...contactButtonProps,
  };

  const mainImageProps: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > = {
    src: multiOrganizationActivateScreenshot,
    alt: "multi-organization activating screenshot",
  };

  const secondaryHeaderProps: TypographyProps = {
    variant: "h6",
    fontWeight: 500,
    color: "rgba(36, 40, 40, 0.87)",
  };

  const secondaryParagraphProps: TypographyProps = {
    fontWeight: 500,
    color: "rgba(36, 40, 40, 0.6)",
    fontSize: 16,
  };

  return (
    <Dialog {...DialogProps}>
      <Box px={3} py={2}>
        <Box textAlign="right">
          <IconButton size="small" {...closeButtonProps}>
            <img src={closeIcon} />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" my={2}>
          <Box width="100%">
            <Typography {...mainHeaderTypographyProps}>
              Unlock the Power of Multi-Organization Management
            </Typography>

            <Typography {...mainParagraphTypographyProps}>
              Contact our customer success team today to learn more and unlock
              this exclusive feature!
            </Typography>
          </Box>

          <Box flexShrink={0}>
            <Button {...contactUsButtonProps}>contact us</Button>
          </Box>
        </Box>
        <Box my={4}>
          <Divider />
        </Box>
        <Box mt={2} display="flex" gap={5} alignItems="center">
          <img {...mainImageProps} />

          <Box display="flex" flexDirection="column" gap={2} maxWidth={350}>
            <img src={BuldingIcon} alt="building icon" width={47} />

            <Typography {...secondaryHeaderProps}>
              Effortlessly manage multiple organizations
            </Typography>

            <Typography {...secondaryParagraphProps}>
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
