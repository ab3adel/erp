import { Box, Grid, Paper } from "@mui/material";
import Farmer from "@/assets/images/farmer.png";
import MainLogo from "@/assets/images/main_logo.svg";
import { LoginForm, RightSideContainer } from "./components";
import { redirect } from "react-router-dom";
import Cookies from "js-cookie";

const loader = () => {
  const token = Cookies.get("token");
  if (token) {
    return redirect("/");
  }
  return null;
};

export const Login = () => {
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
        <Paper elevation={8} sx={{ borderRadius: "32px", p: 6 }}>
          <Box textAlign="center" mb={2}>
            <img src={MainLogo} />
          </Box>
          <Box px={3}>
            <LoginForm />
          </Box>
        </Paper>
      </RightSideContainer>
    </Grid>
  );
};

Login.loader = loader;
