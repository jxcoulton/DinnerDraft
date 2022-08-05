import { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { auth } from "../../config/firebase";
import { Button, TextField } from "@mui/material";

const SignUpNewUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loadingCircle, setLoadingCircle, setShowAlert } = useContext(
    PublicVariablesContext
  );

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signUpNewUserFunc = () => {
    setLoadingCircle(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoadingCircle(false);
        navigate("/");
      })
      .catch((error) => {
        setLoadingCircle(false);
        setShowAlert({
          show: true,
          severity: "error",
          message: `${error.message}`,
        });
      });
  };

  return (
    <>
      <TextField
        label="email"
        name="email"
        value={email}
        onChange={handleChangeEmail}
        sx={{ margin: "15px" }}
        disabled={loadingCircle}
      />
      <TextField
        label="password"
        name="password"
        type="password"
        value={password}
        onChange={handleChangePassword}
        sx={{ marginBottom: "15px" }}
        disabled={loadingCircle}
      />
      <Button
        size="large"
        variant="contained"
        onClick={signUpNewUserFunc}
        disabled={!email || !password || loadingCircle}
      >
        Sign Up
      </Button>
    </>
  );
};

export default SignUpNewUser;
