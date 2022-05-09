import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Button, TextField, Typography } from "@mui/material";
import Center from "../utils/Center";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const requestPasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("email sent");
        navigate("/login");
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
        //TODO post request showing with API key
        console.log("email not sent");
      });
    setEmail("");
  };

  return (
    <Center height={"auto"}>
      <TextField
        label="email"
        onChange={handleChange}
        value={email}
        focused
        sx={{ padding: "15px" }}
      />
      <Button
        size="large"
        variant="contained"
        disabled={!email}
        onClick={requestPasswordReset}
      >
        reset password
      </Button>
      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
    </Center>
  );
};

export default PasswordReset;
