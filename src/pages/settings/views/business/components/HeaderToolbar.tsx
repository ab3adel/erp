import { Box, Toolbar } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface HeaderToolbarProps {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
}

const HeaderToolbar: FunctionComponent<HeaderToolbarProps> = (props) => {
  const { leftComponent, rightComponent } = props;

  return (
    <Toolbar
      disableGutters
      sx={{ minHeight: "50px !important", justifyContent: "space-between" }}
    >
      <Box>{leftComponent}</Box>
      <Box>{rightComponent}</Box>
    </Toolbar>
  );
};

export default HeaderToolbar;
