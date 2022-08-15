import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthChecker from "./auth/AuthChecker";
import { UserDataProvider } from "./context/userData";
import { PublicVariablesProvider } from "./context/PublicVariables";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import FavoritesPage from "./components/pages/FavoritesPage";
import ForgotPassword from "./components/pages/ForgotPassword";
import Alerts from "./components/common/Alerts";
import { ThemeProvider, Box } from "@mui/material";
import theme from "./styles/ThemeProvider";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <PublicVariablesProvider>
          <Alerts />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <AuthChecker>
                  <UserDataProvider>
                    <Box
                      height="100%"
                      minHeight="100vh"
                      paddingBottom={6}
                      sx={{ backgroundColor: theme.palette.grey[300] }}
                    >
                      <Home />
                    </Box>
                  </UserDataProvider>
                </AuthChecker>
              }
            />
            <Route
              path="/favorite"
              element={
                <AuthChecker>
                  <UserDataProvider>
                    <Box
                      height="100%"
                      minHeight="100vh"
                      paddingBottom={6}
                      sx={{ backgroundColor: theme.palette.grey[300] }}
                    >
                      <FavoritesPage />
                    </Box>
                  </UserDataProvider>
                </AuthChecker>
              }
            />
          </Routes>
        </PublicVariablesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
