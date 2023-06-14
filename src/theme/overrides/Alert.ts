import { Components, Theme, alpha } from "@mui/material";

export const AlertStylesOverrides: Components<Theme>["MuiAlert"] = {
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      return {
        color: theme.palette[ownerState.severity!].main,
        backgroundColor: alpha("#00ff00", 0.5),
        border: `1px solid ${theme.palette[ownerState.severity!].main}`,
      };
    },
  },
};
