import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { Button, TextField } from "@mui/material";
import { auth } from "../../config/firebase";

const SignInExisting = () => {
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

  const signInExistingUser = () => {
    setLoadingCircle(true);
    signInWithEmailAndPassword(auth, email, password)
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
        onClick={signInExistingUser}
        disabled={!email || !password || loadingCircle}
      >
        Login
      </Button>
    </>
  );
};

export default SignInExisting;
