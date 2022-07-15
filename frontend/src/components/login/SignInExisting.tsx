import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { auth } from "../../config/firebase";
import Center from "../../utils/Center";

const SignInExisting = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signInExistingUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
        console.log("user not found"); //TODO
      });
  };

  return (
    <Center height={"auto"}>
      <TextField
        label="email"
        name="email"
        value={email}
        onChange={handleChangeEmail}
        sx={{ margin: "15px" }}
      />
      <TextField
        label="password"
        name="password"
        type="password"
        value={password}
        onChange={handleChangePassword}
        sx={{ marginBottom: "15px" }}
      />
      <Button
        size="large"
        variant="contained"
        onClick={signInExistingUser}
        disabled={!email || !password}
      >
        Login
      </Button>
      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
    </Center>
  );
};

export default SignInExisting;
