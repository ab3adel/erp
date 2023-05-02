import { Grid, styled } from "@mui/material";

export const RightSideContainer = styled(Grid)(({ theme }) => ({
  height: "100%",
  flexGrow: 1,
  borderRadius: "56px 0px 0px 0px",
  background:
    "linear-gradient(359.42deg, rgba(0, 142, 143, 0.73) 0.62%, rgba(0, 142, 143, 0) 190.88%)",
  boxShadow:
    "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 59.38px rgba(36, 40, 40, 0.12), 0px 2px 59.38px rgba(36, 40, 40, 0.14)",
  backdropFilter: "blur(29.69px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingLeft: 40,
  paddingRight: 40,
  paddingTop: 10,
  paddingBottom: 10,
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    borderRadius: "0px",
  },
}));
