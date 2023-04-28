import { Box, Typography } from "@mui/material";
import MainLogo from "@/assets/images/main-logo-white.svg";
import { LeftSideContainer } from "./components";

export const Login = () => {
  return (
    <Box width="100%" display="flex" height="100%">
      <LeftSideContainer>
        <img src={MainLogo} />
        <Typography
          fontSize={{ xs: 30, md: 48 }}
          fontWeight={400}
          color="white"
        >
          Welcome to our prototype!
        </Typography>
        <Typography
          variant="body1"
          color="white"
          fontWeight={400}
          lineHeight={"150%"}
          mt={2}
        >
          For this prototyping session please keep in mind:
          <li>There are not wrong or right answers</li>
          <li>Some things may not work. Not all buttons are clickable</li>
          <li>Your feedback is important for us </li>
        </Typography>
        <Typography
          sx={{ my: 4 }}
          color="white"
          fontWeight={600}
          lineHeight={"150%"}
        >
          Complete these three goals in order: <br />
          <br />
          1. Describe what you see <br />
          2. Approve pending lots in bulk <br />
          3. Pay unpaid <br />
          lots in bulk <br />
          <br />
          Login to start!
        </Typography>
      </LeftSideContainer>
    </Box>
  );
};
