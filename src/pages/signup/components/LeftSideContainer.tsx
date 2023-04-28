import { Box, styled } from "@mui/material";

export const LeftSideContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "460px",
  background:
    "linear-gradient(180deg, rgba(0,140,123,1) 0%, rgba(17,152,169,1) 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  paddingLeft: 40,
  paddingRight: 40,
  paddingTop: 10,
  paddingBottom: 10,
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "fit-content",
    paddingLeft: 20,
    paddingRight: 20,
  },
}));
