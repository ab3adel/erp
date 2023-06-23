import { ThemeProvider, responsiveFontSizes, CssBaseline } from "@mui/material";
import { theme } from "../src/theme/theme";
import { LicenseInfo } from "@mui/x-license-pro";

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

/* snipped for brevity */

export const withMuiTheme = (Story) => {
  LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_KEY);
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

export const decorators = [withMuiTheme];
