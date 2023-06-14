import { Components, Theme, alpha } from "@mui/material";

export const AlertStylesOverrides: Components<Theme>["MuiAlert"] = {
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      return {
        color: theme.palette[ownerState.severity!].main,
        backgroundColor: alpha(theme.palette[ownerState.severity!].main, 0.2),
        border: `1px solid ${theme.palette[ownerState.severity!].main}`,
        paddingTop: 4,
        paddingBottom: 4,
        marginTop: 20,
      };
    },
  },
};
