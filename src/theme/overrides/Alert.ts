import { Components, Theme, alpha } from "@mui/material";

export const AlertStylesOverrides: Components<Theme>["MuiAlert"] = {
  styleOverrides: {
    icon: ({ ownerState }) => ({
      display: ownerState.severity === "info" ? "none" : "flex",
    }),
    root: ({ theme, ownerState }) => {
      return {
        color:
          ownerState.severity !== "info"
            ? theme.palette[ownerState.severity!].main
            : theme.palette.info.light,
        backgroundColor:
          ownerState.severity !== "info"
            ? alpha(theme.palette[ownerState.severity!].main, 0.2)
            : theme.palette.info.dark,
        border: `1px solid ${theme.palette[ownerState.severity!].main}`,
        paddingTop: 4,
        paddingBottom: 4,
        marginTop: 20,
      };
    },
  },
};
