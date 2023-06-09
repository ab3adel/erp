import { DialogTitle, Typography, useTheme } from "@mui/material";
import { FunctionComponent } from "react";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const theme = useTheme();
  return (
    <DialogTitle
      style={{
        background: "#BB2118",
        paddingInline: 24,
        paddingBlock: 20,
        height: "auto",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={500}
        fontSize={20}
        color="rgba(255, 255, 255, 1);
"
      >
        Remove Member?
      </Typography>
    </DialogTitle>
  );
};

export default Header;
