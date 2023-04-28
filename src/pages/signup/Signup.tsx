import { Box, Typography } from "@mui/material";
import MainLogo from "@/assets/images/main-logo-white.svg";
import { LeftSideContainer, SignupForm } from "./components";

export const Signup = () => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{
        xs: "column",
        md: "row",
      }}
      height="100%"
      sx={{ backgroundColor: "#fff" }}
    >
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
          Signup to start!
        </Typography>
      </LeftSideContainer>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={3}
        width={{
          xs: "100%",
          md: "65%",
        }}
      >
        <SignupForm />
      </Box>
    </Box>
  );
};
