import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";
import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Center from "../../utils/Center";

const SignInGoogle = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, Providers.google)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
      });
  };

  return (
    <Center height={"auto"}>
      <Button
        startIcon={<GoogleIcon />}
        size="large"
        variant="contained"
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </Button>
      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
    </Center>
  );
};

export default SignInGoogle;
