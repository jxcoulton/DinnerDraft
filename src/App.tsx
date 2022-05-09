import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthChecker from "./components/auth/AuthChecker";
import Login from "./components/comp/Login";
import Home from "./components/comp/Home";
import ForgotPassword from "./components/comp/ForgotPassword";

const App = () => {
  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route
            path="/"
            element={
              <AuthChecker>
                <Home />
              </AuthChecker>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
