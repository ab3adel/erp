import { PaletteOptions } from "@mui/material";

const PRIMARY_COLOR = "#008E8F";

const SECONDARY_COLOR = "#FF8749";

export const palette: PaletteOptions = {
  text: { secondary: "rgb(3,40,40,0.6)" },
  primary: {
    main: PRIMARY_COLOR,
    light: `${PRIMARY_COLOR}14`,
  },
  secondary: {
    main: SECONDARY_COLOR,
  },
  common: {
    white: "#ffffff",
    black: "#242828DE",
  },
  info: {
    main: "#121212",
    dark: "#121212",
    light: "#ffffff",
  },
  warning: {
    main: "#F57C00",
    dark: "#E65100",
  },
  success: {
    main: "#11A154",
  },
};
