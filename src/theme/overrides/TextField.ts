import { Components, Theme } from "@mui/material";

export const TextFieldStylesOverrides: Components<Theme>["MuiTextField"] = {
  variants: [
    {
      props: {
        variant: "filled",
      },
      style: ({ theme }) => ({
        "& .MuiFormHelperText-root": {
          color: `${theme.palette.text.secondary} !important`,
          fontSize: "12px",
        },
        "& .MuiInputLabel-filled": {
          color: `${theme.palette.text.secondary} !important`,
        },
        "& .MuiInputBase-root": {
          backgroundColor: "#0063640F",
        },
      }),
    },
  ],
};
