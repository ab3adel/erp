import EmailIcon from "@/assets/images/Email icon.svg";
import InstaIcon from "@/assets/images/Instagram Icon.svg";
import LinkedInIcon from "@/assets/images/Linkedin.svg";
import { Box, IconButton } from "@mui/material";

export const SocialLinks = () => {
  return (
    <Box display="flex" columnGap={1}>
      <IconButton>
        <img src={InstaIcon} />
      </IconButton>
      <IconButton>
        <img src={LinkedInIcon} />
      </IconButton>
      <IconButton>
        <img src={EmailIcon} />
      </IconButton>
    </Box>
  );
};
