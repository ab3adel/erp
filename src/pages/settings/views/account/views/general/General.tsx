import { Box, Typography } from "@mui/material";
import { GeneralInfoForm } from "./components/GeneralInfoForm";

export const General = () => {
  return (
    <Box mx="24px">
      <Box py={7}>
        <Typography variant="h2" sx={{ color: "common.black", mb: "16px" }}>
          Your Profile
        </Typography>
        <Typography variant="body1">
          These are the general settings of your account profile.
        </Typography>
      </Box>

      <GeneralInfoForm />
    </Box>
  );
};
