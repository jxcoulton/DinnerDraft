import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthChecker from "./auth/AuthChecker";
import { UserDataProvider } from "./context/userData";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import FavoritesPage from "./components/pages/FavoritesPage";
import ForgotPassword from "./components/pages/ForgotPassword";
import Alerts from "./components/common/Alerts";
import theme from "./styles/ThemeProvider";
import { ThemeProvider, Box } from "@mui/material";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <UserDataProvider>
          <Alerts />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/favorite"
              element={
                <AuthChecker>
                  <Box
                    sx={{
                      backgroundColor: theme.palette.grey[300],
                      height: "100px",
                      minHeight: "100vh",
                      paddingBottom: "3rem",
                    }}
                  >
                    <FavoritesPage />
                  </Box>
                </AuthChecker>
              }
            />
            <Route
              path="/"
              element={
                <AuthChecker>
                  <Box
                    sx={{
                      backgroundColor: theme.palette.grey[300],
                      height: "100px",
                      minHeight: "100vh",
                      paddingBottom: "3rem",
                    }}
                  >
                    <Home />
                  </Box>
                </AuthChecker>
              }
            />
          </Routes>
        </UserDataProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
