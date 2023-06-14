import BackButton from "@/shared/components/BackButton";
import { Toolbar, Box, Button, Divider, ButtonProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FunctionComponent } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ChevronRight from "@mui/icons-material/ChevronRight";

interface ActionBarProps {
  confirmButtonIcon?: "arrow" | "check";
  confirmButtonLabel?: string;
  confirmButtonIconPlace?: "start" | "end";
  showBackButton?: boolean;
}

const ActionBar: FunctionComponent<ActionBarProps> = (props) => {
  const {
    confirmButtonIcon,
    confirmButtonLabel,
    showBackButton,
    confirmButtonIconPlace,
  } = props;

  const confirmButtonIconElement =
    confirmButtonIcon === "arrow" ? (
      <ChevronRight />
    ) : confirmButtonIcon === "check" ? (
      <DoneIcon />
    ) : undefined;

  const confirmButtonIconPlaceProps: ButtonProps = {
    endIcon:
      confirmButtonIconPlace === "end" ? confirmButtonIconElement : undefined,
    startIcon:
      confirmButtonIconPlace === "start" ? confirmButtonIconElement : undefined,
  };

  return (
    <>
      <Divider />
      <Box bgcolor={grey["50"]} py={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" gap={2}>
            {showBackButton && <BackButton variant="outlined">Back</BackButton>}

            <Button variant="text">Cancel</Button>
          </Box>
          <Button disableElevation={false} {...confirmButtonIconPlaceProps}>
            {confirmButtonLabel}
          </Button>
        </Toolbar>
      </Box>
    </>
  );
};

export default ActionBar;

ActionBar.defaultProps = {
  confirmButtonIcon: "arrow",
  confirmButtonIconPlace: "end",
  confirmButtonLabel: "next",
};