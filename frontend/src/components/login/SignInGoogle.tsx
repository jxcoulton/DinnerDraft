import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/userData";
import { signInWithPopup } from "firebase/auth";
import { auth, Providers } from "../../config/firebase";
import { LoadingButton } from "@mui/lab";
import GoogleIcon from "@mui/icons-material/Google";

const SignInGoogle = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setShowAlert } = useContext(UserDataContext);

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
    <LoadingButton
      startIcon={<GoogleIcon />}
      size="large"
      variant="contained"
      onClick={signInWithGoogle}
      loading={loading}
    >
      Sign In With Google
    </LoadingButton>
  );
};

export default SignInGoogle;
