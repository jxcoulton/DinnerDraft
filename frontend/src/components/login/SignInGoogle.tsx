import { useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { auth, Providers } from "../../config/firebase";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const SignInGoogle = () => {
  const navigate = useNavigate();
  const { loading, setLoading, setShowAlert } = useContext(
    PublicVariablesContext
  );

  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, Providers.google)
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
    <>
      <Button
        startIcon={<GoogleIcon />}
        size="large"
        variant="contained"
        onClick={signInWithGoogle}
        disabled={loading}
      >
        Sign In With Google
      </Button>
    </>
  );
};

export default SignInGoogle;
