import { Toolbar } from "@mui/material";
import { FunctionComponent } from "react";
import arrowLeftIcon from "@/assets/images/arrow-left.svg";
import { Button } from "@material-ui/core";

interface NavigateBackContainerProps {
  backLabel?: string;
  onNavigateBackClick?: () => void;
}

const NavigateBackContainer: FunctionComponent<NavigateBackContainerProps> = (
  props
) => {
  const { backLabel, onNavigateBackClick } = props;

  return (
    <Toolbar disableGutters>
      <Button
        variant="text"
        onClick={onNavigateBackClick}
        startIcon={<img src={arrowLeftIcon} />}
      >
        {backLabel}
      </Button>
    </Toolbar>
  );
};

export default NavigateBackContainer;
