import { Components, Theme } from "@mui/material";

export const MuiIconButtonOverrides: Components<
  Omit<Theme, "components">
>["MuiIconButton"] = {
  defaultProps: {
    disableRipple: true,
    disableFocusRipple: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    }),
  },
};
