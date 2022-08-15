import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { TextField, Box } from "@mui/material";
import { auth } from "../../config/firebase";
import { LoadingButton } from "@mui/lab";

const SignInExisting = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setShowAlert } = useContext(PublicVariablesContext);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signInExistingUser = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        setShowAlert({
          show: true,
          severity: "error",
          message: `${error.message}`,
        });
      });
  };

  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <TextField
        label="Email"
        fullWidth
        name="Email"
        value={email}
        onChange={handleChangeEmail}
        sx={{ marginBottom: "1rem" }}
        disabled={loading}
      />
      <TextField
        fullWidth
        label="Password"
        name="Password"
        type="password"
        value={password}
        onChange={handleChangePassword}
        sx={{ marginBottom: "1rem" }}
        disabled={loading}
      />
      <LoadingButton
        size="large"
        fullWidth
        variant="contained"
        onClick={signInExistingUser}
        disabled={!email || !password}
        loading={loading}
      >
        Login
      </LoadingButton>
    </Box>
  );
};

export default SignInExisting;
