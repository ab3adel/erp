import {
  Toolbar,
  Box,
  Button,
  Divider,
  ButtonProps,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FunctionComponent } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ChevronRight from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface ActionBarProps {
  confirmButtonIcon?: "arrow" | "check";
  confirmButtonLabel?: string;
  confirmButtonIconPlace?: "start" | "end";
  showBackButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  backButtonProps?: ButtonProps;
}

const ActionBar: FunctionComponent<ActionBarProps> = (props) => {
  const {
    confirmButtonIcon,
    confirmButtonLabel,
    showBackButton,
    confirmButtonIconPlace,
    backButtonProps,
    cancelButtonProps,
    confirmButtonProps,
    showCancelButton,
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

  const theme = useTheme();

  return (
    <>
      <Divider />
      <Box bgcolor={grey["50"]} py={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" gap={2}>
            {showBackButton && (
              <Button
                startIcon={<KeyboardArrowLeftIcon />}
                variant="outlined"
                {...backButtonProps}
              >
                Back
              </Button>
            )}
            {showCancelButton && (
              <Button
                variant="text"
                style={{ color: theme.palette.text.secondary }}
                {...cancelButtonProps}
              >
                Cancel
              </Button>
            )}
          </Box>
          <Button
            disableElevation={false}
            {...confirmButtonIconPlaceProps}
            {...confirmButtonProps}
          >
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
