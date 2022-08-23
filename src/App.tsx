import React, { useState } from "react";
import "@fontsource/roboto";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { AppContext } from "./context/AppContext";
import AppLoginLayout from "./components/app-login-layout/AppLoginLayout";
import TweetApp from "./components/tweet-app/TweetApp";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#2b204f",
    },
  },
});

function App() {
  const [isUserActive, setIsUserActive] = useState(false);
  const [user, setUser] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    contact: "",
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider>
        <AppContext.Provider
          value={{ isUserActive, setIsUserActive, user, setUser }}
        >
          <StyledEngineProvider injectFirst>
            {isUserActive ? <TweetApp /> : <AppLoginLayout />}
          </StyledEngineProvider>
        </AppContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
