import { Components, Theme } from "@mui/material";

export const MuiLinkStylesOverrides: Components<
  Omit<Theme, "components">
>["MuiLink"] = {
  styleOverrides: {
    root: {
      textDecoration: "none",
      cursor: "pointer",
    },
  },
};
