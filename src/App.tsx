import { RouterProvider } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { ThemeProvider, responsiveFontSizes, CssBaseline } from "@mui/material";
import { router } from "./routes";
import { theme } from "./theme";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
