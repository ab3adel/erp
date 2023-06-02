import { Components, Theme, alpha } from "@mui/material";

export const ChipStylesOverrides: Components<Theme>["MuiChip"] = {
  defaultProps: {
    variant: "filled",
  },
  styleOverrides: {
    root: {
      minWidth: 67,
      maxHeight: 24,
      padding: "3px 4px",
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 13,
      borderRadius: 100,
    },
    filled: ({ theme, ownerState }) => {
      const { color } = ownerState;
      const themeColor =
        color !== "default" && color
          ? theme.palette[color].main
          : theme.palette.grey[500];
      return {
        backgroundColor: alpha(themeColor, 0.08),
        color: themeColor,
      };
    },
  },
  variants: [
    {
      props: {
        variant: "filled",
        color: "warning",
      },
      style: ({ theme }) => ({
        backgroundColor: "rgba(237, 108, 2, 0.3)",
        color: theme.palette.warning.dark,
      }),
    },
    {
      props: {
        variant: "filled",
        color: "success",
      },
      style: ({ theme }) => ({
        backgroundColor: "rgba(17, 161, 84, 0.08)",
        color: theme.palette.success.main,
      }),
    },
    {
      props: {
        variant: "filled",
        disabled: true,
      },
      style: {
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        color: "rgba(36, 40, 40, 0.87)",
      },
    },
  ],
};
