import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthChecker from "./auth/AuthChecker";
import { UserDataProvider } from "./context/userData";
import { PublicVariablesProvider } from "./context/PublicVariables";
import SignUpAndIn from "./components/pages/SignUpAndIn";
import Home from "./components/pages/Home";
import ForgotPassword from "./components/pages/ForgotPassword";
import Banner from "./components/common/Banner";
import Alerts from "./components/common/Alerts";
import LoadingBar from "./components/common/LoadingBar";

const App = () => {
  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <PublicVariablesProvider>
          <Banner />
          <Alerts />
          <LoadingBar />
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
        </PublicVariablesProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
