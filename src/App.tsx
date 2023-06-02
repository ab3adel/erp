import { RouterProvider } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ThemeProvider, responsiveFontSizes, CssBaseline } from "@mui/material";
import { router } from "./routes";
import { theme } from "./theme";
import { SnackbarProvider } from "notistack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { LicenseInfo } from "@mui/x-license-pro";

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_KEY);

const httpLink = createHttpLink({
  uri: "https://mc.erp-backend-dev.turnsole.tech/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <SnackbarProvider>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
