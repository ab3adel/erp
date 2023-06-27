import { RouterProvider } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ThemeProvider,
  responsiveFontSizes,
  CssBaseline,
  styled,
  alpha,
} from "@mui/material";
import { router } from "./routes";
import { theme } from "./theme";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { LicenseInfo } from "@mui/x-license-pro";
import { useSelectedTenentId } from "./global/states/selectedOrganizations";

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_KEY);

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BACKEND_URL + "graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  const id = useSelectedTenentId.getState().id;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      ...(id && token && { "X-Tenant": id }),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <SnackbarProvider
            autoHideDuration={2000}
            Components={{
              success: StyledMaterialDesignContent,
              error: StyledMaterialDesignContent,
            }}
          >
            <RouterProvider router={router(client)} />
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme }) => ({
    "&.notistack-MuiContent-success": {
      color: theme.palette.success.main,
      backgroundColor: alpha(theme.palette.success.main, 0.2),
      border: `1px solid ${theme.palette.success.main}`,
      paddingTop: 4,
      paddingBottom: 4,
      marginTop: 20,
    },
    "&.notistack-MuiContent-error": {
      color: theme.palette.error.main,
      backgroundColor: alpha(theme.palette.error.main, 0.2),
      border: `1px solid ${theme.palette.error.main}`,
      paddingTop: 4,
      paddingBottom: 4,
      marginTop: 20,
    },
  })
);

export default App;
