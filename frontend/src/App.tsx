import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthChecker from "./auth/AuthChecker";
import { UserDataProvider } from "./context/userData";
import SignUpAndIn from "./components/pages/SignUpAndIn";
import Home from "./components/pages/Home";
import ForgotPassword from "./components/pages/ForgotPassword";

const App = () => {
  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/login" element={<SignUpAndIn />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route
            path="/"
            element={
              <AuthChecker>
                <UserDataProvider>
                  <Home />
                </UserDataProvider>
              </AuthChecker>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
