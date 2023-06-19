import { Components, Theme } from "@mui/material";

export const SelectStylesOverrides: Components<Theme>["MuiSelect"] = {
  variants: [
    {
      props: {
        variant: "filled",
      },
      style: () => ({
        "&.MuiFilledInput-root": {
          backgroundColor: "#0063640F",
        },
      }),
    },
  ],
};
