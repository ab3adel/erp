import { RouterProvider } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { ThemeProvider, responsiveFontSizes, CssBaseline } from "@mui/material";
import { router } from "./routes";
import { theme } from "./theme";
import { SnackbarProvider } from "notistack";

const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_URL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
