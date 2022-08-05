import { useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { auth, Providers } from "../../config/firebase";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const SignInGoogle = () => {
  const navigate = useNavigate();
  const { loadingCircle, setLoadingCircle, setShowAlert } = useContext(
    PublicVariablesContext
  );

  const signInWithGoogle = () => {
    setLoadingCircle(true);
    signInWithPopup(auth, Providers.google)
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
      <Button
        startIcon={<GoogleIcon />}
        size="large"
        variant="contained"
        onClick={signInWithGoogle}
        disabled={loadingCircle}
      >
        Sign In With Google
      </Button>
    </>
  );
};

export default SignInGoogle;
