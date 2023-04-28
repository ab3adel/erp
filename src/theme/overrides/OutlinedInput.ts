import { Components, Theme } from "@mui/material";

export const OutlinedInputOverrides: Components<Theme>["MuiOutlinedInput"] = {
  styleOverrides: {
    root: {
      height: 40,
      borderRadius: "8px",
    },
    input: {
      padding: "6.5px 14px",
    },
  },
};
