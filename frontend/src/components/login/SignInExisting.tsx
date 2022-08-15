import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/userData";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { TextField, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const SignInExisting = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setShowAlert } = useContext(UserDataContext);

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
    <Box
      sx={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        label="Email"
        onChange={handleChangeEmail}
        name="Email"
        value={email}
        disabled={loading}
        fullWidth
        sx={{ marginBottom: "1rem" }}
      />
      <TextField
        label="Password"
        onChange={handleChangePassword}
        name="Password"
        value={password}
        type="password"
        disabled={loading}
        fullWidth
        sx={{ marginBottom: "1rem" }}
      />
      <LoadingButton
        size="large"
        variant="contained"
        onClick={signInExistingUser}
        fullWidth
        disabled={!email || !password}
        loading={loading}
      >
        Login
      </LoadingButton>
    </Box>
  );
};

export default SignInExisting;
