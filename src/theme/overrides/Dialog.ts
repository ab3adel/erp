import { Components, Theme } from "@mui/material";

export const DialogStylesOverrides: Components<Theme>["MuiDialog"] = {
  defaultProps: {
    maxWidth: "sm",
    fullWidth: true,
  },
  styleOverrides: {
    paper: ({ theme }) => ({
      minWidth: "auto !important",
      paddingBottom: 16,
      borderRadius: 8,
      boxShadow: theme.shadows[4],
      "& .MuiDialogTitle-root": {
        paddingTop: 16,
        paddingRight: 32,
        paddingLeft: 32,
        height: 60,
        color: "#fff",
        backgroundColor: theme.palette.secondary.main,
        ...theme.typography.h2,
        "& .MuiButtonBase-root": {
          color: "#fff",
        },
      },
      "& .MuiDialogContent-root": {
        marginTop: 32,
        paddingRight: 32,
        paddingLeft: 32,
      },
      "& .MuiDialogActions-root": {
        paddingRight: 32,
        paddingLeft: 32,
        paddingBottom: 0,
        borderTop: `1px solid ${theme.palette.divider}`,
      },
    }),
    paperWidthMd: {
      maxWidth: 847,
      height: 617,
    },
  },
};
