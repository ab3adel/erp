import { Box, Grid, Paper } from "@mui/material";
import Farmer from "@/assets/images/farmer.png";
import MainLogo from "@/assets/images/main_logo.svg";
import { RightSideContainer, SignupForm } from "./components";
import { redirect } from "react-router-dom";
import { SocialLinks } from "../login/components/SocialLinks";

const loader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return redirect("/");
  }
  return null;
};

export const Signup = () => {
  return (
    <Grid container height="100%" position="relative">
      <Box
        component="img"
        src={Farmer}
        sx={{
          position: "absolute",
          width: {
            xs: "100%",
            lg: "36%",
            md: "52%",
          },
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
      <Grid item md={6} lg={4} sx={{ display: { xs: "none", md: "flex" } }} />
      <RightSideContainer
        xs={12}
        md={6}
        lg={8}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={3}
      >
        <Paper elevation={8} sx={{ borderRadius: "32px", p: 5, mb: 3 }}>
          <Box textAlign="center" mb={2}>
            <img src={MainLogo} />
          </Box>
          <Box px={3}>
            <SignupForm />
          </Box>
        </Paper>
        <SocialLinks />
      </RightSideContainer>
    </Grid>
  );
};

Signup.loader = loader;
