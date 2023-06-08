import { FunctionComponent } from "react";
import { Box, Typography } from "@mui/material";

const Header: FunctionComponent = () => {
  return (
    <Box>
      <Typography color="rgba(36, 40, 40, 0.87)" fontWeight={500} variant="h6">
        Organization Details
      </Typography>
      <Typography
        color="rgba(36, 40, 40, 0.6)"
        lineHeight={2.8}
        variant="body1"
      >
        Please enter your organization details. They will be applied to the
        entire account.
      </Typography>
    </Box>
  );
};

export default Header;
