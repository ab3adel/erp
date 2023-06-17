import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import AboutIcon from "@mui/icons-material/InfoOutlined";

const AvatarHelperText: FunctionComponent = () => {
  return (
    <Typography
      variant="body2"
      sx={{
        color: "text.secondary",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AboutIcon sx={{ mr: 1 }} fontSize="small" /> Ideal dimensions: 100 x 100
      pixels.
    </Typography>
  );
};

export default AvatarHelperText;
