import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Button, TextField } from "@mui/material";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { loadingCircle, setLoadingCircle, setShowAlert } = useContext(
    PublicVariablesContext
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const requestPasswordReset = () => {
    setLoadingCircle(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoadingCircle(false);
        navigate("/login");
      })
      .then(() => {
        setShowAlert({
          show: true,
          severity: "success",
          message: "Recovery email sent",
        });
      })
      .catch((error) => {
        setLoadingCircle(false);
        setShowAlert({
          show: true,
          severity: "error",
          message: `${error.message}`,
        });
      });
    setEmail("");
  };

  return (
    <>
      <TextField
        label="email"
        onChange={handleChange}
        value={email}
        disabled={loadingCircle}
      />
      <Button
        size="large"
        variant="contained"
        disabled={!email || loadingCircle}
        onClick={requestPasswordReset}
      >
        reset password
      </Button>
    </>
  );
};

export default PasswordReset;
